import { fetchData } from 'utils/http';
import { fullNamePrettier } from 'utils/fullName';
import { addLabelAndValue } from 'utils/selectorFormatters';
import { addGenderToSpeciality } from 'utils/addGenderToSpeciality';

// NOTE: function make a request in order to fetch cities
export const getCities = async () => {
  const data = await fetchData({
    endpoint: '9fcb58ca-d3dd-424b-873b-dd3c76f000f4',
  });
  return addLabelAndValue(data);
};

// NOTE: function make a request in order to fetch specialities
export const getDoctorSpeciality = async () => {
  const data = await fetchData({
    endpoint: 'e8897b19-46a0-4124-8454-0938225ee9ca',
  });
  const updateData = addGenderToSpeciality(data);
  return addLabelAndValue(updateData);
};

// NOTE: function make a request in order to fetch doctors
export const getDoctors = async () => {
  const data = await fetchData({
    endpoint: '3d1c993c-cd8e-44c3-b1cb-585222859c21',
  });
  // NOTE: function will add full name
  const addFullName = fullNamePrettier(data);
  // NOTE: function will add value and label fields
  return addLabelAndValue(addFullName);
};

// NOTE: function update user data. As a response, function return use data
export const sendUserData = async (userID, body) => {
  const data = await fetchData({ endpoint: userID, method: 'PUT', body });
  return data;
};
