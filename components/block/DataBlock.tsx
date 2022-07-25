import { BLOCK_PLACEHOLDER } from '@constants/message';
import {
  Dispatch,
  FC,
  KeyboardEvent,
  SetStateAction,
  useRef,
  useState,
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
  const [isComposing, setIsComposing] = useState(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const { textContent } = e.currentTarget;
    if (isComposing) return;

    switch (e.key) {
      case 'Enter':
        e.preventDefault();

        setBlocks((prev) => {
          const newBlocksArray = prev.map((block) =>
            block.id === id
              ? {
                  ...block,
                  text: textContent as string,
                }
              : block
          );
          const newBlocks: BlockDataTypes = {
            id: new Date().getTime(),
            text: '',
            role: 'TEXT',
          };

          const index = prev.findIndex((block) => block.id === id);
          newBlocksArray.splice(index + 1, 0, newBlocks);

          return newBlocksArray;
        });

        break;
      case 'Backspace':
        if (textContent?.length === 1) {
          blockRef.current?.classList.add('active');
        }
        if (textContent?.length === 0) {
          setBlocks((prev) => {
            return prev.filter((block) => block.id !== id);
          });
        }
        break;
      default:
        blockRef.current?.classList.remove('active');
        break;
    }
  };

  return (
    <BlockWrapper
      tabIndex={0}
      data-block-id={id}
      className={text ? '' : 'active'}
      contentEditable
      spellCheck
      suppressContentEditableWarning
      role={role}
      ref={blockRef}
      placeholder={
        role === 'TEXT' ? BLOCK_PLACEHOLDER.TEXT : BLOCK_PLACEHOLDER.TITLE
      }
      onKeyDownCapture={handleKeyDown}
      onCompositionStart={() => setIsComposing(true)}
      onCompositionEnd={() => setIsComposing(false)}
    >
      {text}
    </BlockWrapper>
  );
};

export default DataBlock;
