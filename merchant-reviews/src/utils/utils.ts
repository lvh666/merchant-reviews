/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

const isUrl = (path: string): boolean => reg.test(path);

export function setAuthority(authority: string | string[]) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem(
    'antd-pro-authority',
    JSON.stringify(proAuthority),
  );
}

interface userinfoParams {
  answer: string;
  createTime: number;
  email: string;
  id: number;
  password: string;
  phone: string;
  question: string;
  role: number;
  updateTime: number;
  username: string;
  isAdmin?: boolean;
}

export function changeUserinfo(userinfo: userinfoParams) {
  localStorage.setItem('userinfo', JSON.stringify(userinfo));
  const authority = userinfo.isAdmin ? 'admin' : 'user';
  setAuthority(authority);
}

export { isUrl };
