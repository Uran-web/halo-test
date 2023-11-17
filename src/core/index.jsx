import { Box } from '@mui/material';
import { withStyles } from '@mui/styles';
import { ToastContainer } from 'react-toastify';
import FormikForm from 'components/FormikForm';

import 'react-toastify/dist/ReactToastify.css';

import { wrapperStyles } from './styles';

const App = ({ classes }) => {
  return (
    <>
      <Box className={classes.mainWrapper}>
        <FormikForm />
      </Box>

      <ToastContainer />
    </>
  );
};

export default withStyles(wrapperStyles)(App);
