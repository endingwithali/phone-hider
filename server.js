import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import Nexmo from 'nexmo';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_API_SECRET,
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function(req, res){
  res.send('Success')
})

/**
 * Handle life cycle webhook calls for the calling events 
 */
app.get('/webhooks/voice-status', (req, res) =>{
    console.log(req.query)
    res.status(200).end();
})

/**
 * Handle inbound calls
 */
app.get('/webhooks/voice-inbound', (req,res) =>{
  const ncco = [{
    action: 'talk',
    text: `Thanks for calling Ali.  
        You received my number via my mom - sadly, 
        I did not opt into this introduction. 
        Please ask her to inquire with me first about contacting me. 
        Thanks for understanding.`
  }];
  res.json(ncco)
})

/**
 * Handle life cycle webhook calls for the messaging events
 */
app.get('/webhooks/message-status', (req, res) =>{
    console.log(req.query)
    res.status(200).end();
})

/**
 * Handle received texts by sending a response message
 */
app.get('/webhooks/message-inbound', (req,res) => {
    console.log(req.query);
    const texter = req.query.msisdn;
    nexmo.message.sendSms(
        process.env.NEXMO_NUMBER, 
        texter, 
        "Hi! Thanks for texting me - sadly, my mom did not ask if I am willing to opt into this introduction. Please ask her to inquire with me first about contacting me. Thanks for understanding.",
        (err, response) => {
            if (err){
                console.log(err)
                return;
            }
            console.log(response.messages[0])
        }
    
    );
    res.status(200).end();
})

app.listen(PORT, () => {
  console.log(`Listening on ${ PORT }`);
});



process.on('SIGINT', function() {
  console.log('Quitting...');
  process.exit(0);
});