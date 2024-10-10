const express = require('express');
const mongoose = require('mongoose');
const rotaOficina = require('./rotaOficina'); // Importando rotas de oficina
const rotaVeiculo = require('./rotaVeiculo'); // Importando rotas de veículo
const rotaManutencao = require('./rotaManutencao'); // Importando rotas de manutenção

const app = express();
const PORT = 3000;

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost/oficina_mecanica', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB conectado com sucesso!');
}).catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
});

// Middleware para parsing de JSON
app.use(express.json());

// Definindo rotas
app.use('/oficina', rotaOficina);
app.use('/veiculo', rotaVeiculo);
app.use('/manutencao', rotaManutencao);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}...`);
});
