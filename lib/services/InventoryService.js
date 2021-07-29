const Inventory = require('../models/Inventory');
const { sendText } = require('../utils/twilio');

module.exports = class InventoryService {
  static async createItem(value) {
    await sendText(
      process.env.RECIPIENT_NUMBER,
      `new item added to inventory for ${value.itemName}`
    );

    const newItem = await Inventory.insert(value);
    return newItem;
  }

  static async updateItem(value) {
    await sendText(
      process.env.RECIPIENT_NUMBER,
      ` ${value.itemName} has been updated in the inventory`
    );

    const updatedItem = await Inventory.updateById(value);
    return updatedItem;
  }
};

