```
Esse arquivo é o servidor Node.js que vai gerenciar as requisições HTTP e interagir com o banco de dados MongoDB.

```	
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { OAuth2Client } = require('google-auth-library');
```
Importa as dependências necessárias para o servidor Node.js e o banco de dados MongoDB. 
  - Express é um framework web para Node.js que facilita a criação de APIs RESTful. Ele que vai criar o servidor web 
para gerenciar as rotas e requisições HTTP. 
  - Mongoose é uma biblioteca para modelar objetos MongoDB. Ele quem estabelece a conexão com o banco de dados e
define MongoDB e facilita a interação com o DB, com esquemas, modelos e CRUD.
  - Cors é um middleware para permitir requisições de origens diferentes.
  - OAuth2Client é uma classe para autenticar usuários com o Google.
```

// Cria uma instância do Express e define a porta do servidor. 
const app = express();
const port = process.env.PORT || 5000;

// Cria uma instância do OAuth2Client com o ID do cliente OAuth 2.0 do Google.
const client = new OAuth2Client('60153437629-j0ig1ntfbslgr7je2d5617fuqv10kh74.apps.googleusercontent.com');


app.use(cors()); 
```
Middleware para permitir requisições de qualquer origem. Isso é útil em situações onde o frontend e o 
backend estão hospedados em domínios diferentes e precisam se comunicar.
```
app.use(express.json());
```	
- Express.json() é um middleware que analisa requisições com payload JSON.
- Isso permite que o servidor entenda e processe dados JSON enviados em requisições HTTP.
```

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
```
- O esquema do usuário define a estrutura dos documentos de usuário no MongoDB.
- Campos: email (string, obrigatório, único), name (string, obrigatório), password (string).
```

// Cria um modelo de usuário baseado no esquema definido.
const User = mongoose.model('User', userSchema);

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
```
  - Endpoint POST /register para registrar um novo usuário.
  - Recebe email, password e name no corpo da requisição.
  - Cria um novo documento de usuário e salva no MongoDB.
  - Retorna uma mensagem de sucesso ou um erro.
```

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
    res.json({ success: true });
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});
```
  - Endpoint POST /login para autenticar um usuário.
  - Recebe email e password no corpo da requisição.
  - Verifica se o usuário existe e se a senha está correta.
  - Retorna uma mensagem de sucesso ou erro.
```

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
```
  - Endpoint POST /google-login para autenticar um usuário com Google.
  - Recebe um token do Google no corpo da requisição.
  - Verifica o token e extrai as informações do usuário.
  - Cria um novo usuário no MongoDB se ele não existir.
  - Retorna uma mensagem de sucesso ou erro.
```

// Inicia o servidor e faz com que ele escute na porta definida.
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});