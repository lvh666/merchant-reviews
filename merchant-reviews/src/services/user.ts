import request from '@/utils/request';

interface UserParams {
  id?: number;
  username: string;
  password?: string;
  name?: string;
}

export function login({ username, password }: UserParams) {
  const data = { username: username, password: password };
  return request.post('/login', data);
}

export function registered({ username, password, name }: UserParams) {
  const data = { username, password, name };
  return request.post('/registered', data);
}

export function checkPhone({ username }: UserParams) {
  const data = { username: username };
  return request.post('/checkPhone', data);
}

export function changePassword({ password, username }: UserParams) {
  return request.post('/user/changePassword', { password, username });
}

export function getUser({ username }: { username: string }) {
  return request.post('/user/getItem', { username });
}

export function changeUser({ id, username, name }: UserParams) {
  return request.post('/user/changeItem', { id, username, name });
}
