const express = require("express");

const client = require("../configs/redis");

const product = require("../models/product.models");

const router = express.Router();

router.post("", async (req, res) => {
  try {
    const product = await product.create(req.body);

    const products = await product.find().lean().exec();

    client.set("products", JSON.stringify(products));

    return res.status(201).send(product);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("", async (req, res) => {
  try {
    client.get("products", async function (err, fetchedproducts) {
      if (fetchedproducts) {
        const products = JSON.parse(fetchedproducts);

        return res.status(200).send({ products, redis: true });
      } else {
        try {
          const products = await product.find().lean().exec();

          client.set("products", JSON.stringify(products));

          return res.status(200).send({ products, redis: false });
        } catch (err) {
          return res.status(500).send({ message: err.message });
        }
      }
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    client.get(`products.${req.params.id}`, async function (err, fetchedproduct) {
      if (fetchedproduct) {
        const product = JSON.parse(fetchedproduct);

        return res.status(200).send({ product, redis: true });
      } else {
        try {
          const product = await product.findById(req.params.id).lean().exec();

          client.set(`products.${req.params.id}`, JSON.stringify(product));

          return res.status(200).send({ product, redis: false });
        } catch (err) {
          return res.status(500).send({ message: err.message });
        }
      }
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const product = await product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    const products = await product.find().lean().exec();

    client.set(`products.${req.params.id}`, JSON.stringify(product));
    client.set("products", JSON.stringify(products));

    return res.status(200).send(todo);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const product = await product.findByIdAndDelete(req.params.id).lean().exec();

    const products = await product.find().lean().exec();

    client.del(`products.${req.params.id}`);
    client.set("products", JSON.stringify(products));

    return res.status(200).send(product);
  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: err.message });
    
  }
});

module.exports = router;
