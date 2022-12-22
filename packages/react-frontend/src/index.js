import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Windmill } from "@windmill/react-ui";
import "./assets/css/custom.css";
import "./assets/css/tailwind.css";
import "./assets/css/tailwind.output.css";
import "@pathofdev/react-tag-input/build/index.css";
import App from "./App";
import myTheme from "./assets/theme/myTheme";
import { SidebarProvider } from "./context/SidebarContext";
import ThemeSuspense from "./components/theme/ThemeSuspense";

/**
 *  wagmi test
 */

import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { AdminProvider } from "./context/AdminContext";
import { StateMachineProvider } from "little-state-machine";

const { provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider(),
]);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

ReactDOM.render(
  <AdminProvider>
    <WagmiConfig client={client}>
      <SidebarProvider>
        <Suspense fallback={<ThemeSuspense />}>
          <Windmill theme={myTheme} dark={false}>
            <StateMachineProvider>
              <App />
            </StateMachineProvider>
          </Windmill>
        </Suspense>
      </SidebarProvider>
    </WagmiConfig>
  </AdminProvider>,
  document.getElementById("root")
);
