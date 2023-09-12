const express =require('express');
const router = express.Router();

const {getPurchases, getPurchase, createPurchase, deletePurchase} = require('../db');

router.get('/', async (req,res,next)=>{
    try {
        const  purchases = await getPurchases();
        res.send(purchases)
    } catch(err){
        next(err)
    }
})

router.get('/:id', async (req,res,next)=>{
    try {
        const  purchase = await getPurchase(req.params.id);
        res.send(purchase)
    } catch(err){
        next(err)
    }
})

router.post('/', async (req,res,next)=>{
    try {
        const purchase = await createPurchase(req.body)
        res.send(purchase)
    } catch(err){
        next(err)
    }
} )

router.delete('/:id', async (req,res,next)=>{
    try {
        const  purchase = await deletePurchase(req.params.id);
        res.send(purchase)
    } catch(err){
        next(err)
    }
})

module.exports = router;