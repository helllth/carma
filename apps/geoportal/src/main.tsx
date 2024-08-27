import * as ReactDOM from "react-dom/client";
import App from "./app/App";
import { Provider } from "react-redux";
import store from "./app/store";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { suppressReactCismapErrors } from "@carma-commons/utils";

const persistor = persistStore(store);

const router = createHashRouter([
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

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <PersistGate loading={null} persistor={persistor}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </PersistGate>,
);