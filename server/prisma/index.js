const {PrismaClient}= require('@prisma/client');

const prisma = new PrismaClient();

async function main(){
    const allPurchases = await prisma.purchases.findMany();
    console.log(allPurchases);
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })