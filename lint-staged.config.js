module.exports = {
  // Type check -> TypeScript 파일
  '**/*.(ts|tsx)': () => 'yarn tsc --noEmit',
  // TypeScript 및 JavaScript 파일을 린트한 다음 포맷합니다.
  '**/*.(ts|tsx|js)': (filenames) => [
    `yarn eslint --fix ${filenames.join(' ')}`,
    `yarn prettier --write ${filenames.join(' ')}`,
  ],
  // 형식 마크다운 및 JSON
  '**/*.(md|json)': (filenames) =>
    `yarn prettier --write ${filenames.join(' ')}`,
};
