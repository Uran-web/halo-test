import { createTheme } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: '#6a99cb',
      background: '#d7e5f6',
      layoutBackground: '#a9c1e1',
      inverse: '#ffffff',
    },
    secondary: {
      main: '#699fb0',
      background: '#d7e1ea',
      gray: '#828282',
    },
    customColors: {
      black: '#333333',
      transparentGray: '#d7e1ea',
      azureishWhite: '#d7e5f6',
      commonIcon: '#a9c1e1',
      errorRed: '#d32f2f',
      darkBlue: '#3664F7',
      newCar: '#1f48cc',
    },
  },
  typography: {
    fontFamily: 'Roboto',
    subtitle1: {
      fontFamily: 'Roboto',
      fontSize: '18px',
      fontWeight: 500,
    },
    h1: {
      fontSize: '48px',
      fontWeight: 800,
    },
    h2: {
      fontSize: '48px',
      fontWeight: 800,
    },

    h3: {
      fontSize: '24px',
      fontWeight: 700,
    },
    caption: {
      fontSize: '14px',
      fontWeight: 700,
    },
  },
  spacing: 8,
});

theme = createTheme(theme, {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@global': {
          html: {
            color: theme.palette.customColors.black,
            fontSize: 10,
            fontWeight: 400,
            '& body': {
              minWidth: '307px',
            },
            '& #root': {
              backgroundSize: 'cover',
              backgroundAttachment: 'fixed',
              backgroundPosition: 'top',
            },
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.primary.main,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          background: theme.palette.secondary.main,
          border: 0,
          color: 'white',
          padding: '0 30px',
          marginTop: '40px',
          textTransform: 'inherit',
          fontSize: theme.typography.subtitle1.fontSize,
          maxWidth: '280px',
          display: 'flex',
          justifyContent: 'center',
          margin: '0 auto',
          borderRadius: '30px',
          '&:hover': {
            background: theme.palette.primary.inverse,
            backgroundColor: theme.palette.primary.inverse,
            border: `1px solid ${theme.palette.secondary.main}`,
            color: theme.palette.secondary.main,
          },
          '&:active': {
            backgroundColor: '#08795A',
            color: 'white',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          height: 40,
          background: theme.palette.primary.inverse,
          '&$focused .MuiIconButton': {
            borderColor: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.inverse,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.primary.inverse,
          fontFamily: 'Roboto',
          caretColor: theme.palette.primary.main,

          '& $notchedOutline': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
          },
          '&:hover $notchedOutline': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
          },
          '&$focused $notchedOutline': {
            borderColor: theme.palette.primary.main,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          border: 'none',
          borderRadius: 5,
          width: '100%',

          '&:hover': {
            borderColor: 'transparent',
          },

          '&:focus': {
            borderColor: theme.palette.primary.main,
          },

          [theme.breakpoints.down(538)]: {
            width: 240,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          margin: '-5px',
        },
      },
    },
  },
});

export default theme;
