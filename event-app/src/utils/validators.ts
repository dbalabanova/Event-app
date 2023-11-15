export const isEmpty = (data: string):boolean => {
  return data.length ? false : true;
};

export const isValidEmail = (data: string):boolean => {
  return data.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) ? true : false;
};

export const isPasswordCorrect = (data: string):boolean => {
  return data.length >= 6 ? true : false;
};

