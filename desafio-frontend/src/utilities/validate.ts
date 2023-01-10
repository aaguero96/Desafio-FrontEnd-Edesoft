import { MIN_LEN_NAME, MIN_LEN_PASSWORD } from "./constants";
import { geolocation } from "./geolocation";
import { IUser } from "./userInterface";

const validateEmail = (email: string): boolean => {
  const validate = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  if (validate === null) {
    return false;
  }

  return validate && true;
}

const validatePassword = (password: string): boolean => {
  const validate = [
    password.match(/[A-Z]/),
    password.match(/[a-z]/),
    password.match(/[0-9]/),
    password.match(/[^A-Za-z0-9]/),
    password.length >= MIN_LEN_PASSWORD,
  ];

  return validate.every((i) => i);
}

const validatePasswordConfim = (password: string, passwordConfirm: string): boolean => {
  return password === passwordConfirm;
}

const validateName = (name: string): boolean => {
  return name.length >= MIN_LEN_NAME;
}

// TODO: implement that
const validateLocation = (zipcode: string): boolean => {
  const validate = geolocation(zipcode);
  if (validate[0] === '' && validate[1] === '') {
    return false;
  }

  return true;
}

const validateUserRegister = (user: IUser, confirmPassword: string): boolean => {
  const validate = [
    validateEmail(user.email),
    validatePassword(user.password),
    validatePasswordConfim(user.password, confirmPassword),
    validateName(user.name.firstname),
    validateName(user.name.lastname),
    validateName(user.username),
  ];

  return validate.every((i) => i);
}

export {
  validateEmail,
  validatePassword,
  validatePasswordConfim,
  validateName,
  validateLocation,
  validateUserRegister,
}