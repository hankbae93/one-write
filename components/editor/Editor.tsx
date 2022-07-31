import { useEffect, useState } from 'react';
import { v4 } from 'uuid';

import { BlockDataTypes } from '~/types/block';
import { EditorWrapper } from './Editor.style';
import dynamic from 'next/dynamic';
import usePrevious from 'hooks/usePrevious';
import { setCursorEnd } from '@utils/getSelection';

const DataBlock = dynamic(() => import('@components/block/DataBlock'), {
  ssr: false,
});

const Editor = () => {
  const [blocks, setBlocks] = useState<BlockDataTypes[]>([
    { id: v4(), text: '', role: 'TITLE' },
  ]);
  const prevBlock = usePrevious<BlockDataTypes[]>(blocks);
  const [currentBlock, setCurrentBlock] = useState<BlockDataTypes>(blocks[0]);

  useEffect(() => {
    if (prevBlock && prevBlock?.length + 1 === blocks.length) {
      const currentIndex = blocks.findIndex(
        (block) => block.id === currentBlock.id
      );
      const nextBlockId = blocks[currentIndex + 1].id;

      const nextBlockEl = document.querySelector(
        `[data-blockid="${nextBlockId}"]`
      ) as HTMLElement;

      nextBlockEl?.focus();
    }

    if (prevBlock && prevBlock?.length - 1 === blocks.length) {
      const currentIndex = prevBlock.findIndex(
        (block) => block.id === currentBlock.id
      );
      const prevId = prevBlock[currentIndex - 1].id;

      const prevBlockEl = document.querySelector(
        `[data-blockid="${prevId}"]`
      ) as HTMLElement;

      prevBlockEl?.focus();
      setCursorEnd(prevBlockEl);
    }
  }, [blocks, prevBlock]);

  return (
    <EditorWrapper>
      {blocks.map((block) => (
        <DataBlock
          key={block.id}
          block={block}
          setBlocks={setBlocks}
          setCurrentBlock={setCurrentBlock}
        />
      ))}
    </EditorWrapper>
  );
};

export default Editor;
