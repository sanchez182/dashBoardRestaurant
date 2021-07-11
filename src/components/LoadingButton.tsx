import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button'; 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
    buttonSuccess: {
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
    fabProgress: {
      color: green[500],
      position: 'absolute',
      top: -6,
      left: -6,
      zIndex: 1,
    },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  }),
);

interface ILoadingButton {
  isLoading: boolean;
  textButton: string;
  type : "button" | "submit";   // '"button" | "reset" | "submit" | undefined';
  classButton: string;
  handleSubmit: ()=> void | null;
  icon: string
}


export default function LoadingButton({isLoading,textButton,type,handleSubmit,icon}: ILoadingButton) {
  const classes = useStyles(); 
/*   const [success, setSuccess] = React.useState(false); 

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  }); 
  */
  return (
    <div className={classes.root}>
 
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary" 
          disabled={isLoading} 
          type={type}
          onClick={handleSubmit}
        >
          {textButton}
        </Button>
        {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
    </div>
  );
}
