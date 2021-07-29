const { Router } = require('express');
const Inventory = require('../models/Inventory');
const InventoryService = require('../services/InventoryService');

module.exports = Router()
  .post('/', async(req, res, next) => {
    try {
      const inventoryItem = await InventoryService.createItem(req.body);

      res.send(inventoryItem);
    } catch(err) {
      next(err);
    }
  });
