export interface User {
  id?: string;
  name: string;
  email: string;
  password?: string;     // opcional o requerido, según tu caso
  role: 'admin' | 'user';
}
