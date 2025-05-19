// app/ReduxProvider.jsx
'use client';

import { Provider } from 'react-redux';
import store from '../store/reducers/store'; // adapte le chemin si besoin

export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
