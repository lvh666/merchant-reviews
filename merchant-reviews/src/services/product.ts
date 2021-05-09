import request from '@/utils/request';

export function getAllProductById({ id }: { id: string}) {
  return request.get(`/getAllProductById?shopId=${id}`);
}

export function getProductById({ id }: { id: string}) {
  return request.get(`/getProductById?id=${id}`);
}
