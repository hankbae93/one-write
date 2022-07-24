import styled, { css } from 'styled-components';
import { BlockDataRole } from '~/types/block';

export const BlockWrapper = styled.div<{
  role?: BlockDataRole;
  placeholder?: string;
}>`
  position: relative;
  padding: 8px 0;
  border: 1px solid #ccc;
  border-radius: 10px;
  max-width: 100%;
  width: 100%;
  line-height: 1.2em;
  white-space: pre-wrap;
  word-break: break-word;

  &.active {
    min-height: 1em;
    color: rgb(55, 53, 47);
    -webkit-text-fill-color: rgba(55, 53, 47, 0.5);

    ::before {
      content: '${({ placeholder }) => placeholder ?? ''}';
    }
  }

  ${({ role }) =>
    role === 'TITLE' &&
    css`
      font-size: 20px;
      line-height: 24px;
    `}
`;
