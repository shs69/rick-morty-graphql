import "./index.css";

import { ApolloProvider } from "@apollo/client/react";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { client } from "./apollo/client";
import { LastPageProvider } from "./components/page-provider";
import { ThemeProvider } from "./components/theme-provider";

import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree, basepath: "/rick-morty-graphql" });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<ThemeProvider>
				<LastPageProvider>
					<ApolloProvider client={client}>
						<RouterProvider router={router} />
					</ApolloProvider>
				</LastPageProvider>
			</ThemeProvider>
		</StrictMode>,
	);
}
