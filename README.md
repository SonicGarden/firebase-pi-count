# firebase-pi-count

Privacy Information for Firebase Cloud Functions

## Installation

firebase-admin@11.2.0より低いバージョンは2.0.0より低いバージョンを利用してください。

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
  region: 'asia-northeast1',
  schedule: '0 0 1 * *',
  timeZone: 'Asia/Tokyo',
  kintoneApiToken: token,
  data: async () => {
    const count = await fetch('.....');
    return {
      name: 'your project name',
      count,
      platform: 'firebase',
      isImportantPrivateInfo: true,
      paymentSystemName: 'stripe',
    }
  }
});

```

### Parameters

| parameter              | required | default value   | note                        |
| -----------------------| -------- | --------------- | --------------------------- |
| kintoneApiToken        | yes      |                 | kintone api access token    |
| data                   | yes      |                 | functions that return data  |
| region                 | optional | asia-northeast1 |                             |
| schedule               | optional | 0 0 1 * *       |                             |
| timeZone               | optional | Asia/Tokyo      |                             |

## npm publish

```sh
git tag -a v1.0.0 -m "My first version v1.0.0"
git push origin tags/v1.0.0
npm publish --access=public
```

### update

```sh
npm version patch # or minor or magor
git push origin tags/v1.0.1
npm publish --access=public
```
