import { Router } from 'express';
import Inventory from '../models/Inventory';
import InventoryService from '../services/InventoryService';

export default Router()
  .post('/', async(req, res, next) => {
    try {
      const inventoryItem = await InventoryService.createItem(req.body);

      res.send(inventoryItem);
    } catch(err) {
      next(err);
    }
  });
