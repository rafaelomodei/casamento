export interface UserDTO {
  id?: string;
  name: string;
  avatar: string;
  sex: 'male' | 'female';
  phone: string;
  familyId?: string | null;
  tableId?: string | null;
  downloads?: number;
  age?: number;
  attending?: boolean;
  responded?: boolean;
  respondedAt?: string;
  status?: number;
}
