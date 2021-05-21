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

interface ShopParams {
  id?: number;
  username?: string;
  shop: string;
  category: string;
  address: string;
  region: string;
  price: number;
  files: any;
}

export function getShopList({ rowIndex, pageSize = 10 }: listParams) {
  return request.get(`/getAllShop?curPage=${rowIndex}&pageNum=${pageSize}`);
}

export function getShopListByUserId({ username }: { username: string}) {
  return request.post(`/shop/getShop`, { username });
}

export function searchShopList({ keyWords, rowIndex, pageSize = 10 }: listParams) {
  return request.get(`/searchShop?curPage=${rowIndex}&pageNum=${pageSize}&keyWords=${keyWords}`);
}

export function getShop({ id }: { id: number }) {
  return request.get(`/getShopById?id=${id}`);
}

export function addDiscountItem({ id, name, price, files }: DiscountParams) {
  return request.post(`/shop/addDiscount`, { id, name, price, files });
}

export function addShop( shop: ShopParams) {
  return request.post(`/shop/addShop`, shop);
}

export function addDiscountGoods({ id }: { id: string }) {
  return request.post(`/shop/goodsDiscount`, { id });
}

export function changeShopItem( shop: ShopParams) {
  return request.post(`/shop/changeShop`, shop);
}

export function delShopItem({ id }: { id: string }) {
  return request.post(`/shop/delShop`, { id });
}

export function getDiscountList({ id }: { id: string }) {
  return request.get(`/getAllDiscount?id=${id}`);
}
