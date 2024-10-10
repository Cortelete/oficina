const express = require('express');
const router = express.Router();
const Veiculo = require('../oficina/veiculo'); // Importa o modelo de Veículo

// Criar Veículo (store)
router.post('/', async (req, res) => {
  try {
    const veiculo = new Veiculo(req.body);
    await veiculo.save();
    res.status(201).json(veiculo);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

// Listar todos os Veículos (index)
router.get('/', async (req, res) => {
  try {
    const veiculos = await Veiculo.find();
    res.json(veiculos);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Listar Veículo específico (show)
router.get('/:id', async (req, res) => {
  try {
    const veiculo = await Veiculo.findById(req.params.id).populate('manutencoes');
    if (!veiculo) return res.status(404).json({ erro: 'Veículo não encontrado' });
    res.json(veiculo);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Atualizar Veículo (update)
router.put('/:id', async (req, res) => {
  try {
    const veiculo = await Veiculo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!veiculo) return res.status(404).json({ erro: 'Veículo não encontrado' });
    res.json(veiculo);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

// Deletar Veículo (destroy)
router.delete('/:id', async (req, res) => {
  try {
    const veiculo = await Veiculo.findByIdAndDelete(req.params.id);
    if (!veiculo) return res.status(404).json({ erro: 'Veículo não encontrado' });
    res.json({ mensagem: 'Veículo deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

module.exports = router;
