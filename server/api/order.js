router.put("/submit", authorization, async (req, res, next) => {

    try {
        async function findOpenOrder() {
            const openOrder = await prisma.order.findFirst({
                where: {
                    userId: req.user.id,
                    isFulfilled: false,
                },
            });
            console.log(openOrder)
            return openOrder.id;
        }
        async function closeOrder() {
            const ClosedOrder = await prisma.order.update({
                where: {
                    id: await findOpenOrder(),
                },
                data: {
                    isFulfilled: true,
                },
            });
        }

        closeOrder();

        const NewOrder = await prisma.order.create({
            data: {
                userId: req.user.id,
                isFulfilled: false,
            },
        });

        res.send({ NewOrder});
    } catch (err) {
        next(err);
    }
});

module.exports = router;