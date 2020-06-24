const serverAPI = "localhost:3000";
const axios = require("axios");

// LOGIN
const input = {
  email: "test@gmail.com",
  password: "qweasdzxc",
};
await axios.get(`${serverAPI}/user/login`, input);

const output = {
  user: {
    balance: 0,
    _id: "5ef19bd93c519e0e38b71e75",
    email: "test9@gmail.com",
    name: "TEST",
    createdAt: "2020-06-23T06:06:17.423Z",
    updatedAt: "2020-06-24T10:38:19.128Z",
    __v: 7,
  },
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWYxOWJkOTNjNTE5ZTBlMzhiNzFlNzUiLCJpYXQiOjE1OTI5OTUwOTl9.KsABAkBboAswcBOYDsp0df1h_9Mdk1qC6zqWakDTQaY",
};
/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
// GET USER INFO
input = {
  token:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWYxOWJkOTNjNTE5ZTBlMzhiNzFlNzUiLCJpYXQiOjE1OTI5OTUwOTl9.KsABAkBboAswcBOYDsp0df1h_9Mdk1qC6zqWakDTQaY",
};
await axios.get(`${serverAPI}/user/me`, input);

output = {
  balance: 0,
  _id: "5ef19bd93c519e0e38b71e75",
  email: "test9@gmail.com",
  name: "TEST",
  createdAt: "2020-06-23T06:06:17.423Z",
  updatedAt: "2020-06-24T10:38:19.128Z",
  __v: 7,
};
/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
// RECHARGE
input = {
  token:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWYxOWJkOTNjNTE5ZTBlMzhiNzFlNzUiLCJpYXQiOjE1OTI5OTUwOTl9.KsABAkBboAswcBOYDsp0df1h_9Mdk1qC6zqWakDTQaY",
  balance: 20,
};
await axios.patch(`${serverAPI}/recharge`, input);

output = {
  balance: 20,
  _id: "5ef19bd93c519e0e38b71e75",
  email: "test9@gmail.com",
  name: "TEST",
  createdAt: "2020-06-23T06:06:17.423Z",
  updatedAt: "2020-06-24T10:52:24.029Z",
  __v: 7,
};
/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
// GET PRODUCTS
input = {};
await axios.get(`${serverAPI}/products`, input);
// productID = tên file img luôn nha
output = [
  {
    _id: "5ef334afc8cb1239f869224d",
    name: "Cơm sườn",
    price: 25000,
    productID: 1,
    createdAt: "2020-06-24T11:10:39.466Z",
    updatedAt: "2020-06-24T11:10:39.466Z",
    __v: 0,
  },
  {
    _id: "5ef3355351b7711e60d02e23",
    name: "Phở",
    price: 35000,
    productID: 2,
    createdAt: "2020-06-24T11:13:23.074Z",
    updatedAt: "2020-06-24T11:13:23.074Z",
    __v: 0,
  },
  {
    _id: "5ef335c784b2040f70fa6191",
    name: "Hủ tiếu",
    price: 25000,
    productID: 3,
    createdAt: "2020-06-24T11:15:19.431Z",
    updatedAt: "2020-06-24T11:15:19.431Z",
    __v: 0,
  },
  {
    _id: "5ef335d384b2040f70fa6192",
    name: "Bún đậu mắm tôm",
    price: 40000,
    productID: 4,
    createdAt: "2020-06-24T11:15:31.453Z",
    updatedAt: "2020-06-24T11:15:31.453Z",
    __v: 0,
  },
  {
    _id: "5ef335e484b2040f70fa6193",
    name: "Bánh xèo",
    price: 35000,
    productID: 5,
    createdAt: "2020-06-24T11:15:48.583Z",
    updatedAt: "2020-06-24T11:15:48.583Z",
    __v: 0,
  },
  {
    _id: "5ef335ef84b2040f70fa6194",
    name: "Aquafina",
    price: 10000,
    productID: 6,
    createdAt: "2020-06-24T11:15:59.398Z",
    updatedAt: "2020-06-24T11:15:59.398Z",
    __v: 0,
  },
  {
    _id: "5ef335fb84b2040f70fa6195",
    name: "Pepsi",
    price: 12000,
    productID: 7,
    createdAt: "2020-06-24T11:16:11.973Z",
    updatedAt: "2020-06-24T11:16:11.973Z",
    __v: 0,
  },
  {
    _id: "5ef3360884b2040f70fa6196",
    name: "Cocacola",
    price: 12000,
    productID: 8,
    createdAt: "2020-06-24T11:16:24.755Z",
    updatedAt: "2020-06-24T11:16:24.755Z",
    __v: 0,
  },
];
/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
// ADD ORDER
input = {
  token:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWYxOWJkOTNjNTE5ZTBlMzhiNzFlNzUiLCJpYXQiOjE1OTI5OTUwOTl9.KsABAkBboAswcBOYDsp0df1h_9Mdk1qC6zqWakDTQaY",
  productID: 4,
  ammount: 3,
};
await axios.post(`${serverAPI}/orderAPI`, input);

output = {
  orderType: "ordering",
  _id: "5ef33fad7ba65e29b41479cf",
  name: "Bún đậu mắm tôm",
  price: 40000,
  ammount: 3,
  productID: 4,
  owner: "5ef19bd93c519e0e38b71e75",
  createdAt: "2020-06-24T11:57:33.250Z",
  updatedAt: "2020-06-24T11:57:33.250Z",
  __v: 0,
};
/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
// GET ORDERS
input = {
  token:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWYxOWJkOTNjNTE5ZTBlMzhiNzFlNzUiLCJpYXQiOjE1OTI5OTUwOTl9.KsABAkBboAswcBOYDsp0df1h_9Mdk1qC6zqWakDTQaY",
};
await axios.post(`${serverAPI}/order`, input);

output =
  /**
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   */
  // GET ORDERS
  input = {
    token:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWYxOWJkOTNjNTE5ZTBlMzhiNzFlNzUiLCJpYXQiOjE1OTI5OTUwOTl9.KsABAkBboAswcBOYDsp0df1h_9Mdk1qC6zqWakDTQaY",
  };
await axios.get(`${serverAPI}/orders`, input);

output = [
  {
    orderType: "ordering",
    _id: "5ef33dbb96a7ad2490312377",
    name: "Cơm sườn",
    price: 25000,
    ammount: 2,
    productID: 1,
    owner: "5ef19bd93c519e0e38b71e75",
    createdAt: "2020-06-24T11:49:15.821Z",
    updatedAt: "2020-06-24T11:49:15.821Z",
    __v: 0,
  },
  {
    orderType: "ordering",
    _id: "5ef33e6a8c80a0050857c32e",
    name: "Phở",
    price: 35000,
    ammount: 2,
    productID: 2,
    owner: "5ef19bd93c519e0e38b71e75",
    createdAt: "2020-06-24T11:52:10.865Z",
    updatedAt: "2020-06-24T11:52:10.865Z",
    __v: 0,
  },
  {
    orderType: "ordering",
    _id: "5ef33eebe9f6b9288034c0a5",
    name: "Hủ tiếu",
    price: 25000,
    ammount: 3,
    productID: 3,
    owner: "5ef19bd93c519e0e38b71e75",
    createdAt: "2020-06-24T11:54:19.691Z",
    updatedAt: "2020-06-24T11:54:19.691Z",
    __v: 0,
  },
  {
    orderType: "ordering",
    _id: "5ef33fad7ba65e29b41479cf",
    name: "Bún đậu mắm tôm",
    price: 40000,
    ammount: 3,
    productID: 4,
    owner: "5ef19bd93c519e0e38b71e75",
    createdAt: "2020-06-24T11:57:33.250Z",
    updatedAt: "2020-06-24T11:57:33.250Z",
    __v: 0,
  },
];
