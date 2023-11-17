const mensDoctor = ['Urologist', 'Geriatrician', 'Venereologist'];
const wemansDoctor = ['Gynecologist', 'Mammologist', 'Obstetrician'];

export const addGenderToSpeciality = (array) => {
  const updatedArray = array?.map((spec) => {
    if (spec?.params?.minAge || spec?.params?.maxAge) {
      return spec;
    }

    if (!spec?.params?.gender) {
      const genderSpec = mensDoctor.some((el) => el === spec?.name)
        ? 'Male'
        : wemansDoctor?.find((el) => el === spec?.name) && 'Female';

      return !genderSpec ? spec : { ...spec, params: { gender: genderSpec } };
    }
    return spec;
  });

  return updatedArray;
};
