import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();


app.get('/', function(req, res){
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Listening on ${ PORT }`);
});

process.on('SIGINT', function() {
    console.log('Quitting...');
    process.exit(0);
});