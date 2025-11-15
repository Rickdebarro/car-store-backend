// src/services/veiculo.service.ts
import { VeiculoModel, IVeiculo } from '../models/Veiculo.js';

export class VeiculoService {

  // CREATE
  async create(data: Partial<IVeiculo>): Promise<IVeiculo> {
    const veiculo = await VeiculoModel.create(data);
    return veiculo;
  }

  // READ (All com filtros)
  async findAll(filtros: any): Promise<IVeiculo[]> {

    const veiculos = await VeiculoModel.find(filtros);
    return veiculos;
  }

  // READ (One)
  async findById(id: string): Promise<IVeiculo | null> {
    const veiculo = await VeiculoModel.findById(id);
    return veiculo;
  }

  // UPDATE
  async update(id: string, data: Partial<IVeiculo>): Promise<IVeiculo | null> {
    const veiculo = await VeiculoModel.findByIdAndUpdate(id, data, { new: true });
    return veiculo;
  }

  // DELETE (ou Soft Delete)
  async delete(id: string): Promise<void> {

    await VeiculoModel.findByIdAndDelete(id);
  }

  // Lógica de Imagem
  async addImage(id: string, imageUrl: string): Promise<IVeiculo | null> {
    const veiculo = await VeiculoModel.findByIdAndUpdate(
      id,
      { $push: { imagens: imageUrl } },
      { new: true }
    );
    return veiculo;
  }
}