import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../hooks/auth';
import { OnBoarding } from '../components/OnBoarding';
import { TabApp } from './tab.app.routes';

const Stack = createStackNavigator();

export function AppRoutes() {
	const { viewedOnboarding } = useAuth();

	return (
		<Stack.Navigator
			defaultScreenOptions={{
				headerMode: 'float',
			}}
			screenOptions={{ headerShown: false }}
			initialRouteName={viewedOnboarding ? `TabApp` : `OnBoarding`}
		>
			<Stack.Screen name="TabApp" component={TabApp} />
			<Stack.Screen name="OnBoarding" component={OnBoarding} />
		</Stack.Navigator>
	);
}
