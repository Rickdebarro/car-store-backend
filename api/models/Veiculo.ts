// src/models/Veiculo.ts
import { Schema, model, Document, Types } from 'mongoose';
import { VeiculoType, VEICULOTYPE } from '../types/veiculo.type.js';


export interface IVeiculo extends Document {

  "brand": string;
  "modelName": string;
  "type": VeiculoType;
  "value": number;
  "status": 'disponivel' | 'vendido';
  "year": number;
  "description"?: string;

}

const VeiculoSchema = new Schema<IVeiculo>({

  brand: { type: String, required: true },

  modelName: { type: String, required: true },

  year: { type: Number, required: true },

  type: { type: String, enum: VEICULOTYPE, required: true },

  value: { type: Number, required: true },

  description: { type: String },

  status: { type: String, enum: ['disponivel', 'vendido'], default: 'disponivel' }

}, {

  timestamps: true

});

export const VeiculoModel = model<IVeiculo>('Veiculo', VeiculoSchema);
export type { VeiculoType };