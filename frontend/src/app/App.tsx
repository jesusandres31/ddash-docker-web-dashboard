import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { NotFound, SignIn, Unauthorized } from "../pages";
import { GlobalSnackbar, MainLoading } from "../components/common";
import { useAuth } from "../hooks";
import { AppRoutes, config } from "../config";

const Containers = lazy(() =>
  import("../pages").then((module) => ({
    default: module.Containers,
  }))
);

function App(): JSX.Element {
  /* const { handleCheckAuth } = useAuth();

  useEffect(() => {
    handleCheckAuth(); 
  }, []); */

  return (
    <React.Fragment>
      <Suspense fallback={<MainLoading />}>
        <Routes>
          <Route path="/" element={<Navigate to={AppRoutes.Login} />} />
          <Route path={AppRoutes.Login} element={<SignIn />} />
          <Route path={AppRoutes.Unauthorized} element={<Unauthorized />} />
          <Route
            path={AppRoutes.Login}
            element={<Navigate to={config.LANDING_PAGE} />}
          />
          <Route path={AppRoutes.Containers} element={<Containers />} />
          {/* <Route path={ACTIVITY_ROUTE} element={<AllActivity />} />
          <Route
            path={`${INVENTORY_ROUTE}/:inventoryId${SHELF_ROUTE}`}
            element={<InventoryDetails />}
          />
          <Route path={BAR_ROUTE} element={<BarsView />} />
          <Route path={BAR_ALL_ROUTE} element={<AllProductsView />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <GlobalSnackbar />
    </React.Fragment>
  );
}

export default App;
