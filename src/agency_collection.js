/*import {client} from './dbconnect.js';

const collection = client.db('Fastkar').collection('roadAssistanceProviders');

export const getroadAssistanceProviders = (req, res)=>{
    client.connect((err)=>{
        if(err){
            res.status(500).send(err);
            return;
        }
        collection.find().toArray((err, result) =>{
            if(err){
                res.status(500).send(err);
            } 
            if(result){
                res.json(result);
                client.close();
            }
        });

    });
}

export const getroadAssistanceProviders_agency = (req, res) => {
  const agency = req.agency;

  collection.findOne({agency: agency}, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result);  
    }
  });
}

export const getroadAssistanceProviders_agent = (req, res) => {
  const agent = req.agent;

  collection.findOne({agent: agent}, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result);  
    }
  });
}

export const getroadAssistanceProviders_phone = (req, res) => {
  const phone = req.phone;

  collection.findOne({phone: phone}, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result);  
    }
  });
}
*/