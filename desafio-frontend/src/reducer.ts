import { IUser, UserState } from "./utilities/userInterface"

const initialState = {
  users: [],
}

type Action = {
  type: "ADD_USERS",
  payload: IUser[],
}

export const reducer = (state: UserState = initialState, action: Action) => {
  switch(action.type){
    case "ADD_USERS": {
      return {...state, users: [...state.users, ...action.payload]}
    }
    default:
      return state;
  }
}