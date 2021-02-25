import { firebaseConfig } from './firebase.environment';

export const environment = {
  production: true,
  apiUrl: 'https://trivias-backend.herokuapp.com',
  ...firebaseConfig,
};
