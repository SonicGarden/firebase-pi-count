import * as functions from 'firebase-functions';
import axios from 'axios';

const KINTONE_URL = 'https://sonicgarden.cybozu.com/k/v1/record.json';
const KINTONE_APP_ID = 1514;

type Data = {
  kintoneApiToken: string;
  name: string;
  type: 'standard' | 'light' | 'owned';
  platform?: 'aws' | 'heroku' | 'firebase';
  count: number;
  isImportantPrivateInfo?: boolean;
  paymentSystemName?: string;
};

type Params = {
  region?: string;
  schedule?: string;
  timeZone?: string;
};

export const piCount = ({ data, params }: { data: Data; params: Params }): functions.CloudFunction<unknown> => {
  const { kintoneApiToken, name, type, platform = 'firebase', count, isImportantPrivateInfo = false, paymentSystemName = '' } = data;
  const { region = 'asia-northeast1', schedule = '0 0 * * *', timeZone = 'Asia/Tokyo' } = params;
  return functions
    .region(region)
    .pubsub.schedule(schedule)
    .timeZone(timeZone)
    .onRun(async () => {
      try {
        await axios.post(
          KINTONE_URL,
          {
            app: KINTONE_APP_ID,
            record: {
              type: { value: type },
              platform: { value: platform },
              name: { value: name },
              count: { value: count },
              is_important_private_info: { value: isImportantPrivateInfo ? 'true' : 'false' },
              payment_system_name: { value: paymentSystemName },
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
