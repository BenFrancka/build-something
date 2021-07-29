import Inventory from '../models/Inventory';
import { sendText } from '../utils/twilio';

export default class InventoryService {
  static async createOrder(value) {
    await sendText(
      process.env.RECIPIENT_NUMBER,
      `new item added to inventory for ${value.quantity}`
    );

    const newItem = await Inventory.insert(value);
    return newItem;
  }
}

