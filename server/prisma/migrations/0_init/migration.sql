-- CreateTable
CREATE TABLE "purchases" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "amount" DECIMAL NOT NULL,
    "description" VARCHAR(255) NOT NULL,

    CONSTRAINT "purchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "amount" DECIMAL NOT NULL,
    "description" VARCHAR(255) NOT NULL,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

