export interface AuthTokenPayload {
  id: number;
  email: string;
  role: 'admin' | 'user';
}
