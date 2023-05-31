var express = require('express');
var MySql = require('../utils/mysql');
var Redis = require('../utils/redis');
var DynamoDB = require('../utils/dynamodb');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ message: 'This is home' });
});

router.get('/health', function (req, res, next) {
  res.json({ message: 'healthy' });
});

router.get('/healthcheck', async (req, res, next) => {

  const [redisStatus, rdsStatus, dynamodbStatus] = await Promise.all([
    Redis.checkConnection(),
    MySql.checkConnection(),
    DynamoDB.checkConnection()
  ]);

  const statusCode = redisStatus && rdsStatus && dynamodbStatus ? 200 : 500;

  res.status(statusCode).json({ redis: redisStatus, rds: rdsStatus, dynamodb: dynamodbStatus, serverStatus: redisStatus && rdsStatus && dynamodbStatus });
});

module.exports = router;
