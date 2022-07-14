import * as functions from 'firebase-functions';
import axios from 'axios';

const KINTONE_URL = 'https://sonicgarden.cybozu.com/k/v1/record.json';
const KINTONE_APP_ID = 1514;

type Data = {
  name: string;
  type: 'standard' | 'light' | 'owned';
  platform?: 'aws' | 'heroku' | 'firebase';
  count: number;
  isImportantPrivateInfo?: boolean;
  paymentSystemName?: string;
};

export const piCount = ({
  region = 'asia-northeast1',
  schedule = '0 0 1 * *',
  timeZone = 'Asia/Tokyo',
  kintoneApiToken,
  data: func,
}: {
  region?: string;
  schedule?: string;
  timeZone?: string;
  kintoneApiToken: string;
  data: () => Promise<Data>;
}): functions.CloudFunction<unknown> => {
  return functions
    .region(region)
    .pubsub.schedule(schedule)
    .timeZone(timeZone)
    .onRun(async () => {
      try {
        const data = await func();
        await axios.post(
          KINTONE_URL,
          {
            app: KINTONE_APP_ID,
            record: {
              type: { value: data.type },
              platform: { value: data.platform },
              name: { value: data.name },
              count: { value: data.count },
              is_important_private_info: { value: data.isImportantPrivateInfo ? 'true' : 'false' },
              payment_system_name: { value: data.paymentSystemName },
            },
          },
          {
            headers: {
              'X-Cybozu-API-Token': kintoneApiToken,
              'Content-Type': 'application/json',
            },
          }
        );
        console.info('send pi count, success');
      } catch (err) {
        console.error(err);
      }
    });
};
