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

const token = // トークンは別途確認

export piCount = firebasePiCount.piCount({
  data: {
    kintoneApiToken: token,
    name: 'your project name',
    count: 999,
    platform: 'firebase',
    isImportantPrivateInfo: true,
    paymentSystemName: 'stripe',
  },
  params: {
    region: 'asia-northeast1',
    schedule: '0 0 * * *',
    timeZone: 'Asia/Tokyo',
  }
});

```

### Parameters

| parameter              | required | default value   | note                        |
| -----------------------| -------- | --------------- | --------------------------- |
| kintoneApiToken        | yes      |                 | kintone api access token    |
| name                   | yes      |                 | project name                |
| type                   | yes      |                 | standard | light | owned    |
| count                  | yes      |                 | privacy resource count      |
| platform               | no       | firebase        | aws | heroku | firebase     |
| isImportantPrivateInfo | no       | false           | true | false                |
| paymentSystemName      | optional |                 | stripe, GMO payment, etc... |
| region                 | optional | asia-northeast1 |                             |
| schedule               | optional | 0 0 * * *       |                             |
| timeZone               | optional | Asia/Tokyo      |                             |
