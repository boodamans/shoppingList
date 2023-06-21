const express = require('express');
const router = express.Router();
const Item = require('./item')

const items = require('./fakeDb.js')
// Routes
router.get('/', (req, res) => {
  res.send(items);
  console.log(items)
});

router.post('/', (req, res) => {
  const { name, price } = req.body;
  const newItem = new Item(name, price);
  items.push(newItem);
  res.status(201).send(`added ${newItem.name}`);
});

router.get('/:name', (req, res) => {
  const itemName = req.params.name;
  const item = items.find((item) => item.name === itemName);

  if (!item) {
    return res.status(404).send('Item not found');
  }

  res.send(item);
});

router.patch('/:name', (req, res) => {
  const itemName = req.params.name;
  const updatedItem = req.body;

  const itemIndex = items.findIndex((item) => item.name === itemName);

  if (itemIndex === -1) {
    return res.status(404).send('Item not found');
  }

  // Update the item
  items[itemIndex] = {
    ...items[itemIndex],
    ...updatedItem
  };

  res.send(`updated to ${updatedItem.name}`);
});

router.delete('/:name', (req, res) => {
  const itemName = req.params.name;

  const itemIndex = items.findIndex((item) => item.name === itemName);

  if (itemIndex === -1) {
    return res.status(404).send('Item not found');
  }

  // Remove the item from the array
  items.splice(itemIndex, 1);

  res.send('Deleted');
});

module.exports = router;