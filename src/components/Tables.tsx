import { Card, CardActionArea, CardContent, Grid } from '@material-ui/core';
import DeckIcon from '@material-ui/icons/Deck';
import { withRouter, Link, RouteComponentProps } from "react-router-dom";
interface TablesType extends RouteComponentProps<any> {
    numberTable: number;
    isAvailable: 'inherit' | 'primary' | 'secondary' | 'action' | 'disabled' | 'error';
}

const Tables = ({ numberTable, isAvailable }: TablesType) => {
    return (
        <Grid item xs={4} md={4} >

            <Card style={{ backgroundColor: " #f1f1f196" }} >
                <CardActionArea>
                    <CardContent style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                    }}>

                        <Link to={isAvailable === "error" ? '#' : "/menu"}  >
                            <DeckIcon fontSize={"large"}
                                color={isAvailable} />
                            <p
                                style={{
                                    marginLeft: "16px",
                                    marginTop: "8px"
                                }}
                            > #{numberTable}</p>

                        </Link>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}

export default withRouter(Tables);
