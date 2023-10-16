const router = require('express').Router();
const path = require('path');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// serve up react front-end in production
// router.use((req, res) => {
//   res.sendFile(path.join(__dirname, '../../client/build/index.html'));
// });

// serve up react front-end in production
const root = path.join(__dirname,'..', '..', 'client', 'build')
router.use((req, res) => {
  //res.sendFile(path.join(__dirname, '../../client/build/index.html'));
  res.sendFile('index.html', { root });
});



module.exports = router;
