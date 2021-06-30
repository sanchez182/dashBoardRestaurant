import { useRef } from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { Button,CardActions } from '@material-ui/core';

const FlipCard = ({ FrontComponent, BackComponent,setFlip, flip }) => {
    
    let refFlipply = useRef()
    return (
        <Flippy
            flipOnHover={false}
            flipOnClick={flip}
         /*    ref={ref} */
            ref={(r) => refFlipply = r}
            flipDirection="horizontal">
            <FrontSide style={{  display: 'table' }} >
                {FrontComponent}
            </FrontSide>
            <BackSide   style={{  display: 'table' }} >
                {BackComponent} 
                
            <CardActions>
                <Button variant="contained" size="small" color="primary">
                    Procesar Orden
                </Button>
                <Button variant="contained" size="small" color="primary"
                  onClick={()=> {
                    refFlipply.toggle() 
                    setFlip(true)} } >
                    Orden finalizada
                </Button> 
            </CardActions>

            </BackSide>
        </Flippy>
    )
}
export default FlipCard