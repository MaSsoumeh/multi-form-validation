import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@mui/material/styles';
import { green, blue } from '@mui/material/colors';
import MainForm from './MainForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import { makeStyles } from '@mui/styles';
import Footer from './Footer';

let theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: green[500],
    },
  },
});
theme = responsiveFontSizes(theme);
const useStyles = makeStyles(() => ({
  root: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up('632')]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up('632')]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));
const Layout = (props) => {
  const classes = useStyles(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />{' '}
      <AppBar position='fixed'>
        <Toolbar>Iranian Pooshesh</Toolbar>
      </AppBar>
      <Toolbar />
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={3}>
          <MainForm />
        </Paper>
      </div>
      <Footer />
    </ThemeProvider>
  );
};
export default Layout;
