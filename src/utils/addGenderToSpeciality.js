const mensDoctor = ['Urologist', 'Geriatrician'];
const wemansDoctor = ['Gynecologist', 'Mammologist', 'Obstetrician'];

// NOTE: function add gender to speciality.
// accept array with object.
// Return new array.
export const addGenderToSpeciality = (array) => {
  const updatedArray = array?.map((spec) => {
    if (spec?.params?.minAge || spec?.params?.maxAge) {
      return spec;
    }

    if (!spec?.params?.gender) {
      const genderSpec = mensDoctor.find((el) => el === spec?.name)
        ? 'Male'
        : wemansDoctor?.find((el) => el === spec?.name) && 'Female';

      return !genderSpec ? spec : { ...spec, params: { gender: genderSpec } };
    }
    return spec;
  });

  return updatedArray;
};
