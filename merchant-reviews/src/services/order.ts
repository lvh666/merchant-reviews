import request from '@/utils/request';
interface listParams {
  rowIndex: number;
  pageSize?: number;
  keyWords?: string;
}

interface OrderParams {
  username: number;
  shopId: number;
  productId: number;
  price: number;
  num: number;
  createTime: number;
}

export function getAllProductById({ id }: { id: string }) {
  return request.get(`/getAllProductById?shopId=${id}`);
}

export function addOrder(data: OrderParams) {
  return request.post(`/order/Item`, data);
}
