import { useState, useEffect, useMemo } from 'react';
import { Formik, Form, Field } from 'formik';
import { Box } from '@mui/material';
import { withStyles } from '@mui/styles';
import Divider from '@mui/material/Divider';
import { AddCircleOutlineOutlined } from '@mui/icons-material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { IconButton } from '@mui/material';
import clsx from 'clsx';
import CustomDatePicker from '../CustomDatePicker';
import { format } from 'date-fns';

import { getCities, getDoctors, getDoctorSpeciality } from '../../store/store';
import {
  autoSelectCityAndSpeciality,
  getFilteredDoctors,
} from '../../utils/doctorFormHelpers';

import FormSelect from '../Select';
import FormInput from '../InputField';

import { wrapperStyles } from './styles';

const handleSubmit = (values) => {
  // eslint-disable-next-line no-console
  alert('Successfully created appointment!');
};

const initialValues = {
  name: '',
  birthdayDate: '',
  sex: '',
  city: '',
  doctorSpeciality: '',
  doctorName: '',
  email: '',
  phoneNumber: '',
};

const sexOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
];

// All validations should be moved to separate file
const validateEmail = (value) => {
  let errors;
  if (
    !/^(?!.*(?:ru|ру))[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      value,
    )
  ) {
    errors = 'Email should contain correct format';
  }
  return errors;
};

///////////////////////////////////////  Validation block //////////////////////////////
const phoneValidation = (value) => {
  let errors;
  if (!/^\+?[0-9]{1,15}$/.test(value)) {
    errors = 'Phone should contain only numbers and';
  }
  return errors;
};

const nameExceptions = (value) => {
  let errors;
  if (!/^[a-zA-ZÀ-ú\s]+$/.test(value) || value === '') {
    errors = 'Name should contain only letters';
  }
  return errors;
};

const birthdayValidation = (value) => {
  let errors;
  if (value === '') {
    errors = 'Birthday date is mandatory';
  }
  return errors;
};

const sexValidation = (value) => {
  let errors;
  if (value === '') {
    errors = 'Sex is mandatory';
  }
  return errors;
};
const cityValidation = (value) => {
  let errors;
  if (value === '') {
    errors = 'City is mandatory';
  }
  return errors;
};

const doctorNameValidation = (value) => {
  let errors;
  if (value === '') {
    errors = 'Select the doctor name';
  }
  return errors;
};
///////////////////////////////////////  end of validation block //////////////////////////////

const FormikForm = ({ classes }) => {
  const [cities, setCities] = useState(null);
  const [doctorSpecialities, setDoctorSpecialities] = useState(null);
  const [doctors, setDoctors] = useState(null);
  const [userBirthdayDate, setUserBirthdayDate] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedSpeciality, setSelectedSpeciality] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);

  useEffect(() => {
    getCities().then((data) => setCities(data));
    getDoctors().then((data) => setDoctors(data));
    getDoctorSpeciality().then((data) => setDoctorSpecialities(data));
  }, []);

  const changeBirthday = (date) => {
    setUserBirthdayDate(date);
  };

  const handleSelectCity = (city) => {
    setSelectedCity(city);
  };

  const handleSelectSpeciality = (speciality) => {
    setSelectedSpeciality(speciality);
  };

  const handleSelectGender = (gender) => {
    setSelectedGender(gender);
  };

  const handleClearState = () => {
    setUserBirthdayDate(null);
    setSelectedCity(null);
    setSelectedSpeciality(null);
    setSelectedGender(null);
  };

  const filteredDoctors = useMemo(() => {
    if (!userBirthdayDate && !selectedCity && !selectedSpeciality) {
      return doctors;
    }
    let filteredByAge = doctors;

    if (userBirthdayDate) {
      const currentYear = +format(new Date(), 'yyyy');
      const selectedYear =
        userBirthdayDate &&
        +userBirthdayDate.slice(userBirthdayDate.length - 4);
      const patientAge = currentYear - selectedYear;
      filteredByAge = getFilteredDoctors(
        doctors,
        { byAge: userBirthdayDate },
        patientAge,
      );
    }

    let filteredByCities = filteredByAge;

    if (selectedCity) {
      filteredByCities = getFilteredDoctors(filteredByAge, {
        byCities: selectedCity,
      });
    }

    let filteredBySpeciality = filteredByCities;

    if (selectedSpeciality) {
      filteredBySpeciality = getFilteredDoctors(filteredByCities, {
        bySpeciality: selectedSpeciality,
      });
    }

    return filteredBySpeciality;
  }, [userBirthdayDate, doctors, selectedCity, selectedSpeciality]);

  const filteredSpecialities = useMemo(() => {
    if (!selectedGender) {
      return doctorSpecialities;
    }

    let filteredSpecialitiesList;
    if (selectedGender) {
      filteredSpecialitiesList =
        doctorSpecialities &&
        doctorSpecialities.filter((speciality) => {
          if (speciality.params) {
            if (selectedGender.value === speciality.params.gender) {
              return true;
            }
            if (speciality.params.minAge || speciality.params.maxAge) {
              return true;
            }
          } else {
            return true;
          }
        });
    }
    return filteredSpecialitiesList;
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, errors, handleSubmit, resetForm, dirty }) => {
        const birthdayDateCN = clsx(
          classes.userInfoFields,
          classes.birthdayField,
          {
            [classes.birthdayFieldError]: errors.birthdayDate,
          },
        );

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
            <Divider orientation={'horizontal'} />
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
                options={doctorSpecialities}
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

export default withStyles(wrapperStyles)(FormikForm);
