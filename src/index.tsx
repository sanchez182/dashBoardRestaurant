import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ReactPWAInstallProvider from "react-pwa-install";

ReactDOM.render(
  <ReactPWAInstallProvider enableLogging>< App />
    </ReactPWAInstallProvider>,
  document.getElementById('root')
);
