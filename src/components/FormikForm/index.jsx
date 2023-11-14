import { useState, useEffect, useMemo } from 'react';
import { format } from 'date-fns';

import {
  getCities,
  getDoctors,
  getDoctorSpeciality,
  sendUserData,
} from 'store/store';
import { getFilteredDoctors } from 'utils/doctorFormHelpers';

import UserForm from './Forms/UserForm';

const handleSubmit = (values) => {
  sendUserData(values);
  // eslint-disable-next-line no-console
  alert('Successfully created appointment!');
};

// NOTE: initial values will be apply to the form
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

///////////////////////////////////////  Validation block //////////////////////////////

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

const FormikForm = () => {
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
    <UserForm
      initValues={initialValues}
      submitForm={handleSubmit}
      specialties={filteredSpecialities}
      sexOptions={sexOptions}
      validation={{
        validateEmail: validateEmail,
        phoneValidation: phoneValidation,
        nameExceptions: nameExceptions,
        birthdayValidation: birthdayValidation,
        sexValidation: sexValidation,
        cityValidation: cityValidation,
        doctorNameValidation: doctorNameValidation,
      }}
      cities={cities}
      doctorSpecialities={doctorSpecialities}
      doctors={doctors}
      handlers={{
        changeBirthday: changeBirthday,
        handleSelectCity: handleSelectCity,
        handleSelectSpeciality: handleSelectSpeciality,
        handleSelectGender: handleSelectGender,
        handleClearState: handleClearState,
      }}
      filteredDoctors={filteredDoctors}
    />
  );
};

export default FormikForm;
