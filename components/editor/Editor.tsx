import { useEffect, useState } from 'react';
import DataBlock from '@components/block/DataBlock';
import { BlockDataTypes } from '~/types/block';
import { EditorWrapper } from './Editor.style';

const initialState: BlockDataTypes[] = [
  { id: 11111111, text: '', role: 'TITLE' },
];

const Editor = () => {
  const [blocks, setBlocks] = useState<BlockDataTypes[]>(initialState);

  useEffect(() => {
    if (document.activeElement) {
      const newBlockElement = document.activeElement
        .nextElementSibling as HTMLElement;
      newBlockElement?.focus();
    }
  }, [blocks]);

  return (
    <EditorWrapper>
      {blocks.map((block) => {
        return <DataBlock key={block.id} {...block} setBlocks={setBlocks} />;
      })}
    </EditorWrapper>
  );
};

export default Editor;
