const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { OAuth2Client } = require('google-auth-library');
const fs = require('fs');
const path = require('path');

// Cria uma instância do Express e define a porta do servidor.
const app = express();
const port = process.env.PORT || 5000;

// Cria uma instância do OAuth2Client com o ID do cliente OAuth 2.0 do Google.
const client = new OAuth2Client('60153437629-j0ig1ntfbslgr7je2d5617fuqv10kh74.apps.googleusercontent.com');

app.use(cors()); 
app.use(express.json());

// Conecta ao banco de dados MongoDB usando a URI fornecida.
const uri = "mongodb+srv://bryanbernardo:bryanbernardo12345678@montacalendario.mzzfz.mongodb.net/?retryWrites=true&w=majority&appName=MontaCalendario";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Estabelece a conexão com o banco de dados e exibe uma mensagem de sucesso.
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String }
});

// Cria um modelo de usuário baseado no esquema definido.
const User = mongoose.model('User', userSchema);

const agendaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  daysOfWeek: { type: [String], required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  periodsPerDay: { type: Number, required: true },
  periodDuration: { type: Number, required: true },
  numberOfClasses: { type: Number, required: true },
  subjects: [{ name: { type: String, required: true }, periodsPerWeek: { type: Number, required: true } }],
  teachers: [{ name: { type: String, required: true }, subject: { type: String, required: true }, workload: { type: Number, required: true } }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

// Cria um modelo de agenda baseado no esquema definido.
const Agenda = mongoose.model('Agenda', agendaSchema);

// Endpoint para registro de usuário
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

// Endpoint para login de usuário.
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
    res.json({ success: true, user });
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// Endpoint para login com Google.
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
      console.log("Usuário não encontrado, criando novo usuário...");
      user = new User({ email, name });
      await user.save();
    } 
    res.json({ success: true, user: { email, name } });
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// Endpoint para registro da agenda
app.post('/schedule', async (req, res) => {
  const { name, daysOfWeek, startTime, endTime, periodsPerDay, periodDuration, numberOfClasses, subjects, teachers, user } = req.body;
  try {
    const userId = await User.findOne({ email: user }).select('_id');
    const newSchedule = new Schedule({ name, daysOfWeek, startTime, endTime, periodsPerDay, periodDuration, numberOfClasses, subjects, teachers, user: userId });
    await newSchedule.save();
    res.json({ success: true, message: 'Schedule registered!' });
  } catch (err) {
    console.log('Error:', err);
    res.status(400).json({ success: false, message: 'Error: ' + err });
  }
});

// // Novo endpoint para buscar a agenda por ID
// app.get('/schedule/:id', async (req, res) => {
//   try {
//     const schedule = await Schedule.findById(req.params.id);
//     if (!schedule) {
//       return res.status(404).json({ success: false, message: 'Schedule not found' });
//     }
//     res.json({ success: true, schedule });
//   } catch (err) {
//     res.status(400).json({ success: false, message: 'Error: ' + err });
//   }
// });

// // Endpoint para listar todas as agendas de um usuário pelo ID
// app.get('/schedules/:userId', async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }
//     const schedules = await Schedule.find({ user: userId });

//     // Cria um arquivo JSON com as agendas do usuário
//     const filePath = path.join(__dirname, 'user_schedules.json');
//     fs.writeFileSync(filePath, JSON.stringify(schedules, null, 2));

//     res.json({ success: true, schedules });
//   } catch (err) {
//     res.status(400).json({ success: false, message: 'Error: ' + err });
//   }
// });

// Inicia o servidor e faz com que ele escute na porta definida.
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});