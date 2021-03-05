const server = require('express').Router();
const axios = require('axios');
const mcache = require('memory-cache');

var cache = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url
    let cachedBody = mcache.get(key)
    if (cachedBody) {
      res.send(cachedBody)
      return
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body)
      }
      next()
    }
  }
}


server.get('/search', cache(20), async (req, res, next) => {
    try {
        const { keyword } = req.query;
        const {data} = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${keyword}`);
        const result = data.results

        const filterData = result.map((element, index) => (
            { 
                key: index,
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