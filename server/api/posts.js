const express = require('express');
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

router.get('/', async (req,res,next)=>{
    try{
        const allPosts = await prisma.post.findMany();
        res.send(allPosts)
    }catch(err){
        next(err)
    }
})


router.get('/user/:id', async (req,res,next)=>{
    try{
        const allPosts = await prisma.post.findMany({
            where:{
                authorId: Number(req.params.id)
            }
        });
        res.send(allPosts)
        // const user = await prisma.user.findUnique({
        //     where:{
        //         id: Number(req.params.id)
        //     },
        //     include:{
        //         posts: true
        //     }
        // });
        // res.send(user)
    }catch(err){
        next(err)
    }
})


router.get('/:id', async (req,res,next)=>{
    try{
        const post = await prisma.post.findUnique({
            where:{
                id: Number(req.params.id)
            }
        });
        res.send(post)
    }catch(err){
        next(err)
    }
})

router.delete('/:id', async (req,res,next)=>{
    try{
        const post = await prisma.post.delete({
            where:{
                id: Number(req.params.id)
            }
        });
        res.send(post)
    }catch(err){
        next(err)
    }
})

router.post('/', async (req,res,next)=>{
    try{
        const post = await prisma.post.create({
            data:req.body
        })
        res.send(post)
    }catch(err){
        next(err)
    }
})

router.put('/:id', async (req,res,next)=>{
    try{
        const post = await prisma.post.update({
            where:{
                id: Number(req.params.id)
            },
            data:req.body
        })
        res.send(post)
    }catch(err){
        next(err)
    }
})

module.exports = router;