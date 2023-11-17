import { fetchData } from 'utils/http';
import { fullNamePrettier } from 'utils/fullName';
import { addLabelAndValue } from 'utils/selectorFormatters';
import { addGenderToSpeciality } from 'utils/addGenderToSpeciality';

export const getCities = async () => {
  const data = await fetchData({
    endpoint: '9fcb58ca-d3dd-424b-873b-dd3c76f000f4',
  });
  return addLabelAndValue(data);
};

export const getDoctorSpeciality = async () => {
  const data = await fetchData({
    endpoint: 'e8897b19-46a0-4124-8454-0938225ee9ca',
  });
  const updateData = addGenderToSpeciality(data);
  return addLabelAndValue(updateData);
};

export const getDoctors = async () => {
  const data = await fetchData({
    endpoint: '3d1c993c-cd8e-44c3-b1cb-585222859c21',
  });
  const addFullName = fullNamePrettier(data);
  return addLabelAndValue(addFullName);
};

export const sendUserData = (userID, body) => {
  // NOTE: prepare custom message for notification
  const notification = {
    success: {
      message: 'Successfully created appointment!',
    },
    error: {
      message: 'Failed to update user data',
    },
  };

  return fetchData({
    endpoint: userID,
    method: 'PUT',
    body,
    notification,
  });
};
