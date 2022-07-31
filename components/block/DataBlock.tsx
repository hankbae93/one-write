import {
  Dispatch,
  FC,
  KeyboardEvent,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import { v4 } from 'uuid';
import { BLOCK_PLACEHOLDER } from '@constants/message';
import { setCursorEnd } from '@utils/getSelection';

import { BlockDataTypes } from '~/types/block';
import { BlockWrapper } from './DataBlock.style';
import { useRecoilValue } from 'recoil';
import { templateState } from '@states/templates';

interface Props {
  block: BlockDataTypes;
  setBlocks: Dispatch<SetStateAction<BlockDataTypes[]>>;
  setCurrentBlock: Dispatch<SetStateAction<BlockDataTypes>>;
}

type MainKeyCode = 'Control' | 'Enter' | 'Backspace' | 'TemplateKey';
const mainKeyCodeArray = ['Control', 'Enter', 'Backspace'];
const TemplateKeyCodeArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

const DataBlock: FC<Props> = ({ block, setBlocks, setCurrentBlock }) => {
  const { text, id, role } = block;
  const templateValue = useRecoilValue(templateState);
  const [textState, setTextState] = useState(text);
  const [isComposing, setIsComposing] = useState(false);
  const blockRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const commandsRef = useRef<string | null>(null);

  const createBlock = (): BlockDataTypes => ({
    id: v4(),
    text: '',
    role: 'TEXT',
  });

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const { textContent } = e.currentTarget;
    if (isComposing) return;

    const keyboardEventMap: Record<MainKeyCode, (data: any) => void> = {
      Control: () => {
        commandsRef.current = 'Control';
      },

      Enter: () => {
        e.preventDefault();

        setBlocks((prev) => {
          const newBlocksArray = [...prev];
          const index = prev.findIndex((block) => block.id === id);

          newBlocksArray[index] = {
            ...newBlocksArray[index],
            text: textContent as string,
          };

          newBlocksArray.splice(index + 1, 0, createBlock());

          return newBlocksArray;
        });
      },

      Backspace: () => {
        if (textContent?.length === 0) {
          e.preventDefault();
          setBlocks((prev) => {
            if (prev.length === 1) {
              return prev;
            }
            return prev.filter((block) => block.id !== id);
          });
        }

        if (textContent?.length === 1) {
          blockRef.current?.classList.add('active');
        }
      },

      TemplateKey: (templateNum: number) => {
        if (templateNum === 0) return;
        if (commandsRef.current === 'Control') {
          e.preventDefault();
          blockRef.current?.classList.remove('active');
          setTextState(templateValue[templateNum - 1]);
          commandsRef.current = null;
        }
      },
    };

    setCurrentBlock(block);

    if (mainKeyCodeArray.some((key) => key === e.key)) {
      keyboardEventMap[e.key]();
    } else if (TemplateKeyCodeArray.some((key) => key === e.key)) {
      keyboardEventMap['TemplateKey'](+e.key);
    } else {
      blockRef.current?.classList.remove('active');
    }
  };

  return (
    <BlockWrapper
      tabIndex={0}
      data-blockid={id}
      className={text ? '' : 'active'}
      contentEditable
      spellCheck
      suppressContentEditableWarning
      role={role}
      ref={blockRef}
      placeholder={
        role === 'TEXT' ? BLOCK_PLACEHOLDER.TEXT : BLOCK_PLACEHOLDER.TITLE
      }
      onKeyDown={handleKeyDown}
      onCompositionStart={() => setIsComposing(true)}
      onCompositionEnd={() => setIsComposing(false)}
    >
      {textState}
    </BlockWrapper>
  );
};

export default DataBlock;
