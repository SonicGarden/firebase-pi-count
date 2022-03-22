# firebase-pi-count

Privacy Information for Firebase Cloud Functions

## Installation

```sh
npm install --save @sonicgarden/firebase-pi-count
// or
yarn add @sonicgarden/firebase-pi-count
```

## Usage

```js
import * as firebasePiCount from '@sonicgarden/firebase-pi-count';
export piCount = firebasePiCount.piCount({
  kintoneApiToken: token;
  name: 'your project name';
  count: 999;
  paymentSystemName: 'stripe',
  region: 'asia-northeast1',
  schedule: '0 0 * * *',
  timeZone: 'Asia/Tokyo',
});

```

### Parameters

| parameter         | required | default value   | note                        |
| ----------------- | -------- | --------------- | --------------------------- |
| kintoneApiToken   | yes      |                 | kintone api access token    |
| name              | yes      |                 | project name                |
| count             | yes      |                 | privacy resource count      |
| paymentSystemName | optional |                 | stripe, GMO payment, etc... |
| region            | optional | asia-northeast1 |                             |
| schedule          | optional | 0 0 * * *       |                             |
| timeZone          | optional | Asia/Tokyo      |                             |
