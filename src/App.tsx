import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './config/i18n';
import AppRouter from './router/AppRouter';
import store from './store';
import './assets/scss/App.scss'; 
import { useReactPWAInstall } from "react-pwa-install";


const App = () => { 
   const { pwaInstall, supported, isInstalled } = useReactPWAInstall();
   debugger
   const handleClick = () => {
    pwaInstall({
      title: "Install Web App",
      features: (
        <ul>
          <li>Se manejara la aplicacion con acceso directo</li>
          <li>Cool feature 2</li>
          <li>Even cooler feature</li>
          <li>Works offline</li>
        </ul>
      ),
      description: "This is a very good app that does a lot of useful stuff. ",
    })
      .then(() => alert("La aplicacion ha sido instalada, revise las aplicacion de su navegador en su pc"))
      .catch(() => alert("Debe de permitir instalar la aplicacion"));
  };
  //supported()
  return (


      <div>
        
   {/*    {!isInstalled() ? (
        <>
        <h4> Instalar App, este proceso creara un acceso directo en su equipo</h4>
        <button type="button" onClick={handleClick}>
          Install App
        </button>
        </>
      ): */}
      
      <I18nextProvider i18n={i18n}>
      <Provider store={store}>
              <Router basename={process.env.PUBLIC_URL}>
                <AppRouter />
              </Router>
      </Provider>
    </I18nextProvider>
       
    </div>

  );
}

export default App;