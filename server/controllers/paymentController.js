const midtransClient = require('midtrans-client');
const { getDB } = require('../config/mongoDb');
const { ObjectId } = require('mongodb');

const getPlantsFromMarketById = async (id) => {
    const db = await getDB(process.env.MONGO_URI);
    return db.collection('plantMarket').findOne({ _id: new ObjectId(id) });
};

const getUserById = async (id) => {
    const db = await getDB(process.env.MONGO_URI);
    return db.collection('user').findOne({ _id: new ObjectId(id) });
};

const createOrder = async (order) => {
    const db = await getDB(process.env.MONGO_URI);
    return db.collection('order').insertOne(order);
};

const updateOrderStatus = async (orderId, status) => {
    const db = await getDB(process.env.MONGO_URI);
    return db.collection('order').updateOne(
        { _id: new ObjectId(orderId) },
        { $set: { status: status, updatedAt: new Date() } }
    );
};

exports.createTransaction = async (req, res, next) => {
    try {
        const snap = new midtransClient.Snap({
            isProduction: false,
            serverKey: process.env.MIDTRANS_SERVER_KEY,
            clientKey: process.env.MIDTRANS_CLIENT_KEY
        });
        const _id = req.body.plantMarketId;
        const quantity = req.body.quantity;
        if (!quantity || quantity <= 0) {
            return res.status(400).json({ message: 'Quantity must be greater than 0' });
        }

        const plantMarket = await getPlantsFromMarketById(_id);
        if (!plantMarket) {
            return res.status(404).json({ message: 'Plant market item not found' });
        }

        const amount = plantMarket.price * quantity;
        const orderId = new ObjectId();
        const userId = req.user.id;
        const user = await getUserById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Detail transaksi
        let parameter = {
            transaction_details: {
                order_id: orderId.toHexString(),
                gross_amount: amount
            },
            credit_card: {
                secure: true
            },
            customer_details: {
                first_name: user.firstName,
                last_name: user.lastName,
                email: user.email,
                phone: user.phone
            }
        };

        const transaction = await snap.createTransaction(parameter);
        let transactionToken = transaction.token;

        // Simpan order ke database
        const order = {
            _id: orderId,
            amount: amount,
            quantity: quantity,
            userId: new ObjectId(req.user.id),
            plantMarketId: new ObjectId(_id),
            status: 'pending',
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await createOrder(order);

        res.json({ msg: "Order Created", transactionToken, orderId: orderId.toHexString() });
    } catch (error) {
        console.log(error, "<<< error midtrans");
        next(error);
    }
};

exports.handleNotification = async (req, res, next) => {
    try {
        const { order_id, transaction_status, fraud_status } = req.body;

        // Logika untuk menentukan status pesanan berdasarkan notifikasi Midtrans
        let status;
        if (transaction_status === 'capture') {
            if (fraud_status === 'challenge') {
                status = 'challenge';
            } else if (fraud_status === 'accept') {
                status = 'success';
            }
        } else if (transaction_status === 'settlement') {
            status = 'success';
        } else if (transaction_status === 'deny' || transaction_status === 'cancel' || transaction_status === 'expire') {
            status = 'failure';
        } else if (transaction_status === 'pending') {
            status = 'pending';
        }

        await updateOrderStatus(order_id, status);

        res.status(200).json({ message: 'Order status updated successfully' });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Failed to update order status' });
    }
};
