import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StartScreen } from '../screens/StartScreen';
import { Login } from '../screens/Login';
import { Cadastro } from '../screens/Cadastro';

const Stack = createStackNavigator();

export function StackRoutes() {
	return (
		<>
			<Stack.Navigator
				initialRouteName="StartScreen"
				defaultScreenOptions={{
					headerMode: 'float',
				}}
				screenOptions={{ headerShown: false }}
			>
				<Stack.Screen name="StartScreen" component={StartScreen} />
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="Cadastro" component={Cadastro} />
			</Stack.Navigator>
		</>
	);
}
