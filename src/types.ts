export interface ProductProps {
  id: number;
  category?: string;
  description: string;
  image: string;
  title: string;
  price: number;
  rating?: {
    rate: number;
    count: number;
  };
}

export interface editedProductProps {
  id: number;
  image: string;
  title: string;
  price: number;
  description: string;
}

export interface addedProductProps {
  image: string;
  title: string;
  price: number;
  description: string;
  category: string;
}
