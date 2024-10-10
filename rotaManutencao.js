const express = require('express');
const router = express.Router();
const Manutencao = require('../oficina/manutencao'); // Importa o modelo de Manutenção

// Registrar Manutenção (store)
router.post('/', async (req, res) => {
  try {
    const manutencao = new Manutencao(req.body);
    await manutencao.save();
    res.status(201).json(manutencao);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

// Listar todas as Manutenções (index)
router.get('/', async (req, res) => {
  try {
    const manutencoes = await Manutencao.find();
    res.json(manutencoes);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Listar Manutenção específica (show)
router.get('/:id', async (req, res) => {
  try {
    const manutencao = await Manutencao.findById(req.params.id).populate('veiculo').populate('oficina');
    if (!manutencao) return res.status(404).json({ erro: 'Manutenção não encontrada' });
    res.json(manutencao);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Atualizar Manutenção (update)
router.put('/:id', async (req, res) => {
  try {
    const manutencao = await Manutencao.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!manutencao) return res.status(404).json({ erro: 'Manutenção não encontrada' });
    res.json(manutencao);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

// Deletar Manutenção (destroy)
router.delete('/:id', async (req, res) => {
  try {
    const manutencao = await Manutencao.findByIdAndDelete(req.params.id);
    if (!manutencao) return res.status(404).json({ erro: 'Manutenção não encontrada' });
    res.json({ mensagem: 'Manutenção deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

module.exports = router;
