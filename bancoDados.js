const mongoose = require('mongoose');

// Conectando ao banco de dados MongoDB
mongoose.connect('mongodb://localhost/oficina_mecanica', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado ao MongoDB com sucesso!');
}).catch((err) => {
  console.error('Erro ao conectar ao MongoDB:', err);
});
