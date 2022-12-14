import { getFirestore } from '@firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: `${process.env.API_KEY}`,
  authDomain: 'note-editor-74fe5.firebaseapp.com',
  projectId: 'note-editor-74fe5',
  storageBucket: 'note-editor-74fe5.appspot.com',
  messagingSenderId: '978284306217',
  appId: '1:978284306217:web:a1bb47643b450fb9bda138',
};

const app = initializeApp(firebaseConfig);
const dataBase = getFirestore(app);

export default dataBase;
