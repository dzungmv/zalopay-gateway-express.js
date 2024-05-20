const qs = require('qs');
const CryptoJS = require('crypto-js');
const axios = require('axios')


const config = {
  app_id: "2553",
  key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
  key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
  endpoint: "https://sb-openapi.zalopay.vn/v2/create"
};


async function checkingPayment(req, res) {
  const app_trans_id = req.body.app_trans_id

  let postData = {
    app_id: config.app_id,
    app_trans_id
  }

  let data = postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
  postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();


  let postConfig = {
    method: 'post',
    url: 'https://sb-openapi.zalopay.vn/v2/query',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(postData)
  };

  try {

    const response = await axios(postConfig)

    if (response.data.return_code === 1) {
      return res.status(200).json({
        statusCode: 200,
        message: 'Order successfully!',
      })
    }

    return res.status(403).json({
      statusCode: 403,
      message: 'Order failed!'
    })
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Cant not checking this order!'
    })
  }
}

module.exports = checkingPayment
