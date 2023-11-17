export const fullNamePrettier = (userData) => {
  const updatedUser = userData.map((doctor) => ({
    ...doctor,
    fullName: doctor.name + ' ' + doctor.surname,
  }));

  return updatedUser;
};
