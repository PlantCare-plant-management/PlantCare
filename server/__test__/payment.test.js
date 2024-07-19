const request = require('supertest');
const app = require('../index');
const { connectDB, getDB } = require('../config/mongoDb');
const midtransClient = require('midtrans-client');
const { ObjectId } = require("mongodb");

jest.mock('midtrans-client', () => {
  const mSnap = {
    createTransaction: jest.fn(),
  };
  return {
    Snap: jest.fn(() => mSnap),
  };
});

let accessToken;
let plantMarketId;

beforeAll(async () => {
  await connectDB();
  const loginResponse = await request(app)
    .post('/login')
    .send({
      email: 'ultramangaia@email.com',
      password: '12345',
    });

  accessToken = loginResponse.body.access_token;

  const db = getDB();
  const plantsMarket = await db.collection('plantMarket').insertOne({
    name: 'Test Plant',
    price: 1000,
    stock: 10,
  });

  plantMarketId = plantsMarket.insertedId.toHexString();
});

afterAll(async () => {
  const db = getDB();
  await db.collection('plantMarket').deleteMany({});
  await db.collection('order').deleteMany({});
});

describe('POST /user/payment', () => {
  it('should create a transaction successfully', async () => {
    const snap = new midtransClient.Snap();
    snap.createTransaction.mockResolvedValue({ token: 'transaction_token' });

    const response = await request(app)
      .post('/user/payment')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        plantMarketId: plantMarketId,
        quantity: 2,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('transactionToken', 'transaction_token');
    expect(response.body).toHaveProperty('orderId');

    const db = getDB();
    const order = await db.collection('order').findOne({ _id: new ObjectId(response.body.orderId) });
    expect(order).not.toBeNull();
    expect(order.amount).toBe(2000);
    expect(order.quantity).toBe(2);
    expect(order.status).toBe('Process');
  });

  it('should return 400 if quantity is missing or invalid', async () => {
    const response = await request(app)
      .post('/user/payment')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        plantMarketId: plantMarketId,
        quantity: 0,
      });
      console.log(plantMarketId)
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Quantity must be greater than 0');
  });

  it('should return 404 if plantMarket item is not found', async () => {
    const response = await request(app)
      .post('/user/payment')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        plantMarketId: '66998a87c1d9f5d2e679677c',
        quantity: 1,
      });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Plant market item not found');
  });

  it('should return 404 if user is not found', async () => {
    const db = getDB();
    await db.collection('users').deleteMany({}); // Delete all users to simulate user not found

    const response = await request(app)
      .post('/user/payment')
      .set('Authorization', `Bearer 123123123123`)
      .send({
        plantMarketId: plantMarketId,
        quantity: 1,
      });

    expect(response.status).toBe(401);
    
  });
});
