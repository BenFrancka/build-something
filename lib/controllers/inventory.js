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
  })
  .put('/:id', async(req, res, next) => {
    try {
      const { id } = req.params;
      const updatedInventoryItem = await InventoryService.updateItem(id, req.body);

      res.send(updatedInventoryItem);
    } catch(err) {
      next(err);
    }
  })
  .delete('/:id', async(req, res, next) => {
    try {
      const { id } = req.params;
      const inventoryItem = await InventoryService.deleteItem(id, req.body);

      res.send({
        message: `${inventoryItem.itemName} was removed from the inventory`
      });
    } catch(err) {
      next(err);
    }
  });
