export interface UserDTO {
  id?: string;
  name: string;
  avatar: string;
  email: string;
  sex: 'male' | 'female';
  phone: string;
  downloads?: number;
}
