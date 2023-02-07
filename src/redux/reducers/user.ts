import { Reducer } from "@reduxjs/toolkit";
import { AnyAction } from "redux";


// Define the user state
interface UserState {
  user: any | null;
}

const initialState: UserState = {
  user: null,
};


export const userReducer: Reducer<UserState, AnyAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "UPDATE_USER":
      return { ...state, user: action.user };
    default:
      return state;
  }
};
