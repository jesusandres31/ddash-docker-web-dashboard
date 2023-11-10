import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { NotFound, SignIn, Unauthorized } from "src/pages";
import {
  Dashboard,
  GlobalSnackbar,
  MainLoading,
  ProtectedRoute,
} from "src/components/common";
import { AppRoutes, conf } from "src/config";
import { useAuthSelector } from "src/slices/auth/authSlice";
import { useAuth } from "src/hooks";

const Containers = lazy(() =>
  import("src/pages").then((module) => ({ default: module.Containers }))
);
const Images = lazy(() =>
  import("src/pages").then((module) => ({ default: module.Images }))
);
const Volumes = lazy(() =>
  import("src/pages").then((module) => ({ default: module.Volumes }))
);
const Networks = lazy(() =>
  import("src/pages").then((module) => ({ default: module.Networks }))
);
const System = lazy(() =>
  import("src/pages").then((module) => ({ default: module.System }))
);

const privateRoutes = [
  {
    route: AppRoutes.Containers,
    render: <Containers />,
  },
  {
    route: AppRoutes.Images,
    render: <Images />,
  },
  {
    route: AppRoutes.Volumes,
    render: <Volumes />,
  },
  {
    route: AppRoutes.Networks,
    render: <Networks />,
  },
  {
    route: AppRoutes.System,
    render: <System />,
  },
];

function App(): JSX.Element {
  const { isLoggedIn } = useAuthSelector((state) => state.auth);
  const { handleCheckAuth } = useAuth();

  useEffect(() => {
    handleCheckAuth();
  }, []);

  return (
    <React.Fragment>
      <Suspense fallback={<MainLoading />}>
        <Routes>
          {/* login routes */}
          <Route
            path={AppRoutes.Index}
            element={<Navigate to={AppRoutes.Login} />}
          />
          <Route
            path={AppRoutes.Login}
            element={
              isLoggedIn ? <Navigate to={conf.LANDING_PAGE} /> : <SignIn />
            }
          />

          {/* protected routes */}
          <Route path={AppRoutes.Index} element={<Dashboard />}>
            {privateRoutes.map((privateRoute) => (
              <Route
                key={privateRoute.route}
                path={privateRoute.route}
                element={<ProtectedRoute>{privateRoute.render}</ProtectedRoute>}
              />
            ))}
          </Route>

          {/* error routes */}
          <Route path={AppRoutes.Unauthorized} element={<Unauthorized />} />
          <Route path={AppRoutes.Wildcard} element={<NotFound />} />
        </Routes>
      </Suspense>
      <GlobalSnackbar />
    </React.Fragment>
  );
}

export default App;
