import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HelpIcon from '@material-ui/icons/Help';
import { MainListItems, SecondaryListItems } from './listItems';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { createBrowserHistory } from "history";
// import { getAppInsights } from './TelemetryService';
// import TelemetryProvider from './TelemetryProvider';

const browserHistory = createBrowserHistory({ basename: '' });
var reactPlugin = new ReactPlugin();
var appInsights = new ApplicationInsights({
    config: {
        instrumentationKey: '####',
        extensions: [reactPlugin],
        enableAutoRouteTracking: true,
        disableFetchTracking: false,
        extensionConfig: {
          [reactPlugin.identifier]: { history: browserHistory }
        }
    }
});
appInsights.loadAppInsights();


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://foostack.ai/">
        FooStack.Ai
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  typography: {
    fontSize: 8,
    htmlFontSize: 8,
  },
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalpaper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    maxWidth: '75%',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 280,
  },
}));

const aboutInfo = (
  <React.Fragment>
    <h2 id="transition-modal-title">About COVID</h2>
    <p id="transition-modal-description">This site utilizes various technologies and data sources as a semi classic MERN.</p>
    <ul>
      <li>React.js front end (Material-UI)</li>
      <li>Rechart Visualization (React Component)</li>
      <li>Python Flask REST backend</li>
      <li>Scikit Learn Machine Learning models</li>
    </ul>
    <p>Env: {process.env.NODE_ENV}</p> 
  </React.Fragment>
);

const aboutCs = {
  A: {
    Name: "A",
    Title: "About A",
    Desc: "Blah blah 1.",
    Desc2: "Blahblah 2.",
  },
  B: {
    Name: "B",
    Title: "About B",
    Desc: "Blah blah 1.",
    Desc2: "Blahblah 2.",
  },
};

function aboutCsHelper(n) {
  console.log('about: ', aboutCs, n);
  return (
    <React.Fragment>
      <h2 id="transition-modal-title" variant="h2">{aboutCs[n].Title}</h2>
      <p id="transition-modal-description">{aboutCs[n].Desc}</p>
      <p id="transition-modal-description">{aboutCs[n].Desc2}</p>
    </React.Fragment>
  )
}


function CovidDashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [about, setAbout] = React.useState(false);
  const [modal, setModal] = React.useState('About');

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleAboutOpen = mKey => event => {
    appInsights.trackEvent({ name: 'aboutClicked '+mKey });
    console.log(mKey);
    setModal(mKey);
    setAbout(true);
  }
  const handleAboutClose = () => {
    setAbout(false);
  }

  return (
    <div>
      <div>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={about}
            onClose={handleAboutClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 300,
            }}
          >
            <Fade in={about}>
              <div className={classes.modalpaper}>
                { modal === 'About' ? aboutInfo : aboutCsHelper(modal) }
              </div>
            </Fade>
        </Modal>
        </div>
        <div className={classes.root}>

        <CssBaseline />
        <AppBar position="absolute" style={{ background: '#8b0000' }} className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              COVID Analytics
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={0} color="secondary">
                <HelpIcon onClick={handleAboutOpen('About')} />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <MainListItems aboutOpen={handleAboutOpen}/>
          </List>
          <Divider />
          <List>
            <SecondaryListItems aboutOpen={handleAboutOpen}/>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={10} lg={8}>
                <Paper className={classes.paper}>
                 <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    Placeholder A
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Paper className={classes.paper}>
                  <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    Placeholder B
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Paper className={classes.paper} >
                  <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    Placeholder C
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Container>
          <Copyright />
        </main>
      </div>
    </div>
  );
}

export default CovidDashboard;

