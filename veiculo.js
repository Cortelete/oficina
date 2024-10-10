const mongoose = require('mongoose');

// Definição do esquema do Veículo (Vehicle)
const veiculoSchema = new mongoose.Schema({
  placa: { type: String, required: true }, // placa do veículo
  modelo: { type: String, required: true }, // modelo do veículo
  ano: { type: Number, required: true }, // ano de fabricação
  proprietario: { type: String, required: true }, // nome do proprietário
  manutencoes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Manutencao' }] // referência para as manutenções do veículo
});

const Veiculo = mongoose.model('Veiculo', veiculoSchema);
module.exports = Veiculo;
