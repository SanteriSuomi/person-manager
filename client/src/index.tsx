import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// Modify base Chakra UI popover component to make it more responsive
const theme = extendTheme({
	components: {
		Popover: {
			variants: {
				responsive: {
					popper: {
						maxWidth: "unset",
						width: "unset",
					},
				},
			},
		},
	},
});

ReactDOM.render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
