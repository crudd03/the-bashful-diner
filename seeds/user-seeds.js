const { User } = require('../models');

const userData = [
  {
    username: "server1",
    password: "password1"
  },
  {
    username: "server2",
    password: "password2"
  },
  {
    username: "server3",
    password: "password3"
  },
  {
    username: "server4",
    password: "password4"
  },
  {
    username: "server5",
    password: "password5"
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
