import request from '@/utils/request';
interface CommentParams {
  id?: number;
  username?: string;
  shopId?: number;
  start: number;
  content: string;
  files: any;
}

interface listParams {
  shopId?: number;
  rowIndex: number;
  pageSize?: number;
}

export function uploadPicItem({ file }: { file: any }) {
  const formData = new FormData();
  formData.append('file', file.file);
  return request.post(`/uploadPic`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

export function getComments({ shopId }: listParams) {
  return request.get(`/getAllCommentByShopId?shopId=${shopId}`);
}

export function getComment({ id }: { id: number }) {
  return request.get(`/getComment?id=${id}`);
}

export function getUserComment({ username }: { username: string }) {
  return request.post(`/comment/getItem`, { username });
}

export function changeComment({ id, start, content, files }: CommentParams) {
  return request.put(`/comment/Item`, {
    id,
    start,
    content,
    files,
  });
}

export function delComment({ id }: CommentParams) {
  return request.delete(`/comment/Item?id=${id}`);
}

export function addComment({
  username,
  shopId,
  start,
  content,
  files,
}: CommentParams) {
  return request.post(`/comment/Item`, {
    username,
    shopId,
    start,
    content,
    files,
  });
}

export function countCommentGoods({ id }: { id: string }) {
  return request.post(`/comment/addGoods`, {
    id,
  });
}

export function checkComment({
  username,
  id,
}: {
  username: string;
  id: number;
}) {
  return request.post(`/comment/checkComment`, {
    username,
    id,
  });
}
