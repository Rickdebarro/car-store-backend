// src/controllers/veiculo.controller.ts
import { Request, Response } from 'express';
import { VeiculoService } from '../services/veiculo.service.js';

const veiculoService = new VeiculoService();

export class VeiculoController {

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const veiculo = await veiculoService.create(req.body);
      return res.status(201).json(veiculo);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {

      const veiculos = await veiculoService.findAll(req.query);
      return res.status(200).json(veiculos);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const veiculo = await veiculoService.findById(req.params.id);
      if (!veiculo) {
        return res.status(404).json({ message: 'Veículo não encontrado' });
      }
      return res.status(200).json(veiculo);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }
  

  async addImage(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (!req.file) {
        return res.status(400).json({ message: 'Nenhum arquivo enviado' });
      }

      const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

      const veiculo = await veiculoService.addImage(id, imageUrl);
      return res.status(200).json(veiculo);

    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }
}