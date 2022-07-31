export type BlockDataRole = 'TITLE' | 'TEXT';

export interface BlockDataTypes {
  id: string;
  text: string;
  role: BlockDataRole;
}
