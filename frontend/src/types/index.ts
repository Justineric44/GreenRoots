export interface ProjectSummary {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  localisation: string;
  picture: string;
  progress: number;
}

export interface Project extends ProjectSummary {
  longDescription: string;
  description: string;
  createdAt: string;
  trees?: []; // TODO: Ajouter le type arbre (voir Justine)
}

export interface Tree {
  id: number;
  commonName: string;
  scientificName?: string;
  family: string;
  origin: string;
  slug: string;
  picture: string;
  price: number;
  shortDescription?: string;
  longDescription?: string;
}

// ============================================================
// USER
// ============================================================

export type UserType = 'particulier' | 'entreprise' | 'association';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  type: UserType;
  address: string;
  postalCode: string;
  city: string;
  phone: string | null;
  companyName: string | null;
  siret: string | null;
  createdAt?: string;
  updatedAt?: string;
}

// ============================================================
// ORDER
// ============================================================

export type OrderStatus = 'validated' | 'canceled';

export interface OrderItem {
  id: number;
  treeCommonName: string;
  quantity: number;
  unitPrice: string | number;
  treeId: number;
  projectId: number;
  orderId: number;
}

export interface Order {
  id: number;
  status: OrderStatus;
  amount: string | number; // Prisma Decimal arrive sérialisé en string en JSON
  userId: number | null;
  cartId: number | null;
  createdAt: string;
  updatedAt?: string;
  items: OrderItem[];
}
