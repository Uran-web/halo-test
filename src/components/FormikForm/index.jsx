import { useState, useEffect } from 'react';
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
};

// NOTE: initial values will be apply to the form
const initialValues = {
  name: '',
  birthdayDate: new Date(),
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

/////////////////////////////////////// Validation block //////////////////////////////

const validationField = (value, condition, errorMessage) => {
  let errors;
  if (!condition.test(value)) {
    errors = errorMessage;
  }

  return errors;
};

/////////////////////////////////////// end of validation block //////////////////////////////

const FormikForm = () => {
  const [cities, setCities] = useState(null);
  const [doctorSpecialities, setDoctorSpecialities] = useState(null);
  const [doctors, setDoctors] = useState(null);

  // This is not the best solution. However, as example it could be used.
  // For better performance we should use Mobx or Redux, also Axios
  useEffect(() => {
    getCities().then((data) => setCities(data));
    getDoctors().then((data) => setDoctors(data));
    getDoctorSpeciality().then((data) => setDoctorSpecialities(data));
  }, []);

  const filterDoctors = (
    userBirthdayDate,
    selectedCity,
    selectedSpeciality,
    doctors,
  ) => {
    const date = new Date(userBirthdayDate);
    if (!date && !selectedCity && !selectedSpeciality) {
      return doctors;
    }
    let filteredByAge = doctors;

    if (date) {
      const currentYear = +format(new Date(), 'yyyy');
      const selectedYear = date && +date.toString().slice(date.length - 4);
      const patientAge = currentYear - selectedYear;
      filteredByAge = getFilteredDoctors(doctors, { byAge: date }, patientAge);
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
  };

  const filterSpecialities = (selectedGender, doctorSpecialities) => {
    if (!selectedGender) {
      return doctorSpecialities;
    }

    const filteredSpecialitiesList =
      doctorSpecialities &&
      doctorSpecialities.filter(
        (speciality) =>
          speciality.params &&
          (selectedGender.value === speciality.params.gender ||
            speciality.params.minAge ||
            speciality.params.maxAge),
      );

    return filteredSpecialitiesList;
  };

  return (
    <UserForm
      initValues={initialValues}
      submitForm={handleSubmit}
      sexOptions={sexOptions}
      cities={cities}
      doctorSpecialities={doctorSpecialities}
      doctors={doctors}
      validationField={validationField}
      filterDoctors={filterDoctors}
      filterSpecialities={filterSpecialities}
    />
  );
};

export default FormikForm;
