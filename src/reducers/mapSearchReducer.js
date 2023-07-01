import {
  GET_AVAILABLE_DESTINATIONS_SUCCESS,
  GET_AVAILABLE_DESTINATIONS_ERROR,
  RESET_MAP_DATA,
} from "../constants/ActionConst";

const initialState = {
  availableDestinationsError: "",
  availableDestinations: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_AVAILABLE_DESTINATIONS_SUCCESS: {
      return {
        ...state,
        availableDestinations: action.payload.availableDestinations,
        availableDestinationsError: "",
      };
    }
    case GET_AVAILABLE_DESTINATIONS_ERROR:
      return {
        ...state,
        availableDestinationsError: action.payload.availableDestinationsError,
        availableDestinations: null,
      };
    case RESET_MAP_DATA:
      return {
        ...state,
        availableDestinationsError: "",
        availableDestinations: null,
      };

    default:
      return state;
  }
}
