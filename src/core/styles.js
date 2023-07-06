import { createStyles } from '@mui/material';

export const wrapperStyles = createStyles((theme) => ({
  mainWrapper: {
    height: '100vh',
    padding: '48px 100px',
    background: theme.palette.primary.layoutBackground,
    overflow: 'auto',
  },
}));
