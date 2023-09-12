const client = require('./client');

async function getPurchases(){
    try{
       const {rows} = await client.query('SELECT * FROM purchases');
       return rows;
    } catch(err){
        throw err;
    }
}

async function getPurchase(id){
    try{
        const {rows} = await client.query('SELECT * FROM purchases WHERE id=$1', [id]);
        return rows[0];
    } catch(err){
        throw err;
    }
}

async function createPurchase(body){
    try{
        const {rows: [purchase]} = await  client.query('INSERT INTO purchases ( date, amount, description) VALUES ($1, $2, $3) RETURNING *', [body.date, body.amount, body.description]);
        return purchase;
    }catch(err){
        throw err;
    }
}

async function deletePurchase(id){
    try{
        const {rows} = await client.query('DELETE FROM purchases WHERE id=$1 RETURNING *', [id]);
        return rows[0];
    } catch(err){
        throw err;
    }
}

module.exports ={
    getPurchase,
    getPurchases,
    createPurchase,
    deletePurchase
}

