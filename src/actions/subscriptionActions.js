import { secureGet, secureGetForUser } from "../services/apiService";
import * as API_CONST from "../helpers/config";
import {
  GET_PLANS_SUCCESS,
  GET_PLANS_ERROR,
  SESSION_EXPIRED,
} from "../constants/ActionConst";
import * as CommonActions from "./commonActions";

export function getProductPlans() {
  return async (dispatch, getState) => {
    try {
      dispatch(CommonActions.startLoader());
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
      const res = await secureGetForUser(`/v1/plans`, authToken);
      if (res) {
        dispatch(CommonActions.stopLoader()); // To stop Loader
        await dispatch({
          type: GET_PLANS_SUCCESS,
          payload: { planData: res.data },
        });
      } else {
        dispatch(CommonActions.stopLoader()); // To stop Loader
        await dispatch({
          type: GET_PLANS_ERROR,
        });
      }
    } catch (e) {
      console.log("cath error get Plans", e);
      dispatch(CommonActions.stopLoader()); // To stop Loader
      if (e.status == 401) {
        await dispatch({
          type: SESSION_EXPIRED,
          payload: { sessionExpired: true },
        });
      }
    }
  };
}
