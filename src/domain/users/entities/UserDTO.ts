export interface UserDTO {
  id?: string;
  name: string;
  avatar: string;
  sex: 'male' | 'female';
  phone: string;
  familyId?: string | null;
  downloads?: number;
}
