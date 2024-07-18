const request = require('supertest');
const { connectDB, getDB } = require('../config/mongoDb');
const app = require('../index');
const { ObjectId } = require('mongodb');

let accessToken;
let plantId;
let myPlantId;

beforeAll(async () => {
  await connectDB();
  const loginResponse = await request(app)
    .post('/login')
    .send({
      email: 'ultramangaia@email.com',
      password: '12345'
    });

  accessToken = loginResponse.body.access_token;

  const db = getDB();
  const plants = await db.collection('plants').insertOne(
    {
      name: 'Orchid',
      latin_name: 'Orchidaceae',
      description: 'Orchids are flowering plants known for their beautiful and diverse blooms.',
      difficulty: 'Intermediate',
      harvest: false,
      recommendation: [
        'Watering: 2-3 times a week, ensuring the medium is dry before watering again.',
        'Light: Indirect bright light, avoid direct sunlight.',
        'Soil: Use a special orchid potting mix.',
        'Fertilizing: Monthly with a balanced orchid fertilizer.'
      ],
      main_care: [
        { task: 'Watering', frequency: 3 },
        { task: 'Lighting', frequency: 1 },
        { task: 'Fertilizing', frequency: 30 },
        { task: 'Monitor plant health', frequency: 7 }
      ],
      imgUrl: 'https://static.vecteezy.com/system/resources/previews/027/254/707/original/white-orchid-plant-in-a-white-pot-png.png'
    }
    );
    
  plantId = plants.insertedId.toString();

  const newPlant = {
    name: 'Test Plant',
    location: 'Test Location',
    plantId: plantId,
    actions: JSON.stringify([{ task: 'Watering', frequency: 3 }])
  };

  const data = await request(app)
    .post('/plants')
    .set('Authorization', `Bearer ${accessToken}`)
    .field('name', newPlant.name)
    .field('location', newPlant.location)
    .field('plantId', newPlant.plantId)
    .field('actions', newPlant.actions)
    .attach('imgUrl', Buffer.from('test image'), 'test.png');
  
  myPlantId = data.body.insertedId.toString();
});

afterAll(async () => {
  const db = getDB();
  await db.collection('plants').deleteMany({});
  await db.collection('myPlants').deleteMany({});
});

describe('POST /myplants/update', () => {
  it('should update actions of myPlant', async () => {
    const response = await request(app)
      .post('/myplants/update')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        plantId: myPlantId,
        actions: [{ task: 'Watering', frequency: 3, status: true }]
      });

    expect(response.status).toBe(201);
    expect(response.body).toBe(1); // Assuming the response is the number of updated actions
  });
});

describe('GET /myplants', () => {
  it('should get all myPlant data', async () => {
    const response = await request(app)
      .get('/myplants')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('GET /myplants/:plantId', () => {
  it('should get specific myPlant data', async () => {
    const response = await request(app)
      .get(`/myplants/${myPlantId}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
  });
});

describe('GET /myplants/:plantId', () => {
  it('should get specific myPlant data', async () => {
    const response = await request(app)
      .get(`/myplants/123123123123`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(500);
  });
});



