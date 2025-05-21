import { GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { authProvider } from "./authProvider";
import { routes } from "@/shared/use/routes";
import Index from "@/shared/pages/Index";
import PublicCollections from "@/shared/pages/PublicCollections";
import CollectorProfile from "@/shared/pages/CollectorProfile";
import { gqlResources } from "@/shared/graphql/graphqlRoutes";
import { mockGraphQLProvider } from "@/shared/graphql/graphqlProviderMock";
import { customGraphQLProvider } from "@/shared/graphql/graphqlProvider";
import { useEffect } from "react";
import Community from "./shared/pages/Community";
// const API_URL = "https://dev.acabaramos.com/graphql-local-php";


console.log({ gqlResources })
function App() {

  const providers = {
    default: customGraphQLProvider,
    mock: mockGraphQLProvider,
  };

  // useRefineDebug(providers);

  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <DevtoolsProvider>
          <Refine
            dataProvider={providers}
            routerProvider={routerBindings}
            authProvider={authProvider}
            resources={gqlResources}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              useNewQueryKeys: true,
              projectId: "qzLsZ0-okVk4i-RX9UB3",
            }}
          >
            <Routes>
              <Route index path={routes.home} element={<Index />} />
              <Route path={routes.collections} element={<PublicCollections />} />
              <Route path={routes.collector} element={<CollectorProfile />} />
              <Route path={routes.community} element={<Community />} />
            </Routes>
            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
          <DevtoolsPanel />
        </DevtoolsProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;

function useRefineDebug(dataProviderMap: any) {
  useEffect(() => {
    console.group("🔍 Refine Resources & Providers");

    gqlResources.forEach((r) => {
      const providerName = r.meta?.dataProviderName || "default";
      console.log(`🔸 Resource: ${r.name} → Provider: ${providerName}`);
    });

    const availableProviders = Object.keys(dataProviderMap);
    console.log("📦 Available Data Providers:", availableProviders);
    console.groupEnd();
  }, []);
}