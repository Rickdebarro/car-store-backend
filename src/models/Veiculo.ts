// src/models/Veiculo.ts
import { Schema, model, Document } from 'mongoose';


export interface IVeiculo extends Document {
  marca: string;
  modelo: string;
  ano: number;
  quilometragem: number;
  preco: number;
  descricao: string;
  imagens: string[]; // URLs das imagens
  status: 'disponivel' | 'vendido';
}

const VeiculoSchema = new Schema<IVeiculo>({
  marca: { type: String, required: true },
  modelo: { type: String, required: true },
  ano: { type: Number, required: true },
  quilometragem: { type: Number, default: 0 },
  preco: { type: Number, required: true },
  descricao: { type: String },
  imagens: [{ type: String }], // Array de strings (URLs)
  status: { type: String, enum: ['disponivel', 'vendido'], default: 'disponivel' }
}, {
  timestamps: true
});

export const VeiculoModel = model<IVeiculo>('Veiculo', VeiculoSchema);