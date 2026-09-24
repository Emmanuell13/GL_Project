import React from 'react';
import { createRoot } from 'react-dom/client';
import { setupIonicReact } from '@ionic/react';
import '@ionic/react/css/core.css';
import './styles.css';
import App from './App';

setupIonicReact();
createRoot(document.getElementById('root')!).render(<App />);
