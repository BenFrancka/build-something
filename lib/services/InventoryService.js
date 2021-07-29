const Inventory = require('../models/Inventory');
const { sendText } = require('../utils/twilio');

module.exports = class InventoryService {
  static async createItem(value) {
    await sendText(
      process.env.RECIPIENT_NUMBER,
      `new item added to inventory for ${value.quantity}`
    );

    const newItem = await Inventory.insert(value);
    return newItem;
  }
};

