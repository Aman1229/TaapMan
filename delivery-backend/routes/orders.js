//routes/orders.js
const express = require('express');
const router = express.Router();

const auth = (req, res, next) => {
    req.user = {
        createOrder: async(data) => ({}),
        getOrders: async(query) => ([])
    };
    next();
};

router.post('/', auth, async(req, res) => {
    try {
        const order = await req.user.createOrder(req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: 'Order creation failed' });
    }
});

router.get('/:id([0-9]+)', auth, async(req, res) => {
    try {
        const order = await req.user.getOrders({
            where: { id: req.params.id },
            include: ['Delivery']
        });
        res.json(order[0]);
    } catch (error) {
        res.status(400).json({ error: 'Order fetch failed' });
    }
});

module.exports = router;
