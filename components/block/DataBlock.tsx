import { BLOCK_PLACEHOLDER } from '@constants/message';
import {
  Dispatch,
  FC,
  FormEvent,
  KeyboardEvent,
  SetStateAction,
  useRef,
} from 'react';
import { BlockDataRole, BlockDataTypes } from '~/types/block';
import { BlockWrapper } from './DataBlock.style';

interface Props {
  id: number;
  text: string;
  role?: BlockDataRole;
  setBlocks: Dispatch<SetStateAction<BlockDataTypes[]>>;
}

const DataBlock: FC<Props> = ({ id = 1, text, role = 'TEXT', setBlocks }) => {
  const blockRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    blockRef.current.classList.remove('active');
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        setBlocks((prev) => {
          const newBlocksArray = [...prev];
          const newBlocks: BlockDataTypes = {
            id: Math.random(),
            text: '',
            role: 'TEXT',
          };

          const index = prev.findIndex((block) => block.id === id);
          newBlocksArray.splice(index + 1, 0, newBlocks);

          return newBlocksArray;
        });
        break;
      default:
        return;
    }
  };

  const onInput = (e: FormEvent<HTMLDivElement>) => {
    const { textContent } = e.currentTarget;
    // setBlocks((prev) => {
    //   return prev.map((block) =>
    //     block.id === id
    //       ? {
    //           ...block,
    //           text: textContent as string,
    //         }
    //       : block
    //   );
    // });
  };

  return (
    <BlockWrapper
      tabIndex={0}
      data-block-id={id}
      className={text ? '' : 'active'}
      contentEditable
      spellCheck
      role={role}
      ref={blockRef}
      placeholder={
        role === 'TEXT' ? BLOCK_PLACEHOLDER.TEXT : BLOCK_PLACEHOLDER.TITLE
      }
      onKeyDown={handleKeyDown}
      onInput={onInput}
    >
      {text}
    </BlockWrapper>
  );
};

export default DataBlock;
