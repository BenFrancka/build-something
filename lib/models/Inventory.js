const pool = require('../utils/pool');

module.exports = class Inventory {
    id;
    itemName;
    itemCategory;
    price;
    inStock;

    constructor(row) {
        this.id = row.id;
        this.itemName = row.item_name;
        this.itemCategory = row.item_category;
        this.price = row.price;
        this.inStock = row.in_stock;
    }

    static async insert({ itemName, itemCategory,price, inStock }) {
        const { rows } = await pool.query('INSERT INTO inventory (item_name, item_category, price, in_stock) VALUES ($1, $2, $3, $4) RETURNING *', [itemName, itemCategory, price, inStock]);

        return new Inventory(rows[0]);
    }

    static async getbyID(id) {
        const { rows } = await pool.query('SELECT * from inventory WHERE id=$1', [id]);

        return new Inventory(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query('SELECT * from inventory');

        return rows.map((row) => new Inventory(row));
    }

    static async updateById(id, { itemName, itemCategory, price, inStock }) {
        const existingInventoryItem = await Inventory.getbyID(id);
        const newItemName = itemName ?? existingInventoryItem.itemName;
        const newItemCategory = itemCategory ?? existingInventoryItem.itemCategory;
        const newPrice = price ?? existingInventoryItem.price;
        const newInStock = inStock ?? existingInventoryItem.inStock;

        const { rows } = await pool.query('UPDATE inventory SET item_name=$1, item_category=$2, price=$3, in_stock=$4 WHERE id=$5 RETURNING *', [
            newItemName,
            newItemCategory,
            newPrice,
            newInStock,
            id
        ]);

        return new Inventory(rows[0]);
    }

    static async deleteById(id) {
        const { rows } = await pool.query('DELETE FROM inventory WHERE id=$1 RETURNING *', [id]);

        return new Inventory(rows[0]);
    }

}