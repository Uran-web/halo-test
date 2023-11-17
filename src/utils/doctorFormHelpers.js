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

export const getFilteredDoctors = (doctorsArr, filterParams, patientAge) => {
  let filteredDoctors = doctorsArr;

  if (filterParams.byAge) {
    filteredDoctors =
      doctorsArr &&
      filteredDoctors.filter((doctor) => {
        if (doctor.isPediatrician && patientAge < 18) {
          return true;
        } else {
          return false;
        }
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
