import * as admin from 'firebase-admin';
import firebaseAccountsJson from './firebase-accounts.json';

export default admin.initializeApp({
  databaseURL: 'https://devpie-7dd4b.firebaseio.com',
  credential: admin.credential.cert(firebaseAccountsJson as any)
});
