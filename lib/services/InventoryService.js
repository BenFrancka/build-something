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

  static async updateItem(id, value) {
    await sendText(
      process.env.RECIPIENT_NUMBER,
      ` ${value.itemName} has been updated in the inventory`
    );

    const updatedItem = await Inventory.updateById(id, value);
    return updatedItem;
  }

  static async deleteItem(id, value) {
    await sendText(
      process.env.RECIPIENT_NUMBER,
      ` ${value.itemName} has been removed from the inventory`
    );

    const deletedItem = await Inventory.deleteById(id, value);
    return deletedItem;
  }
};

