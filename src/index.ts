import axios from 'axios';

const KINTONE_URL = 'https://sonicgarden.cybozu.com/k/v1/record.json';
const KINTONE_APP_ID = 1514;

type Data = {
  kintoneApiToken: string;
  name: string;
  count: number;
  paymentSystemName?: string;
};

export const piCount = async (data: Data) => {
  const { kintoneApiToken, name, count, paymentSystemName } = data;
  return axios.post(
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
};
