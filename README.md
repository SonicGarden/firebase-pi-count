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
import { defineSecret } from 'firebase-functions/params';
import { piCount } from '@sonicgarden/firebase-pi-count';

export piCount = functions
  .runWith({ secrets: ['KINTONE_API_TOKEN'] })
  .region('asia-northeast1')
  .pubsub.schedule('0 0 1 * *')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    const count = await fetch('.....');
    // トークンはシークレットマネージャーで管理
    const token = defineSecret('KINTONE_API_TOKEN').value();
    await piCount({
      kintoneApiToken: token,
      data: {
        name: 'your project name',
        count,
        platform: 'firebase',
        isImportantPrivateInfo: true,
        paymentSystemName: 'stripe',
      }
    })
  });
```

### Parameters

| parameter       | required | default value | note                       |
| --------------- | -------- | ------------- | -------------------------- |
| kintoneApiToken | yes      |               | kintone api access token   |
| data            | yes      |               | functions that return data |

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
