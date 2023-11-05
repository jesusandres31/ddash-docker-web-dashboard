import { useNavigate } from "react-router-dom";
import { useSignInMutation } from "src/app/services/authService";
import { getAccessToken, login, logout } from "src/app/auth";
import { AppRoutes, config } from "src/config";
import { SignInReq } from "src/interfaces";

export const useAuth = () => {
  const [signIn, { isLoading: isSigningIn }] = useSignInMutation();
  const navigate = useNavigate();

  const handleSignIn = async (data: SignInReq) => {
    const res = await signIn(data).unwrap();
    login(res, data.remember);
    navigate(config.LANDING_PAGE);
  };

  const handleSignOut = async () => {
    logout();
    navigate(AppRoutes.Login);
  };

  const handleRefresh = async (token: string) => {
    console.log(token);
  };

  const isLoggedIn = !!getAccessToken();

  return {
    handleSignIn,
    handleSignOut,
    isSigningIn,
    isLoggedIn,
  };
};
