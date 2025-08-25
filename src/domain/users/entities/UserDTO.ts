export interface UserDTO {
  id?: string;
  name: string;
  avatar: string;
  sex: 'male' | 'female';
  phone: string;
  downloads?: number;
}
