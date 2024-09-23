import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import { suppressReactCismapErrors } from "@carma-commons/utils";

import App from "./app/App";
import store from "./app/store";
import { CESIUM_BASE_URL } from "./app/config/app.config";

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

const root = createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <PersistGate loading={null} persistor={persistor}>
    <Provider store={store}>
      <RouterProvider router={createRouter()} />
    </Provider>
  </PersistGate>,
);
