const server = require('express').Router();
const axios = require('axios');

server.get('/', async (req, res, next) => {
    try {
        const { keyword } = req.query;
        const {data} = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${keyword}`);
        const result = data.results

        const filterData = result.map(element => (
            {
                id: element.id,
                title: element.title,
                price: element.price,
                currency_id: element.currency_id,
                available_quantity: element.available_quantity,
                thumbnail: element.thumbnail,
                condition: element.condition
            }
        ))
         res.json(filterData);
    } catch (error) {
      next(error);
    }
  });

  module.exports = server;