// NOTE: function accept one arg - array with objects.
// Combine name and surname to new prop fullName.
// Return array with objects
export const fullNamePrettier = (userData) => {
  const updatedUser = userData.map((doctor) => ({
    ...doctor,
    fullName: doctor.name + ' ' + doctor.surname,
  }));

  return updatedUser;
};
