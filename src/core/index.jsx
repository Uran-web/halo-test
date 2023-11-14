import FormikForm from 'components/FormikForm';
import { Box } from '@mui/material';
import 'normalize.css';
import { withStyles } from '@mui/styles';

import { wrapperStyles } from './styles';

const App = ({ classes }) => {
  return (
    <Box className={classes.mainWrapper}>
      <FormikForm />
    </Box>
  );
};

export default withStyles(wrapperStyles)(App);
