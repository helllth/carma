import * as ReactDOM from "react-dom/client";
import App from "./app/App";
import { Provider } from "react-redux";
import store from "./app/store";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { suppressReactCismapErrors } from "@carma-commons/utils";
import { CESIUM_BASE_URL } from "./app/config/app.config";
import { ErrorBoundary } from "react-error-boundary";
import AppErrorFallback from "./app/components/AppErrorFallback";

declare global {
  interface Window {
    CESIUM_BASE_URL: string;
  }
}

const persistor = persistStore(store);

const createRouter = () =>
  createHashRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/publish",
      element: <App published={true} />,
    },
  ]);

suppressReactCismapErrors();

window.CESIUM_BASE_URL = CESIUM_BASE_URL;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <PersistGate loading={null} persistor={persistor}>
    <Provider store={store}>
      <ErrorBoundary FallbackComponent={AppErrorFallback}>
        <RouterProvider router={createRouter()} />
      </ErrorBoundary>
    </Provider>
  </PersistGate>,
);
