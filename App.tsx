import React from 'react';
import { Routes } from './src/routes';
import AppLoading from 'expo-app-loading';
import {
	useFonts,
	Roboto_400Regular,
	Roboto_500Medium,
	Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { AppProvider } from './src/hooks';

export default function App() {
	let [fontsLoaded] = useFonts({
		Roboto_700Bold,
		Roboto_400Regular,
		Roboto_500Medium,
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	} else {
		return (
			<AppProvider>
				<Routes />
			</AppProvider>
		);
	}
}
