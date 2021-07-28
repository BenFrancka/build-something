import pool from "../utils/pool";

export default class Inventory {
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
    }

}