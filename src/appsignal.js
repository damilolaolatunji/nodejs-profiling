import { Appsignal } from '@appsignal/nodejs';

new Appsignal({
  active: true,
  name: 'Node.js App',
  pushApiKey: process.env.APPSIGNAL_PUSH_API_KEY,
});
