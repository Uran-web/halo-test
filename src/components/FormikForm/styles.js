import { createStyles } from '@mui/material';

export const wrapperStyles = createStyles((theme) => ({
  formWrapper: {
    padding: '30px 20px',
    maxWidth: 540,
    height: '100%',
    border: `1px solid ${theme.palette.customColors.transparentGray}`,
    borderRadius: 5,
    backgroundColor: theme.palette.primary.inverse,
    position: 'relative',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    height: 32,
  },
  titleName: {
    display: 'flex',
    alignItems: 'center',

    '& :first-child': {
      marginRight: 8,
    },
  },
  titleText: {
    fontSize: 24,
  },
  iconStyle: {
    color: theme.palette.customColors.commonIcon,
  },
  closeIcon: {
    color: theme.palette.secondary.gray,
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    '& > div:not(last-child)': {
      marginBottom: 16,
    },
  },
  userInfoFields: {
    height: 40,
    maxWidth: 300,

    '& > p': {
      marginTop: 0,
      marginBottom: 3,
      height: '20px',
      fontWeight: 300,
    },
  },

  birthdayField: {
    width: 300,
    border: `1px solid ${theme.palette.secondary.gray}`,
    borderRadius: 5,

    zIndex: 2,

    '@media(max-width: 320px)': {
      width: 240,
    },
  },
  birthdayFieldError: {
    borderColor: theme.palette.customColors.errorRed,
  },
  formSelect: {
    width: 300,
    color: theme.palette.primary.main,

    '@media(max-width: 320px)': {
      width: 240,
    },
  },

  formSelectError: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: '5px',
  },

  userContactInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    '& > div:not(last-child)': {
      marginBottom: 20,
    },
  },

  userContactInfoField: {
    height: 40,
    maxWidth: 300,

    '& > p': {
      marginTop: 0,
      marginBottom: 0,
      height: '20px',
      fontWeight: 300,
    },
  },

  medicalServices: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    '& > div:not(last-child)': {
      marginBottom: 20,
    },
  },

  medicalServicesFields: {
    height: 40,
    width: 300,

    '@media(max-width: 320px)': {
      width: 240,
    },
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  submitButton: {
    alignSelf: 'center',
    width: 300,
    height: 44,
    backgroundColor: theme.palette.customColors.darkBlue,
    color: theme.palette.primary.inverse,
    border: 'none',
    borderRadius: 5,
    fontWeight: 500,

    '&:hover': {
      cursor: 'pointer',
      opacity: 0.8,
    },
    '&:active': {
      cursor: 'pointer',
      opacity: 1,
      backgroundColor: theme.palette.customColors.newCar,
    },
  },
  disabledButton: {
    opacity: 0.2,
  },
  divider: {
    marginTop: '10px',
    width: 300,
  },
}));
