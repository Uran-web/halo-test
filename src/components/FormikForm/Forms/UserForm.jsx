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
import FormSelect from 'components/Select';

import { autoSelectCityAndSpeciality } from 'utils/doctorFormHelpers';

import { wrapperStyles } from './styles';

const UserForm = ({
  classes,
  initValues,
  submitForm,
  specialties,
  sexOptions,
  validation,
  cities,
  doctorSpecialities,
  doctors,
  handlers,
  filteredDoctors,
}) => {
  const {
    validateEmail,
    phoneValidation,
    nameExceptions,
    birthdayValidation,
    sexValidation,
    cityValidation,
    doctorNameValidation,
  } = validation;

  const {
    changeBirthday,
    handleSelectCity,
    handleSelectSpeciality,
    handleSelectGender,
    handleClearState,
  } = handlers;

  return (
    <Formik initialValues={initValues} onSubmit={submitForm} enableReinitialize>
      {({ errors, handleSubmit, resetForm }) => {
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
                  handleClearState();
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
                validate={nameExceptions}
                required={true}
              />
              <Field
                name={'birthdayDate'}
                label={'Birthday date'}
                component={CustomDatePicker}
                className={birthdayDateCN}
                getDate={changeBirthday}
                required={true}
                validate={birthdayValidation}
              />
              <Field
                name={'sex'}
                component={FormSelect}
                options={sexOptions}
                className={sexFieldCN}
                placeholder={'Sex'}
                required={true}
                handleSelectValue={handleSelectGender}
                validate={sexValidation}
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
                validate={validateEmail}
                required={true}
              />
              <Field
                name={'phoneNumber'}
                label={'Mobile number'}
                placeholder={'Mobile number'}
                component={FormInput}
                className={classes.userContactInfoField}
                validate={phoneValidation}
                required={true}
              />
            </Box>
            <Box className={classes.medicalServices}>
              <Field
                name={'doctorName'}
                component={FormSelect}
                options={filteredDoctors ? filteredDoctors : doctors}
                className={doctorNameFieldCN}
                placeholder={'Doctor name'}
                required={true}
                autoSelectCityAndSpeciality={autoSelectCityAndSpeciality}
                cities={cities}
                doctorSpecialities={doctorSpecialities}
                validate={doctorNameValidation}
              />
              <Field
                name={'doctorSpeciality'}
                component={FormSelect}
                options={specialties && specialties}
                className={classes.medicalServicesFields}
                placeholder={'Speciality'}
                handleSelectValue={handleSelectSpeciality}
              />
              <Field
                name={'city'}
                component={FormSelect}
                options={cities}
                className={cityFieldCN}
                placeholder={'City'}
                required={true}
                handleSelectValue={handleSelectCity}
                validate={cityValidation}
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
