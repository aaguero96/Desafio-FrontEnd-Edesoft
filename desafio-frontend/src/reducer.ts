import { getUserLocal } from "./utilities/localstorage"
import { IUser, UserState } from "./utilities/userInterface"

const initialState = {
  user: getUserLocal(),
}

type Action = {
  type: "LOGGED_USER",
  payload: IUser,
}

export const reducer = (state: UserState = initialState, action: Action) => {
  switch(action.type){
    case "LOGGED_USER": {
      return {...state, user: action.payload}
    }
    default:
      return state;
  }
}