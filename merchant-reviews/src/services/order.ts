import request from '@/utils/request';

interface OrderParams {
  username: string;
  shopId: number;
  productId: number;
  price: number;
  num: number;
  createTime: number;
  pic: string;
}

export function getAllOrderByUserId({ username }: { username: string }) {
  return request.post(`/order/getAllOrder`, { username });
}

export function addOrder(data: OrderParams) {
  return request.post(`/order/Item`, data);
}

export function cancelOrder({ id, status }: { id: number, status: number }) {
  return request.put(`/order/Item`, { id, status });
}
