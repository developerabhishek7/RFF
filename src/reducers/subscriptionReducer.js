import { GET_PLANS_SUCCESS, GET_PLANS_ERROR } from "../constants/ActionConst";

const initialState = {
  plansArray: [],
  plansError: "",
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PLANS_SUCCESS:
      return {
        ...state,
        plansArray: action.payload.planData,
      };
    case GET_PLANS_ERROR:
      return {
        ...state,
        plansError: action.payload.plansError,
      };

    default:
      return state;
  }
}
