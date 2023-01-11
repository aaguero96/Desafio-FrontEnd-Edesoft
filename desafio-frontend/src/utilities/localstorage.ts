import { IUser } from "./userInterface";

const localstore = window.localStorage;

const setUserLocal = (user: IUser): void => {
  localstore.setItem("user", JSON.stringify(user));
};

const getUserLocal = (): IUser | undefined => {
  const users = localstore.getItem("user");
  if (users !== null) {
    return JSON.parse(users);
  }
  return undefined;
}

const removeUserLocal = (): void => {
  localstore.removeItem("user");
}

export {
  setUserLocal,
  getUserLocal,
  removeUserLocal,
}