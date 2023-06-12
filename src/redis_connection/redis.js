require('dotenv').config({path: __dirname+'/../../.env'});
const {createClient} = require('redis');

const client = createClient({
  url: process.env.REDIS_URL
});

client.connect();

client.on('connect', ()=>{
  console.log('connected to redis')
})

module.exports.redis = client;