import { HttpClient } from '.';

export interface Product {
  id: string;
  description: string;
  model: string;
  brand: string;
}

interface FilterArgsTypes {
  type?: string;
  value?: string;
}

export const getProducts = async (filterArgs: FilterArgsTypes = {}) => {
  const { type, value } = filterArgs;
  const params = new URLSearchParams();
  if (type) {
    params.append('type', type);
  }
  if (value) {
    params.append('value', value);
  }

  const response = await HttpClient.get(`/products`, { params });
  return response.data;
};

export const getProductById = async (productId: string) => {
  const response = await HttpClient.get(`/products/${productId}`);
  return response.data;
};

export const deleteProductById = async (productId: string) => {
  const response = await HttpClient.delete(`/products/${productId}`);
  return response.data;
};

export const updateProductById = async ({
  productId,
  args,
}: {
  productId: string;
  args: Product;
}) => {
  const response = await HttpClient.put(`/products/${productId}`, args);
  return response.data;
};

export const addNewProduct = async (args: Product) => {
  const response = await HttpClient.post('/products', args);
  return response.data;
};
