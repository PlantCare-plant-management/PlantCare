const request = require('supertest');
const { connectDB, getDB } = require('../config/mongoDb');
const app = require('../index');
let accessToken;
beforeAll(async () => {
    await connectDB()
    // const loginResponse = await request(app)
    //     .post('/login')
    //     .send({
    //         email: 'ultramangaia@email.com',
    //         password: '12345'
    //     });
    //     accessToken = loginResponse.body.access_token;
})

afterAll(async () =>{
    const db = getDB()
    await db.collection('user').deleteOne({email: "test@email.com"})
})

describe("POST /register", () => {
    it("should add user to collection", async()=> {
        const response = await request(app).post('/register')
        .send({
            email : "test@email.com",
            username : 'test',
            password : "12345",
            name : "test"
        })
        expect(response.status).toBe(201)
        
    })

    it("should error required when data is missing", async() => {
        const response = await request(app).post('/register')
        .send({
            email : "test@email.com",
            password : "12345",
            name : "test"

        })
        expect(response.status).toBe(400) 
        expect(response.body).toHaveProperty('message', "Required")
    })


});

describe("POST /login", () => {
    it('should login and return access_token', async() => {
        const response = await request(app).post('/login').send({
            email : "test@email.com",
            password : "12345"
        })
        accessToken = response.body.access_token;
        expect(response.status).toBe(200)
    })

    it('should return invalid', async() => {
        const response = await request(app).post('/login').send({
            email : "test@email.com",
            password : "1234567"
        })

        expect(response.status).toBe(401)
    })

    it('should return invalid', async() => {
        const response = await request(app).post('/login').send({
            email : "test@email.com",
           
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")
    })
})

describe("get /user", () => {
    it('should return user data by his id', async() => {
        const response = await request(app).get('/user').set("Authorization", `Bearer ${accessToken}`)
        
        expect(response.status).toBe(200)
    })
})

describe('/user/address', () => {
    it('should add adress to collection', async() => {
        const response = await request(app).post('/user/address')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({address : "jalan"})

        expect(response.status).toBe(200)
    })
})

describe('PATCH /user', () => {
    it('should update user profile with an image', async () => {
      const fakeImageBuffer = Buffer.from('fake image content');
  
      const response = await request(app)
        .put('/user/edit')
        .set('Authorization', `Bearer ${accessToken}`)
        .field('name', 'Updated Test')
        .field('username', 'updated_test')
        .field('address', 'Updated Address')
        .attach('imgUrl', fakeImageBuffer, 'test.png');
  
      expect(response.status).toBe(200);
      
    });
  
    it('should return 400 if no image file is provided', async () => {
      const response = await request(app)
        .put('/user/edit')
        .set('Authorization', `Bearer ${accessToken}`)
        .send();
  
      expect(response.status).toBe(400);
      
    });
  });