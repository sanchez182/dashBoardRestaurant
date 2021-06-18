import { FC } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './config/i18n';
import AppRouter from './router/AppRouter';
import store from './store';
import './assets/scss/App.scss'; 

const App: FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
              <Router basename={process.env.PUBLIC_URL}>
                <AppRouter />
              </Router>
      </Provider>
    </I18nextProvider>

  );
}

export default App;