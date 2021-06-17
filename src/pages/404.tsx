import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store';
import {withTranslation} from "react-i18next"

const Page404: FC = ({t}: any) => {
  const { language } = useSelector((state: RootState) => state.lang);

  return(
    <div className="page-404">
      <div className="container">
        <h1>404</h1>
        <p>{t('pageDoesNotExist', language)}</p>
        <p><Link to="/">{t('returnToHomepage', language)}</Link></p>
      </div>
    </div>
  );
}

export default withTranslation() (Page404);