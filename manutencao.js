const mongoose = require('mongoose');

// Definição do esquema da Manutenção (Maintenance)
const manutencaoSchema = new mongoose.Schema({
  oficina: { type: mongoose.Schema.Types.ObjectId, ref: 'Oficina' }, // referência para a oficina onde a manutenção foi feita
  veiculo: { type: mongoose.Schema.Types.ObjectId, ref: 'Veiculo' }, // referência para o veículo que passou pela manutenção
  servicos: [{ nome: String, preco: Number }], // lista de serviços prestados com seus respectivos preços
  data: { type: Date, default: Date.now }, // data da manutenção
  custoTotal: { type: Number, default: 0 } // valor total da manutenção (calculado automaticamente)
});

// Middleware para calcular o custo total antes de salvar
manutencaoSchema.pre('save', function (next) {
  this.custoTotal = this.servicos.reduce((acc, servico) => acc + servico.preco, 0);
  next();
});

const Manutencao = mongoose.model('Manutencao', manutencaoSchema);
module.exports = Manutencao;
