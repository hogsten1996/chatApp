const client = require('./db/client');

// remove all tables if they already exist
async function dropTables() {
    try {
        console.log('Dropping All Tables...');
        await client.query(`
      DROP TABLE IF EXISTS purchases;
      DROP TABLE IF EXISTS sales;
    `);
    } catch (error) {
        throw error;
    }
}

// build all tables
async function createTables() {
    try {
        console.log('Building All Tables...');
        await client.query(`
        CREATE TABLE sales (
            id SERIAL PRIMARY KEY,
            date DATE NOT NULL,
            amount DECIMAL NOT NULL,
            description VARCHAR(255) NOT NULL
        );`);
        await client.query(`
        CREATE TABLE purchases (
            id SERIAL PRIMARY KEY,
            date DATE NOT NULL,
            amount DECIMAL NOT NULL,
            description VARCHAR(255) NOT NULL
        );
        `);
    } catch (error) {
        throw error;
    }
}

// create initial sales
async function createInitialSales() {
    try {
        console.log('Starting to create sales...');
        const salesToCreate = [
            { date: '2023-01-02', amount: 1100, description: 'Rental Outside' },
            { date: '2023-01-03', amount: 100, description: 'Rental Inside' },
            { date: '2023-01-04', amount: 200, description: 'DJ Inside' },
            { date: '2023-01-05', amount: 300, description: 'Chairs Inside' },
            { date: '2023-01-06', amount: 400, description: 'Tables and DJ Inside' },
        ];
        const salesPromises = salesToCreate.map(sale => {
            return client.query(`
            INSERT INTO sales(date, amount, description)
            VALUES ($1, $2, $3)
            RETURNING *;
            `, Object.values(sale));
        });
        const sales = await Promise.all(salesPromises);
        console.log('Finished creating sales!');

    } catch (error) {
        throw error;
    }
}

// create initial purchases
async function createInitialPurchases() {
    try {
        console.log('Starting to create purchases...');
        const purchasesToCreate = [
            { date: '2023-01-01', amount: 100, description: 'New Years Dinner' },
            { date: '2023-01-02', amount: 80, description: 'Phone bill' },
            { date: '2023-01-03', amount: 125, description: 'Credit card' },
            { date: '2023-01-04', amount: 650, description: 'Rent' },
            { date: '2023-01-05', amount: 93, description: 'Groceries' },
        ];
        const purchasesPromises = purchasesToCreate.map(purchase => {
            return client.query(`
            INSERT INTO purchases(date, amount, description)
            VALUES ($1, $2, $3)
            RETURNING *;
            `, Object.values(purchase));
        });
        const purchases = await Promise.all(purchasesPromises);
        console.log('Finished creating purchases!');
    } catch (error) {
        throw error;
    }
}

// build all tables, remove all data, and create and populate tables
async function rebuildDB() {
    try {
        client.connect();
        await dropTables();
        await createTables();
        await createInitialSales();
        await createInitialPurchases();
    } catch (error) {
        throw error;
    }
}

module.exports = {
    rebuildDB,
};