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

export const piCount = async ({
  kintoneApiToken,
  data: func,
}: {
  kintoneApiToken: string;
  data: () => Promise<Data>;
}) => {
  const data = await func();
  return axios.post(
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
};
