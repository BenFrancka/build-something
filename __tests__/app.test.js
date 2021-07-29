const pool = require('../lib/utils/pool');
const twilio = require('../lib/utils/twilio');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Inventory = require('../lib/models/Inventory');


jest.mock('../lib/utils/twilio');

describe('inventory routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('creates an inventory item using POST and sends a text notification via twilio', async () => {
    const potatoes = {
      itemName: 'potatoes 50#',
      itemCategory: 'produce',
      price: 7,
      inStock: true
    };
    const res = await request(app)
      .post('/api/v1/inventory')
      .send(potatoes);
    
    expect(twilio.sendText).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual({
      id: '1',
      ...potatoes
    });
  });

  it('gets an inventory item by id  using GET', async () => {
    const potatoes = await Inventory.insert({
      itemName: 'potatoes 50#',
      itemCategory: 'produce',
      price: 7,
      inStock: true
    });
    const res = await request(app)
      .get(`/api/v1/inventory/${potatoes.id}`);
      
    
    
    expect(res.body).toEqual(potatoes);
  });

  it('gets all inventory items using GET', async () => {
    const potatoes = await Inventory.insert({
      itemName: 'potatoes 50#',
      itemCategory: 'produce',
      price: 7,
      inStock: true
    });
    const heavyCream = await Inventory.insert({
      itemName: 'heavy cream 2 gallon',
      itemCategory: 'dairy',
      price: 35,
      inStock: true
    });
    const catfish = await Inventory.insert({
      itemName: 'catfish whole',
      itemCategory: 'protein',
      price: 7,
      inStock: false
    });

    const res = await request(app)
      .get('/api/v1/inventory/');
      
    expect(res.body).toEqual([
      potatoes,
      heavyCream,
      catfish
    ]);
  });

  it('updates an inventory item by id  using PUT and sends a text notification via twilio', async () => {
    const potatoes = await Inventory.insert({
      itemName: 'potatoes 50#',
      itemCategory: 'produce',
      price: 7,
      inStock: true
    });
    const res = await request(app)
      .put(`/api/v1/inventory/${potatoes.id}`)
      .send({ inStock: false });
      
    
    expect(twilio.sendText).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual({ ...potatoes, inStock: false });
  });

});
