export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  image: string;
  specs: ProductSpec[];
  features?: string[];
}

export interface ProductCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  products: Product[];
}

export interface CafeSystem {
  id: string;
  name: string;
  description: string;
  image: string;
  features: string[];
}

export interface Advantage {
  icon: string;
  title: string;
  description: string;
}

export interface NavLink {
  label: string;
  path: string;
}
