// NOTE: Function accept three arg array. Filtering cities and specialities by doctor
// and return object with two params.
export const autoSelectCityAndSpeciality = (
  doctorData,
  cities,
  doctorSpecialities,
) => {
  const doctorsCity = cities.find((city) => city.id === doctorData.cityId);
  const doctorSpeciality = doctorSpecialities.find(
    (speciality) => speciality.id === doctorData.specialityId,
  );

  return { doctorsCity, doctorSpeciality };
};

// NOTE: Function accept three arg, arr, object with params, and stirng with age.
// return filterd array with doctors
export const getFilteredDoctors = (doctorsArr, filterParams, patientAge) => {
  let filteredDoctors = doctorsArr;

  if (filterParams.byAge) {
    filteredDoctors =
      doctorsArr &&
      filteredDoctors.filter((doctor) => {
        if (doctor.isPediatrician && patientAge < 18) {
          return true;
        }
        if (!doctor.isPediatrician && patientAge >= 18) {
          return true;
        }
        return false;
      });
  }

  if (filterParams.byCities) {
    filteredDoctors =
      filteredDoctors &&
      filteredDoctors.filter(
        (doctor) => doctor.cityId === filterParams.byCities.id,
      );
  }

  if (filterParams.bySpeciality) {
    filteredDoctors =
      filteredDoctors &&
      filteredDoctors.filter(
        (doctor) => doctor.specialityId === filterParams.bySpeciality.id,
      );
  }

  return filteredDoctors;
};
