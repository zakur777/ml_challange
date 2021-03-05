const { Router } = require('express');

//import all routers
const pruebaRouter = require('./api.js')

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/api', pruebaRouter);

module.exports = router;