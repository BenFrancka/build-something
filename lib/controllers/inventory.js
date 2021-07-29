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
  })
  .get('/:id', async(req, res, next) => {
    try {
      const { id } = req.params;
      const inventoryItem = await Inventory.getbyID(id);

      res.send(inventoryItem);
    } catch(err) {
      next(err);
    }
  })
  .get('/', async(req, res, next) => {
    try {
      const inventoryItems = await Inventory.getAll();

      res.send(inventoryItems);
    } catch(err) {
      next(err);
    }
  });
