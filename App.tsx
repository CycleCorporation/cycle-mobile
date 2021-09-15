import React from 'react';
import { Routes } from './src/routes';
import AppLoading from 'expo-app-loading';
import {
	useFonts,
	Roboto_400Regular,
	Roboto_500Medium,
} from '@expo-google-fonts/roboto';

export default function App() {
	let [fontsLoaded] = useFonts({
		Roboto_400Regular,
		Roboto_500Medium,
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	} else {
		return <Routes />;
	}
}
