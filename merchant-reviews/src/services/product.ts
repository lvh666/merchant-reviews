import request from '@/utils/request';

interface ProductParams {
  id?: number;
  shopId?: number;
  product: string;
  saleDesc: string;
  tag: string;
  startTime: number;
  endTime: number;
  currentPrice: number;
  oldPrice: number;
  files: any;
}

export function getAllProductById({ id }: { id: string}) {
  return request.get(`/getAllProductById?shopId=${id}`);
}

export function getProductById({ id }: { id: string}) {
  return request.get(`/getProductById?id=${id}`);
}

export function getProduct({ username }: { username: string}) {
  return request.post(`/product/getItem`, { username });
}

export function changeProductItem( product: ProductParams) {
  return request.post(`/product/changeProduct`, product);
}

export function delProductItem({ id }: { id: string }) {
  return request.post(`/product/delProduct`, { id });
}

export function addProduct( product: ProductParams) {
  return request.post(`/product/addProduct`, product);
}