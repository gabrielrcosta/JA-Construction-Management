// types/index.ts

// A material is a physical item stored on the construction site
// (e.g. cement bags, steel rods, paint cans)
export type Category = "Concreto" | "Metal" | "Madeira" | "Eletrica" | "Hidraulica" | "Seguranca";

export interface Material {
  id: string;
  name: string;
  category: Category;
  quantity: number;      // how many units are currently in stock
  unit: string;          // e.g. "bags", "rods", "rolls"
  minStock: number;      // alert threshold — below this = low stock
}

// A withdrawal request is when an employee asks to take materials
export type RequestStatus = "pendente" | "aprovado" | "rejeitado";

export interface WithdrawalRequest {
  id: string;
  materialId: string;
  materialName: string;
  requestedBy: string;   // user id
  quantity: number;
  status: RequestStatus;
  createdAt: string;     // ISO date string
  note?: string;         // optional reason
}