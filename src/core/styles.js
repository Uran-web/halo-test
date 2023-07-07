import { createStyles } from '@mui/material';

export const wrapperStyles = createStyles((theme) => ({
  mainWrapper: {
    height: '100vh',
    padding: '48px 100px',
    background: theme.palette.primary.layoutBackground,
    overflow: 'auto',

    '@media(max-width: 538px)': {
      padding: '20px 20px',
    },
    '@media(max-height: 710px)': {
      padding: '20px 80px',
    },
  },
}));
