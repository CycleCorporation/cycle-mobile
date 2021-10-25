import React from 'react';
import {
	CardStyleInterpolators,
	createStackNavigator,
} from '@react-navigation/stack';
import { useAuth } from '../hooks/auth';
import { OnBoarding } from '../components/OnBoarding';
import { TabApp } from './tab.app.routes';
import { Search } from '../screens/Search';

const Stack = createStackNavigator();

export function AppRoutes() {
	const { viewedOnboarding } = useAuth();

	return (
		<Stack.Navigator
			defaultScreenOptions={{
				headerMode: 'float',
			}}
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName={viewedOnboarding ? `TabApp` : `OnBoarding`}
		>
			<Stack.Screen name="TabApp" component={TabApp} />
			<Stack.Screen name="OnBoarding" component={OnBoarding} />
			<Stack.Screen
				name="Search"
				component={Search}
				options={{
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
			/>
		</Stack.Navigator>
	);
}
