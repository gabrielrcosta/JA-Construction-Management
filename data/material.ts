// data/materials.ts
// This is mock data — later you'll replace this with a real API/database call

import { Material } from "../types";

export const MOCK_MATERIALS: Material[] = [
  {
    id: "mat-001",
    name: "Cimento",
    category: "Concreto",
    quantity: 120,
    unit: "Saco",
    minStock: 30,
  },
  {
    id: "mat-002",
    name: "PVC Conduite 20mm",
    category: "Eletrica",
    quantity: 60,
    unit: "Rolo",
    minStock: 10,
  },
  {
    id: "mat-003",
    name: "Capacete",
    category: "Seguranca",
    quantity: 25,
    unit: "Unidade",
    minStock: 10,
  },
];