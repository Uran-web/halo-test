import { fullNamePrettier } from '../utils/fullName';
import { addLabelAndValue } from '../utils/selectorFormatters';
import { addGenderToSpeciality } from '../utils/addGenderToSpeciality';

const URL = 'https://run.mocky.io/v3';

// NOTE: function make a request in order to fetch cities
export const getCities = async () => {
  const response = await fetch(`${URL}/9fcb58ca-d3dd-424b-873b-dd3c76f000f4`);
  if (!response.ok) {
    throw new Error('Failed fetch request');
  }
  const data = await response.json();
  return addLabelAndValue(data);
};

// NOTE: function make a request in order to fetch specialities
export const getDoctorSpeciality = async () => {
  const response = await fetch(`${URL}/e8897b19-46a0-4124-8454-0938225ee9ca`);

  if (!response.ok) {
    throw new Error('Failed fetch doctor speciality');
  }

  const data = await response.json();
  const updateData = addGenderToSpeciality(data);
  return addLabelAndValue(updateData);
};

// NOTE: function make a request in order to fetch doctors
export const getDoctors = async () => {
  const response = await fetch(`${URL}/3d1c993c-cd8e-44c3-b1cb-585222859c21`);

  if (!response.ok) {
    throw new Error('Failed fetch doctor speciality');
  }

  const data = await response.json();
  // NOTE: function will add full name
  const addFullName = fullNamePrettier(data);
  // NOTE: function will add value and label fields
  return addLabelAndValue(addFullName);
};
