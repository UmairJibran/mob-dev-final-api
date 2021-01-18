const { User, validate } = require('../models/User');
const router = require('express').Router();

router.get('/', (req,res) => res.send('<h1>User Route</h1>'));

router.post('/', async (req,res) => {
  const {error} = validate(req.body);
  if(error) return res.status(400).send(error.message);
  const {name, email, password, cnic ,mobile, address} = req.body;
  let newUser = new User({
    name,
    email,
    password,
    cnic,
    mobile,
    address
  });

  try {
    newUser = await newUser.save();
    res.send(newUser);
  } catch (error) {
    res.status(400).send('F**KED!:'+ error.message)
  }
});

module.exports = router;
