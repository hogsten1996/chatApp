const express =require('express');
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

router.get('/', async (req,res,next)=>{
    try {
        const allPurchases = await prisma.purchases.findMany();
        res.send(allPurchases)
    } catch(err){
        next(err)
    }
})

router.get('/:id', async (req,res,next)=>{
    try {

        const purchase = await prisma.purchases.findUnique({
            where:{
                id: Number(req.params.id)
            }
        })
        res.send(purchase)

    } catch(err){
        next(err)
    }
})
//
router.post('/', async (req,res,next)=>{
    try {
        const purchase = await prisma.purchases.create({
            data:req.body
        })
        res.send(purchase);
    } catch(err){
        next(err)
    }
} )
//
router.put("/:id", async  (req,res,next)=>{
    try{
        const updatedPurchase = await prisma.purchases.update({
            where:{
                id:Number(req.params.id)
            },
            data:req.body
        })
        res.send(updatedPurchase)
    }catch(err){
        console.log(err)
    }
})

router.delete('/:id', async (req,res,next)=>{
    try {
        const purchase = await prisma.purchases.delete(
            {
                where: {
                    id: Number(req.params.id)
                }
            }
        )
        res.send(purchase);
    } catch(err){
        next(err)
    }
})

module.exports = router;