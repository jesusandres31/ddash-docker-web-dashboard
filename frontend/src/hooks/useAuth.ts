/* import { useLazyGetLocationNameQuery } from "app/services/locationService";
import { useAppDispatch } from "app/store";
import {
  CUSTOMER_ID_KEY,
  CUSTOMER_SSO,
  LOCATION_ID_KEY,
  LOCATION_NAME_KEY,
  LOCATION_SSO,
  SMART_BAR_SSO,
  SMART_BAR_KEY,
  MAIN_APP_URL,
  SMART_BAR_APP_URL,
  USER_ID_KEY,
  USER_SSO,
} from "config";
import { UNAUTHORIZED_ROUTE } from "constants/";
import { useNavigate, useSearchParams } from "react-router-dom";
import { checkAuth, signIn } from "slices/auth/authSlice"; */

export const useAuth = () => {
  /* const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const queryLocationId = searchParams.get(LOCATION_SSO);
  const queryCustomerId = searchParams.get(CUSTOMER_SSO);
  const queryUserId = searchParams.get(USER_SSO);
  const querySmartBar = searchParams.get(SMART_BAR_SSO);

  const locationId = sessionStorage.getItem(LOCATION_ID_KEY) || '';
  const smartBar = sessionStorage.getItem(SMART_BAR_KEY) || '';
  const userId = sessionStorage.getItem(USER_ID_KEY) || '';
  const customerId = sessionStorage.getItem(CUSTOMER_ID_KEY) || '';
  const locationName = sessionStorage.getItem(LOCATION_NAME_KEY) || '';

  const [getLocationName] = useLazyGetLocationNameQuery();

  const setLocationName = async (locationId: string) => {
    const payload = await getLocationName(locationId).unwrap();
    sessionStorage.setItem(LOCATION_NAME_KEY, payload);
  };

  const handleCheckAuth = async () => {
    if (queryLocationId && queryCustomerId && queryUserId) {
      return dispatch(
        signIn({
          locationId: queryLocationId,
          customerId: queryCustomerId,
          userId: queryUserId,
          smartBar: querySmartBar || '',

        }),
      );
    } else {
      const { locationId, customerId, userId } = await dispatch(
        checkAuth(),
      ).unwrap();
      if (locationId && customerId && userId) {
        dispatch(
          signIn({
            locationId,
            customerId,
            userId,
            smartBar
          }),
        );
      } else {
        navigate(UNAUTHORIZED_ROUTE);
      }
    }
  };

  const logout = () => {
    if(smartBar) {
      window.location.replace(SMART_BAR_APP_URL);
    } else {
      window.location.replace(MAIN_APP_URL);
    }
  }; */

  return {
    /* handleCheckAuth,
    setLocationName,
    locationId,
    locationName,
    userId,
    customerId,
    logout, */
  };
};
