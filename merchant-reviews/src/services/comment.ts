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

export function getComment({ shopId, rowIndex, pageSize = 10 }: listParams) {
  return request.get(
    `/getAllCommentByShopId?shopId=${shopId}&curPage=${rowIndex}&pageNum=${pageSize}`,
  );
}

export function changeComment({ id, start, content, files }: CommentParams) {
  return request.put(`/comment/Item`, {
    id,
    start,
    content,
    files,
  });
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

export function countCommentGoods({
  id
}: { id:string }) {
  return request.post(`/comment/addGoods`, {
    id
  });
}

export function checkComment({ username, id }: { username: string, id: number }) {
  return request.post(`/comment/checkComment`, {
    username,
    id
  });
}
