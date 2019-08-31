import moment from 'moment';
import 'colors';

const { env } = process;
const environment = `node.client.api.ts is running in ${env.NODE_ENV}`.cyan;

const message = `
${moment().format('LLL').green}\n
==============================================================\n
${environment} \n
${env.REACT_APP_BACKEND} (ready for clients)\n
==============================================================\n`;

export const logStartUp = () => console.log(message);
