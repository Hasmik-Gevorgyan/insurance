const express = require('express');
const router = express.Router();
const InsuranceActives = require('../models/IncuranceActives');
const InsurancePassives = require('../models/InsurancePassives');
const Actives = require('../models/Actives');
// const db = client.db(dbName);

router.post('/insurance/active', (request, response) => {
  const actives = new InsuranceActives({
    value: request.body.value,
    name: request.body.name,
    profit: request.body.profit,
    date: request.body.date,
  });
  actives
    .save()
    .then(data => {
      response.json(data);
    })
    .catch(error => {
      response.json(error);
    });
});

router.get('/insurance/active/details', (request, response) => {
  console.log('aaa', request.query, request.query.startDate);

  InsuranceActives.find({
    date: {
      $gte: request.query.startDate ? request.query.startDate : '2000-09-30T21:07:42.313+00:00',
      $lte: request.query.endDate ? request.query.endDate : new Date(),
    },
  })
    .sort({ date: -1 })
    .skip(Number(request.query.skip))
    .limit(Number(request.query.limit))
    .then(data => {
      response.json(data);
    })
    .catch(error => {
      response.json(error);
    });
});

router.put('/insurance/active/:id', (request, response) => {
  InsuranceActives.updateOne(
    { _id: request.params.id },
    {
      $set: {
        value: request.body.value,
        name: request.body.name,
        profit: request.body.profit,
        date: request.body.date,
      },
    },
    (err, result) => {
      if (err) {
        throw err;
      }
      response.send('user updated sucessfully');
    },
  )
    .then(data => {
      response.json(data);
    })
    .catch(error => {
      response.json(error);
    });
});

router.delete('/insurance/active/:id', (request, response) => {
  InsuranceActives.deleteOne({ _id: request.params.id })
    .then(data => {
      response.json(data);
    })
    .catch(error => {
      response.json(error);
    });
});

// ActiveTypes

router.post('/insurance/activeType', (request, response) => {
  const actives = new Actives({
    activeName: request.body.activeName,
    profitability: request.body.profitability,
  });
  actives
    .save()
    .then(data => {
      response.json(data);
    })
    .catch(error => {
      response.json(error);
    });
});

router.get('/insurance/activeType', (request, response) => {
  Actives.find()
    .then(data => {
      response.json(data);
    })
    .catch(error => {
      response.json(error);
    });
});

module.exports = router;
