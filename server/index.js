import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my API!' });
});


app.listen(5000,(req, res) => {
    console.log('Server running on port 5000');
  
})