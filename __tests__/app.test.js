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
  it('creates an inventory item using POST and sends a text message', async () => {
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

});
