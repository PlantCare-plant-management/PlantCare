const request = require('supertest');
const { connectDB, getDB } = require('../config/mongoDb');
const app = require('../index');
const ObjectId = require("mongodb").ObjectId;
let accessToken;
let orderId
let id;
beforeAll(async () => {
    await connectDB();
    const loginResponse = await request(app)
      .post('/login')
      .send({
        email: 'ultramangaia@email.com',
        password: '12345'
      });
    accessToken = loginResponse.body.access_token;
    const db = getDB()
    const plantResponse = await db.collection('plantMarket').insertOne({
        name: "Starter Pack 1: Bonsai",
        price: 145000,
        image: "https://res.cloudinary.com/dszhu92hc/image/upload/v1721293105/Ft9cUgW",
        description: "Hai"
      })
      id = plantResponse.insertedId.toHexString()
  const order = await db.collection('order').insertOne({
    amount: 2000,
    quantity: 2,
    userId: new ObjectId(),
    plantMarketId: new ObjectId(),
    payment: "Paid",
    status: "Process",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  orderId = order.insertedId.toHexString();
    
});

  afterAll(async () => {
    const db = getDB();
    await db.collection('plantMarket').deleteMany({});
})
describe('GET /plantMarket', () => {
    it('should return all product', async () => {
        const response = await request(app).get('/plantMarket').set('Authorization', `Bearer ${accessToken}`)

        expect(response.status).toBe(200)
    })

    it('should return JSON WEB TOKEN ERROR', async() => {
        const response = await request(app).get('/plantMarket').set('Authorization', `Bearer 12345`)
        
        expect(response.status).toBe(401)
    })
})

describe('GET /plantMarket/:id', () => {
    it('should return product with spesific id', async () => {
        const response = await request(app).get(`/plantMarket/${id}`).set('Authorization', `Bearer ${accessToken}`)

        expect(response.status).toBe(200)
    })
    it('should return product with spesific id', async () => {
        const response = await request(app).get(`/plantMarket/6699a908aab37e595a2238c7`).set('Authorization', `Bearer ${accessToken}`)
        console.log(id)
        expect(response.status).toBe(404)
    })
})

describe('GET /plantMarket/history-order', () => {
    it('should return something', async() => {
        const response = await request(app).get('/plantMarket/history-order').set('Authorization', `Bearer ${accessToken}`)
        expect(response.status).toBe(200)
    })
}) 

describe('PATCH /order/:orderId/', () => {
    it('should update the order status successfully', async () => {
      const response = await request(app)
        .patch(`/plantMarket/order/${orderId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        console.log(response.body)
      expect(response.status).toBe(200);
    });
  
  });