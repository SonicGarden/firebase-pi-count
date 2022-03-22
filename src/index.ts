import * as functions from 'firebase-functions';
import axios from 'axios';

const KINTONE_URL = 'https://sonicgarden.cybozu.com/k/v1/record.json';
const KINTONE_APP_ID = 1514;

type Data = {
  kintoneApiToken: string;
  name: string;
  count: number;
  paymentSystemName?: string;
  region?: string;
  schedule?: string;
  timeZone?: string;
  projectId?: string;
};

export const piCount = (data: Data): functions.CloudFunction<unknown> => {
  const {
    kintoneApiToken,
    name,
    count,
    paymentSystemName,
    region = 'asia-northeast1',
    schedule = '0 0 * * *',
    timeZone = 'Asia/Tokyo',
  } = data;
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
              type: { value: 'standard' },
              platform: { value: 'firebase' },
              name: { value: name },
              count: { value: count },
              is_important_private_info: { value: 'true' },
              payment_system_name: { value: paymentSystemName || '' },
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
