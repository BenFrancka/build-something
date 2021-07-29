const pool = require('../lib/utils/pool');
const twilio = require('twilio');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Inventory = require('../lib/models/Inventory');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

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
      .post('api/v1/inventory')
      .send(potatoes);
    
    expect(createItem).toHaveBeenCalledTimes(1);
    expect(res.body).ToEqual({
      id: '1',
      ...potatoes
    });
  });

});
