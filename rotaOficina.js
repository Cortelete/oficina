const express = require('express');
const router = express.Router();
const Oficina = require('../oficina/oficina'); // Importa o modelo de Oficina

// Criar Oficina
router.post('/', async (req, res) => {
  try {
    const oficina = new Oficina(req.body);
    await oficina.save();
    res.status(201).json(oficina);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

// Listar todas as Oficinas
router.get('/', async (req, res) => {
  try {
    const oficinas = await Oficina.find();
    res.json(oficinas);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Listar Oficina específica
router.get('/:id', async (req, res) => {
  try {
    const oficina = await Oficina.findById(req.params.id).populate('manutencoes');
    if (!oficina) return res.status(404).json({ erro: 'Oficina não encontrada' });
    res.json(oficina);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Atualizar Oficina
router.put('/:id', async (req, res) => {
  try {
    const oficina = await Oficina.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!oficina) return res.status(404).json({ erro: 'Oficina não encontrada' });
    res.json(oficina);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

// Deletar Oficina
router.delete('/:id', async (req, res) => {
  try {
    const oficina = await Oficina.findByIdAndDelete(req.params.id);
    if (!oficina) return res.status(404).json({ erro: 'Oficina não encontrada' });
    res.json({ mensagem: 'Oficina deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

module.exports = router;
