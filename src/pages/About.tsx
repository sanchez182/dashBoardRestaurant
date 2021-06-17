import  { Fragment, FC } from 'react';
import { useSelector } from 'react-redux';
 
import aboutImg from '../assets/img/about.jpg';
import { RootState } from '../store'; 
import { useTranslation } from 'react-i18next';

const About: FC = () => {
  const { language } = useSelector((state: RootState) => state.lang);
  const { t } = useTranslation(); 

  return(
    <Fragment>
      <section className="about">
        <div className="container">
          <h1>{t('about', language)}</h1>
          <img src={aboutImg} alt="" />
          <p>{t('aboutUsText', language)}</p>
        </div>
      </section>
    </Fragment>
  );
}

export default About;