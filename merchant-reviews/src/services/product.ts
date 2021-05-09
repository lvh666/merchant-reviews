import request from '@/utils/request';
interface listParams {
  rowIndex: number;
  pageSize?: number;
  keyWords?: string;
}

interface DiscountParams {
  id?: number;
  name: string;
  price: number;
  files: any;
}

export function getAllProductById({ id }: { id: string}) {
  return request.get(`/getAllProductById?shopId=${id}`);
}

export function getProductById({ id }: { id: string}) {
  return request.get(`/getProductById?id=${id}`);
}
