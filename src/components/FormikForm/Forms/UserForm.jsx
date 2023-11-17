import { Formik, Form, Field } from 'formik';
import Divider from '@mui/material/Divider';
import { IconButton } from '@mui/material';
import { Box } from '@mui/material';
import { withStyles } from '@mui/styles';
import clsx from 'clsx';
import { AddCircleOutlineOutlined } from '@mui/icons-material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

import CustomDatePicker from 'components/CustomDatePicker';
import FormInput from 'components/InputField';
import FormSelect from 'components/FormSelect';

import { autoSelectCityAndSpeciality } from 'utils/doctorFormHelpers';

import { wrapperStyles } from './styles';

const UserForm = ({
  classes,
  initValues,
  submitForm,
  sexOptions,
  cities,
  doctorSpecialities,
  doctors,
  validationField,
  filterDoctors,
  filterSpecialities,
}) => {
  return (
    <Formik initialValues={initValues} onSubmit={submitForm} enableReinitialize>
      {({ values, errors, handleSubmit, resetForm }) => {
        const currentDoctors = filterDoctors(
          values.birthdayDate,
          values.city,
          values.doctorSpeciality,
          doctors,
        );

        const currentSpecialities = filterSpecialities(
          values.sex,
          doctorSpecialities,
        );

        // NOTE: styles for validation field
        const birthdayDateCN = clsx(classes.datePicker, classes.birthdayField, {
          [classes.birthdayFieldError]: errors.birthdayDate,
        });

        const sexFieldCN = clsx(classes.formSelect, {
          [classes.formSelectError]: errors.sex,
        });

        const cityFieldCN = clsx(classes.medicalServicesFields, {
          [classes.formSelectError]: errors.city,
        });
        const doctorNameFieldCN = clsx(classes.medicalServicesFields, {
          [classes.formSelectError]: errors.doctorName,
        });

        const buttonStyles = clsx(classes.submitButton, {
          [classes.disabledButton]: Object.keys(errors)?.length,
        });
        // ---- and styles block ----

        return (
          <Form className={classes.formWrapper}>
            <Box className={classes.title}>
              <div className={classes.titleName}>
                <AddCircleOutlineOutlined
                  className={classes.iconStyle}
                  style={{ height: 32, width: 32 }}
                />
                <h1 className={classes.titleText}>Doctor appointment</h1>
              </div>
              <IconButton
                onClick={() => {
                  resetForm();
                }}
              >
                <ClearOutlinedIcon className={classes.closeIcon} />
              </IconButton>
            </Box>
            <Divider
              orientation={'horizontal'}
              className={classes.divider}
              sx={{ margin: '0 0 20px 0' }}
            />
            <Box className={classes.userInfo}>
              <Field
                name={'name'}
                label={'Full name'}
                placeholder={'Full name'}
                component={FormInput}
                className={classes.userInfoFields}
                validate={(e) =>
                  validationField(
                    e,
                    /^[a-zA-ZÀ-ú\s]+$/,
                    'Name should contain only letters',
                  )
                }
                required={true}
              />
              <Field
                name={'birthdayDate'}
                label={'Birthday date'}
                component={CustomDatePicker}
                className={birthdayDateCN}
                required={true}
                validate={(e) =>
                  validationField(e, /^$/, 'Birthday date is mandatory')
                }
              />
              <Field
                name={'sex'}
                component={FormSelect}
                options={sexOptions}
                className={sexFieldCN}
                placeholder={'Sex'}
                required={true}
                validate={(e) => validationField(e, /^$/, 'Sex is mandatory')}
              />
            </Box>
            <Box className={classes.userContactInfo}>
              <Field
                name={'email'}
                label={'Email address'}
                placeholder={'Email address'}
                component={FormInput}
                type={'mail'}
                className={classes.userContactInfoField}
                validate={(e) =>
                  validationField(
                    e,
                    //eslint-disable-next-line
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    'Email should contain correct format',
                  )
                }
                required={true}
              />
              <Field
                name={'phoneNumber'}
                label={'Mobile number'}
                placeholder={'Mobile number'}
                component={FormInput}
                className={classes.userContactInfoField}
                validate={(e) =>
                  validationField(
                    e,
                    /^\+?[0-9]{1,15}$/,
                    'Phone should contain only numbers and',
                  )
                }
                required={true}
              />
            </Box>
            <Box className={classes.medicalServices}>
              <Field
                name={'doctorName'}
                component={FormSelect}
                options={currentDoctors}
                className={doctorNameFieldCN}
                placeholder={'Doctor name'}
                required={true}
                autoSelectCityAndSpeciality={autoSelectCityAndSpeciality}
                cities={cities}
                validate={(e) =>
                  validationField(e, /^$/, 'Select the doctor name')
                }
              />
              <Field
                name={'doctorSpeciality'}
                component={FormSelect}
                options={currentSpecialities}
                className={classes.medicalServicesFields}
                placeholder={'Speciality'}
              />
              <Field
                name={'city'}
                component={FormSelect}
                options={cities}
                className={cityFieldCN}
                placeholder={'City'}
                required={true}
                validate={(e) => validationField(e, /^$/, 'City is mandatory')}
              />
            </Box>
            <Box className={classes.buttonContainer}>
              <button
                className={buttonStyles}
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default withStyles(wrapperStyles)(UserForm);
