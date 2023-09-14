const express = require('express');
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

router.get('/', async (req,res,next)=>{
    try{
       const allProducts = await prisma.products.findMany();
       res.send(allProducts)
    }catch(err){
        next(err)
    }
})

router.get('/:id', async (req,res,next)=>{
    try{
        const product = await prisma.products.findUnique({
            where:{
                id: Number(req.params.id)
            }
        });
        res.send(product)
    }catch(err){
        next(err)
    }
})

router.delete('/:id', async (req,res,next)=>{
    try{
        const product = await prisma.products.delete({
            where:{
                id: Number(req.params.id)
            }
        });
        res.send(product)
    }catch(err){
        next(err)
    }
})

router.post('/', async (req,res,next)=>{
    try{
        const product = await prisma.products.create({
            data:req.body
        })
        res.send(product)
    }catch(err){
        next(err)
    }
})

router.put('/:id', async (req,res,next)=>{
    try{
        const product = await prisma.products.update({
            where:{
                id: Number(req.params.id)
            },
            data:req.body
        })
        res.send(product)
    }catch(err){
        next(err)
    }
})

module.exports = router;