const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { OAuth2Client } = require('google-auth-library');

const app = express();
const port = process.env.PORT || 5000;
const client = new OAuth2Client('60153437629-j0ig1ntfbslgr7je2d5617fuqv10kh74.apps.googleusercontent.com');

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://bryanbernardo:bryanbernardo12345678@montacalendario.mzzfz.mongodb.net/?retryWrites=true&w=majority&appName=MontaCalendario";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

// User schema and model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String }
});

const User = mongoose.model('User', userSchema);

// Register endpoint
app.post('/register', async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const newUser = new User({ email, password, name });
        await newUser.save();
        res.json('User registered!');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }
    if (user.password !== password) {
      return res.json({ success: false, message: 'Incorrect password' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// Google login endpoint
app.post('/google-login', async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json('Error: Token não fornecido');
    }
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: '60153437629-j0ig1ntfbslgr7je2d5617fuqv10kh74.apps.googleusercontent.com',
      });
      const payload = ticket.getPayload();
      console.log("Token verificado com sucesso:", payload);
  
      const { email, name } = payload;
  
      let user = await User.findOne({ email });
      if (!user) {
        console.log("Usuário não encontrado, criando novo usuário...AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        user = new User({ email, name });
        await user.save();
      } 
      res.json({ success: true, user: { email, name } });
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});