const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Bike = require('../lib/models/Bike');

describe('app tests', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  
  afterAll(() => {
    return pool.end();
  });

  it('creates a bike via POST', async() => {
    const response = await request(app)
      .post('/api/v1/bikes')
      .send({
        make: 'Crust',
        model: 'Bombora',
        specialization: 'Gravel Touring'
      });
    expect(response.body).toEqual({
      id: '1',
      make: 'Crust',
      model: 'Bombora',
      specialization: 'Gravel Touring'
    });
  });

  it('finds all in /bikes via GET all', async() => {
    const bike = await Bike.insert({ make: 'Crust', model: 'Shred Eagle', specialization: 'Hardtail Mountain Bike' });

    const response = await request(app)
      .get('/api/v1/bikes');

    expect(response.body).toEqual([bike]);
  });

  it('finds a bike in /bikes by id via GET', async() => {
    const bike = await Bike.insert({ make: 'Crust', model: 'Romanceur', specialization: 'Touring Bike' });

    const response = await request(app)
      .get(`/api/v1/bikes/${bike.id}`);

    expect(response.body).toEqual(bike);
  });

  it('updates a bike in /bikes by id via put', async() => {
    const bike = await Bike.insert({ make: 'Crust', model: 'Romanceur', specialization: 'Touring Bike' });

    const response = await request(app)
      .put(`/api/v1/bikes/${bike.id}`)
      .send({
        make: 'Crust',
        model: 'Romanceur with cargo fork',
        specialization: 'Bike Truck'
      });
    expect(response.body).toEqual({
      ...bike,
      make: 'Crust',
      model: 'Romanceur with cargo fork',
      specialization: 'Bike Truck'
    });
  });

  it('deletes a bike from /bikes by id', async() => {
    const bike = await Bike.insert({ make: 'Crust', model: 'Romanceur', specialization: 'Touring Bike' });

    const response = await request(app)
      .delete(`/api/v1/bikes/${bike.id}`);

    expect(response.body).toEqual({
      ...bike,
      make: 'Crust',
      model: 'Romanceur',
      specialization: 'Touring Bike'
    });
  });
});
