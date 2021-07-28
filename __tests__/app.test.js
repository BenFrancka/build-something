import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Item from '../lib/models/Inventory.js';

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
    const res = request(app)
      .post('api/v1/inventory')
      .send(potatoes);
    
    expect(createMessage).toHaveBeenCalledTimes(1);
    expect(res.body).ToEqual({
      id: '1',
      ...potatoes
    });
  });

});
