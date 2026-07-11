// components
import Loader from "./Components/HOC/Loader";

// root-router
import RootRouter from "./Routes/RootRouter";

// store
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { store, persistor } from "./Redux/Store";

// utils
import { SnackbarUtilConfig } from "./Shared/Snackbar";

// libs
import { SnackbarProvider } from "notistack";
import { SkeletonTheme } from "react-loading-skeleton";

function App() {

	return (
		<Provider store={store}>
			<SnackbarProvider
				anchorOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
				maxSnack={3}
			>
				<SkeletonTheme baseColor="" highlightColor="#f1dde2">
					<SnackbarUtilConfig />
					<Loader />
					<PersistGate persistor={persistor}>
						<RootRouter />
					</PersistGate>
				</SkeletonTheme>
			</SnackbarProvider>
		</Provider>
	);
}

export default App;