import axios, { AxiosError } from 'axios';
import { HttpClient } from '.';

export interface Product {
  id: string;
  description: string;
  model: string;
  brand: string;
}

export const getProducts = async () => {
  try {
    const response = await HttpClient.get('/products');
    return response.data;
  } catch (error: any) {
    throw new Error(error as string);
  }
};

export const getProductById = async (productId: string) => {
  try {
    const response = await HttpClient.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const deleteProductById = async (productId: string) => {
  try {
    const response = await HttpClient.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const updateProductById = async ({
  productId,
  args,
}: {
  productId: string;
  args: Product;
}) => {
  try {
    const response = await HttpClient.put(`/products/${productId}`, args);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const addNewProduct = async (args: Product): Promise<Product> => {
  try {
    const response = await HttpClient.post('/products', args);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};
