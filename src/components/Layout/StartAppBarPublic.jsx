//Components
import { Toolbar, AppBar, Typography, Grid, List } from '@material-ui/core';
//Language
import { withTranslation } from 'react-i18next';
import SpecialDialLenguage from '../../components/SpecialDialLenguage';

//TODO agregar el nombre del restaurante en el header
const StartAppBarPublic = (props) => {
    return (
        <AppBar elevation={0} position='fixed' className={`appBar`}>
            <Toolbar>
                <Grid container>
                    <Grid item xs={8} md={6} className="column-logo">

                        <Typography variant='h6' noWrap>
                            Nombre de restaurante {/* {t('header.title')}  */}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} md={6} className="column-info">
                        <List className="menu">
                            <SpecialDialLenguage />
                        </List>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default withTranslation()(StartAppBarPublic);