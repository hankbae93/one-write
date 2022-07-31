import { atom } from 'recoil';

export const templateState = atom<string[]>({
  key: 'template',
  default: [
    '',
    `=====
생명력: 0/0 0.00/분
스테미나: 0/0 0.00분
마나: 0/0 0.00/분
일반 저항 - [%](내구 보너스)*(1.00)

-----
레벨 업!!
능력치 포인트 (1)
특성 포인트 (1)
트리 포인트 (1)
=====`,
  ],
});
