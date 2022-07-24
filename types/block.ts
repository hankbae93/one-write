export type BlockDataRole = 'TITLE' | 'TEXT';

export interface BlockDataTypes {
  id: number;
  text: string;
  role: BlockDataRole;
}
