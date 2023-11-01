import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { NotFound, SignIn, Unauthorized } from "src/pages";
import {
  Dashboard,
  GlobalSnackbar,
  MainLoading,
  ProtectedRoute,
} from "src/components/common";
import { AppRoutes, config } from "src/config";
import { useAuth } from "src/hooks";

const Containers = lazy(() =>
  import("src/pages").then((module) => ({
    default: module.Containers,
  }))
);

function App(): JSX.Element {
  const { isLoggedIn } = useAuth();

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
              isLoggedIn ? <Navigate to={config.LANDING_PAGE} /> : <SignIn />
            }
          />

          {/* protected routes */}
          <Route path={AppRoutes.Index} element={<Dashboard />}>
            <Route
              path={AppRoutes.Containers}
              element={
                <ProtectedRoute>
                  <Containers />
                </ProtectedRoute>
              }
            />
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
