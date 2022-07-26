import { BLOCK_PLACEHOLDER } from '@constants/message';
import { setEndOfContenteditable } from '@utils/getSelection';
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
  const [textState, setTextState] = useState(text);
  const commandsRef = useRef<string | null>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const { textContent } = e.currentTarget;
    if (isComposing) return;

    console.log(e.key);

    switch (e.key) {
      case 'Control':
        commandsRef.current = 'Control';
        break;

      case '1':
        if (commandsRef.current === 'Control') {
          e.preventDefault();
          blockRef.current?.classList.remove('active');
          setTextState(`"${textContent}"`);
          commandsRef.current = null;
          setEndOfContenteditable(blockRef.current);
        }
        break;

      case '2':
        if (commandsRef.current === 'Control') {
          e.preventDefault();
          blockRef.current?.classList.remove('active');
          setTextState(`=====
생명력: 0/0 0.00/분
스테미나: 0/0 0.00분
마나: 0/0 0.00/분
일반 저항 - [%](내구 보너스)*(1.00)

-----
레벨 업!!
능력치 포인트 (1)
특성 포인트 (1)
트리 포인트 (1)
=====
          `);
          commandsRef.current = null;
        }
        break;
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
          if (!e.currentTarget.previousElementSibling) return;
          e.preventDefault();

          setEndOfContenteditable(
            e.currentTarget.previousElementSibling as Element
          );

          setBlocks((prev) => {
            if (prev.length === 1) {
              return prev;
            }
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
      {textState}
    </BlockWrapper>
  );
};

export default DataBlock;
