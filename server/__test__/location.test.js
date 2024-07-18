const request = require('supertest');
const { connectDB, getDB } = require('../config/mongoDb');
const app = require('../index');

let accessToken;
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
});

afterAll(async () => {
    const db = getDB();
    await db.collection('locations').deleteMany({});
})

describe('POST /locations', () => {
    it("should add data to collection locations", async () => {
        const response = await request(app)
        .post('/locations').set('Authorization', `Bearer ${accessToken}`).send({name : "Living room"})
        id = response.body.insertedId
        expect(response.status).toBe(201)
        expect(response.body).toBeInstanceOf(Object);
    })

    it("should add data to collection locations", async () => {
        const response = await request(app)
        .post('/locations').set('Authorization', `Bearer ${accessToken}`).send()
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object);
    })

    it('should return 401 if no authorization', async () => {
        const response = await request(app)
        .post('/locations').send({name : "Living room"})
        expect(response.status).toBe(401)
    })
})

describe('GET /locations', () => {
    it("should get all data from locations", async() => {
        const response = await request(app).get('/locations').set('Authorization', `Bearer ${accessToken}`)
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
    })
})

describe('PUT /locations/:id', () => {
    it('should edit the name of location', async() => {
        const response = await request(app).put(`/locations/${id}`).send({name : "halo"})

        expect(response.status).toBe(200)
    })
})

describe('PUT /locations/:id', () => {
    it('should edit the name of location', async() => {
        const response = await request(app).put(`/locations/${id}`).send()

        expect(response.status).toBe(400)
        
    })
})