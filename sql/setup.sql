DROP TABLE IF EXISTS inventory;

CREATE TABLE inventory (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    item_name TEXT NOT NULL,
    item_category TEXT NOT NULL,
    price INTEGER NOT NULL,
    in_stock BOOLEAN NOT NULL
);