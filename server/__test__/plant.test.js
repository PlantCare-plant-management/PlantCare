const request = require('supertest');
const { connectDB, getDB } = require('../config/mongoDb');
const app = require('../index');
const { ObjectId } = require('mongodb');

let accessToken;
let plantId;

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
  const plants = await db.collection('plants').insertMany([
    {
      _id: new ObjectId(),
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
    },
    {
      _id: new ObjectId(),
      name: 'Aglaonema',
      latin_name: 'Aglaonema',
      description: 'Chinese Evergreen is a popular houseplant known for its attractive, variegated leaves.',
      difficulty: 'Beginner',
      harvest: false,
      recommendation: [
        'Watering: Water when the top inch of soil is dry.',
        'Light: Low to bright indirect light.',
        'Soil: Well-draining potting mix.',
        'Fertilizing: Every 2-3 months with a balanced fertilizer.'
      ],
      main_care: [
        { task: 'Watering', frequency: 7 },
        { task: 'Lighting', frequency: 1 },
        { task: 'Fertilizing', frequency: 60 },
        { task: 'Pruning', frequency: 30 }
      ],
      imgUrl: 'https://static.vecteezy.com/system/resources/previews/026/571/154/original/aglaonema-foliage-in-white-pot-spring-snow-chinese-evergreen-exotic-tropical-leaf-chinese-evergreen-plant-house-air-purifying-tree-isolated-on-transparent-background-file-png.png'
    }
  ]);

  plantId = plants.insertedIds[1].toString();
});

afterAll(async () => {
  const db = getDB();
  await db.collection('plants').deleteMany({});
  await db.collection('myPlants').deleteMany({});
});

describe('GET /plants', () => {
  it('should return all plants', async () => {
    const response = await request(app).get('/plants').set('Authorization', `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should return 401 if not authenticated', async () => {
    const response = await request(app).get('/plants');
    expect(response.status).toBe(401);
  });
});

describe('GET /plants/:id', () => {
  it('should return a specific plant by ID', async () => {
    const response = await request(app).get(`/plants/${plantId}`).set('Authorization', `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id', plantId);
  });

  it('should return 401 if not authenticated', async () => {
    const response = await request(app).get(`/plants/${plantId}`);
    expect(response.status).toBe(401);
  });

  it('should return 404 if plant ID does not exist', async () => {
    const nonExistentPlantId = new ObjectId().toString();
    const response = await request(app).get(`/plants/${nonExistentPlantId}`).set('Authorization', `Bearer ${accessToken}`);
    expect(response.status).toBe(404);
  });
});

describe('POST /plants', () => {
  it('should return 400 when no image is provided', async () => {
    const newPlant = {
      name: 'Test Plant',
      location: 'Test Location',
      plantId: plantId,
      actions: JSON.stringify([{ task: 'Watering', frequency: 3 }])
    };

    const response = await request(app)
      .post('/plants')
      .set('Authorization', `Bearer ${accessToken}`)
      .field('name', newPlant.name)
      .field('location', newPlant.location)
      .field('plantId', newPlant.plantId)
      .field('actions', newPlant.actions);

    expect(response.status).toBe(400);
    expect(response.text).toBe('There is no Image');
  });

  it('should add data to myPlant collection', async () => {
    const newPlant = {
      name: 'Test Plant',
      location: 'Test Location',
      plantId: plantId,
      actions: JSON.stringify([{ task: 'Watering', frequency: 3 }])
    };

    const response = await request(app)
      .post('/plants')
      .set('Authorization', `Bearer ${accessToken}`)
      .field('name', newPlant.name)
      .field('location', newPlant.location)
      .field('plantId', newPlant.plantId)
      .field('actions', newPlant.actions)
      .attach('imgUrl', Buffer.from('test image'), 'test.png');

    expect(response.status).toBe(201);
  });

  it('should return status 401 unauthorized', async () => {
    const newPlant = {
      name: 'Test Plant',
      location: 'Test Location',
      plantId: plantId,
      actions: JSON.stringify([{ task: 'Watering', frequency: 3 }])
    };

    const response = await request(app)
      .post('/plants')
      .field('name', newPlant.name)
      .field('location', newPlant.location)
      .field('plantId', newPlant.plantId)
      .field('actions', newPlant.actions)
      .attach('imgUrl', Buffer.from('test image'), 'test.png');

    expect(response.status).toBe(401);
  });
});
