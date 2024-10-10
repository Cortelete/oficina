const mongoose = require('mongoose');

// Definição do esquema da Oficina (Workshop)
const oficinaSchema = new mongoose.Schema({
  nome: { type: String, required: true }, // nome da oficina
  endereco: { type: String, required: true }, // endereço da oficina
  especialidades: [String], // lista de especialidades
  manutencoes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Manutencao' }] // referência para as manutenções realizadas na oficina
});

const Oficina = mongoose.model('Oficina', oficinaSchema);
module.exports = Oficina;
