/* these commands need to be run independently from the ones below them because you will need
to connect to the newly created database in order to run the next set*/

CREATE ROLE pizza LOGIN
  PASSWORD 'pizzadb'
  NOSUPERUSER INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION;

-- DROP DATABASE pizza;

CREATE DATABASE pizza
  WITH OWNER = pizza
       ENCODING = 'UTF8'
       TABLESPACE = pg_default
       LC_COLLATE = 'en_US.UTF-8'
       LC_CTYPE = 'en_US.UTF-8'
       CONNECTION LIMIT = -1;

/* The commands below should be run after the top two commands once you've connected to the created database
*/

CREATE SCHEMA pizzaown
  AUTHORIZATION pizza;

  -- Tables

CREATE TABLE pizzaown.category
(
  id serial NOT NULL,
  name text,
  CONSTRAINT "categoryPk" PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE pizzaown.category
  OWNER TO pizza;

CREATE TABLE pizzaown.price
(
  id serial NOT NULL,
  price money,
  CONSTRAINT "pricePk" PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE pizzaown.price
  OWNER TO pizza;

CREATE TABLE pizzaown.topping
(
  id serial NOT NULL,
  name text,
  CONSTRAINT "toppingPk" PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE pizzaown.topping
  OWNER TO pizza;

-- Table: pizzaown."toppingCategory"

-- DROP TABLE pizzaown."toppingCategory";

CREATE TABLE pizzaown."toppingCategory"
(
  "toppingId" integer NOT NULL,
  "categoryId" integer,
  CONSTRAINT "toppingCategoryPk" PRIMARY KEY ("toppingId"),
  CONSTRAINT "categoryFk" FOREIGN KEY ("categoryId")
      REFERENCES pizzaown.category (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT "toppingFk" FOREIGN KEY ("toppingId")
      REFERENCES pizzaown.topping (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE pizzaown."toppingCategory"
  OWNER TO pizza;

-- Table: pizzaown."toppingPrice"

-- DROP TABLE pizzaown."toppingPrice";

CREATE TABLE pizzaown."toppingPrice"
(
  "toppingId" integer NOT NULL,
  "priceId" integer,
  CONSTRAINT "toppingPricePk" PRIMARY KEY ("toppingId"),
  CONSTRAINT "priceFk" FOREIGN KEY ("priceId")
      REFERENCES pizzaown.price (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT "toppingFk" FOREIGN KEY ("toppingId")
      REFERENCES pizzaown.topping (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE pizzaown."toppingPrice"
  OWNER TO pizza;

  -- DROP TABLE pizzaown.sauce;

CREATE TABLE pizzaown.sauce
(
  id serial NOT NULL,
  name text,
  CONSTRAINT "saucePk" PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE pizzaown.sauce
  OWNER TO pizza;

CREATE TABLE pizzaown.size
(
  id serial NOT NULL,
  name text,
  CONSTRAINT "sizePk" PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE pizzaown.size
  OWNER TO pizza;

CREATE TABLE pizzaown."sizePrice"
(
  "sizeId" integer NOT NULL,
  "priceId" integer,
  CONSTRAINT "sizePricePk" PRIMARY KEY ("sizeId"),
  CONSTRAINT "sizePricePriceFk" FOREIGN KEY ("priceId")
      REFERENCES pizzaown.price (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT "sizePriceSizeFk" FOREIGN KEY ("sizeId")
      REFERENCES pizzaown.size (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE pizzaown."sizePrice"
  OWNER TO pizza;

CREATE TABLE pizzaown.crust
(
  id serial NOT NULL,
  name text,
  CONSTRAINT "crustPk" PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE pizzaown.crust
  OWNER TO pizza;

CREATE TABLE pizzaown."crustPrice"
(
  "crustId" integer NOT NULL,
  "priceId" integer,
  CONSTRAINT "crustPricePk" PRIMARY KEY ("crustId"),
  CONSTRAINT "crustPriceCrustFk" FOREIGN KEY ("crustId")
      REFERENCES pizzaown.crust (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT "crustPricePriceFk" FOREIGN KEY ("priceId")
      REFERENCES pizzaown.price (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE pizzaown."crustPrice"
  OWNER TO pizza;

CREATE TABLE pizzaown."saucePrice"
(
  "sauceId" integer NOT NULL,
  "priceId" integer,
  CONSTRAINT "saucePricePk" PRIMARY KEY ("sauceId"),
  CONSTRAINT "saucePricePriceFk" FOREIGN KEY ("priceId")
      REFERENCES pizzaown.price (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT "saucePriceSauceFk" FOREIGN KEY ("sauceId")
      REFERENCES pizzaown.sauce (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE pizzaown."saucePrice"
  OWNER TO pizza;
