require('dotenv').config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // apenas homologação

const cors = require('cors');
const express = require('express');

function setupExpress(app) {
  app.use(express.json());
  app.use(cors());
}

module.exports = { setupExpress };
