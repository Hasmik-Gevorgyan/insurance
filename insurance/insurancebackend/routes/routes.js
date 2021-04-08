const express = require('express')
const router = express.Router()
const insuranceTemplateCopy = require('../models/InsuranceModels')
const InsuranceActives = require('../models/IncuranceActives')
// const UpdateUserCopy = require('../models/UpdateUser');
// const db = client.db(dbName);

router.post('/insurance/active',(request,response) => {
    const actives = new InsuranceActives({
        value: request.body.value,
        name: request.body.name,
        date: request.body.date,
    })
    actives.save()
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        response.json(error)
    })
})

router.get('/insurance/active',(request,response) => {
   
    insuranceTemplateCopy.find({email: request.params.email})
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        response.json(error)
    })
})

router.put('/insurance/:email',(request,response) => {

    insuranceTemplateCopy.updateOne({email: request.params.email}, {$set:{fullName: request.body.fullName,
        userName: request.body.userName,
        password: request.body.password,}}, (err, result) => {
        if(err) {
          throw err;
        }
        response.send('user updated sucessfully');
      })
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        response.json(error)
    })
})


router.delete('/insurance/active/:id',(request,response) => {
   
    InsuranceActives.deleteOne({_id: request.params.id})
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        response.json(error)
    })
})

module.exports = router