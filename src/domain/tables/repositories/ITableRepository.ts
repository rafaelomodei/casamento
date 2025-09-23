import { TableDTO } from '../entities/TableDTO';

export interface ITableRepository {
  create(table: TableDTO): Promise<string>;
  addMember(tableId: string, userId: string): Promise<void>;
  findById(id: string): Promise<TableDTO | null>;
  list(): Promise<TableDTO[]>;
  update(id: string, data: Partial<TableDTO>): Promise<void>;
  delete(id: string): Promise<void>;
}
