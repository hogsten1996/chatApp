router.post("/", authorization, async (req, res, next) => {
    const { booksId, quantity, price, title } = req.body;
    try {
        const openOrder = await prisma.order.findFirst({
            where: {
                userId: req.user.userId,
                isFulfilled: false,
            },
            include: {
                order_products: true,
            },
        });

        const existingBook = openOrder.order_products.find(
            (book) => book.booksId === booksId
        );

        if (existingBook) {
            const updatedOrderProduct = await prisma.order_product.update({
                where: { id: existingBook.id },
                data: {
                    quantity: existingBook.quantity + quantity,
                },
            });

            const openOrder = await prisma.order.findFirst({
                where: {
                    userId: req.user.id,
                    isFulfilled: false,
                },
                include: {
                    order_products: true,
                },
            });


            res.send({addedToCart: openOrder.order_products})
        } else {
            const createdOrderProduct = await prisma.order_product.create({
                data: {
                    orderId: openOrder.id,
                    booksId,
                    quantity,
                    price,
                    title,
                },
            });
            const updatedOrder = await prisma.order.findFirst({
                where: {
                    userId: req.user.id,
                    isFulfilled: false,
                },
                include: {
                    order_products: true,
                },
            });
            res.send({addedToCart: updatedOrder.order_products})
        }
    } catch (err) {
        next(err);
    }
});