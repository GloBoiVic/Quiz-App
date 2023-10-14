import React from 'react';
import ReactDOM from 'react-dom/client';
import { NextUIProvider } from '@nextui-org/react';
import App from './App.tsx';
import './index.css';
import { QuizProvider } from './context/QuizContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <QuizProvider>
        <App />
      </QuizProvider>
    </NextUIProvider>
  </React.StrictMode>,
);
