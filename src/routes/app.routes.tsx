import React from 'react';
import {
	CardStyleInterpolators,
	createStackNavigator,
} from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../hooks/auth';
import { OnBoarding } from '../components/OnBoarding';
import { TabApp } from './tab.app.routes';
import { Search } from '../screens/Search';
import { SobreNos } from '../screens/SobreNos';
import { TermoDeUso } from '../screens/TermoDeUso';
import { Profissional } from '../screens/Profissional';
import { Categoria } from '../screens/Categoria';
import { OptionScreen } from '../screens/OptionScreen';
import { CadastroPrestador } from '../screens/CadastroPrestador';
import { PrestadorHome } from '../screens/PrestadorHome';
import { TabPrestador } from './tab.prestador.routes';

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
				headerBackImage: () => (
					<Ionicons size={30} name="chevron-back-sharp" color="#828282" />
				),
			}}
			initialRouteName={viewedOnboarding ? `OptionScreen` : `OnBoarding`}
		>
			<Stack.Screen name="TabApp" component={TabApp} />
			<Stack.Screen name="TabPrestador" component={TabPrestador} />
			<Stack.Screen name="OptionScreen" component={OptionScreen} />
			<Stack.Screen name="OnBoarding" component={OnBoarding} />
			<Stack.Screen
				name="Search"
				component={Search}
				options={{
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
			/>

			<Stack.Screen
				name="Profissional"
				component={Profissional}
				options={{
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
					headerShown: true,
					headerTitle: 'Profissional',
					headerTitleStyle: {
						color: '#4A4B4D',
						fontFamily: 'Roboto_400Regular',
						fontSize: 24,
					},
				}}
			/>
			<Stack.Screen
				name="SobreNos"
				component={SobreNos}
				options={{
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
					headerShown: true,
					headerTitle: 'Sobre Nós',
				}}
			/>
			<Stack.Screen
				name="TermoDeUso"
				component={TermoDeUso}
				options={{
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
					headerShown: true,
					headerTitle: 'Termos De Uso',
				}}
			/>

			<Stack.Screen
				name="Categoria"
				component={Categoria}
				options={{
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
			/>

			<Stack.Screen
				name="CadastroPrestador"
				component={CadastroPrestador}
				options={{
					headerShown: true,
					headerTitle: '',
				}}
			/>

			<Stack.Screen name="PrestadorHome" component={PrestadorHome} />
		</Stack.Navigator>
	);
}
