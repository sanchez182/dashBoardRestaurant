import React, { useState } from 'react';
//Components
import { ListItem } from '@material-ui/core';
import { Language as LanguageIcon, Close as CloseIcon } from '@material-ui/icons';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab';
//Language
import { withTranslation } from 'react-i18next';
import i18n from '../config/i18n';
import languageOptions from '../config/languageOptions';


//TODO agregar el nombre del restaurante en el header
const SpecialDialLenguage = (props) => {
    const { t } = props;
    const [lang, setLang] = useState(languageOptions[0]);
    const [openLang, setOpenLang] = React.useState(false);



    const closeLanguage = () => {
        setOpenLang(false);
    }
    const openLanguage = () => {
        setOpenLang(true);
    }

    const changeLang = async (language) => {
        setLang(language);
        i18n.changeLanguage(language.value);
        closeLanguage();
    };
    return (
        <ListItem>
            <SpeedDial
                data-testid='speedDialId'
                id='speedDialId'
                ariaLabel="translate-selection"
                icon={<SpeedDialIcon icon={<LanguageIcon />} openIcon={<CloseIcon />} />}
                onClose={closeLanguage}
                onOpen={openLanguage}
                open={openLang}
                direction="down"
            >
                {languageOptions.map((action,index) => (
                    <SpeedDialAction
                        data-testid='actionSpeed'
                        className={action.value === lang.value ? 'active' : ''}
                        key={index}
                        icon={action.shortLabel}
                        tooltipOpen
                        tooltipTitle={t(action.label)}
                        onClick={() => changeLang(action)}
                    />
                ))}
            </SpeedDial>
        </ListItem>
    );
};

export default withTranslation()(SpecialDialLenguage);