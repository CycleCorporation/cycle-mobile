import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text } from 'react-native';
import { Home } from '../screens/Home';
import { Ionicons, Foundation } from '@expo/vector-icons';
import { Servicos } from '../screens/Servicos';
import { Profile } from '../screens/Profile';
import { More } from '../screens/More';

const Tab = createBottomTabNavigator();

export function TabApp() {
	return (
		<Tab.Navigator
			initialRouteName="Home"
			screenOptions={{
				tabBarStyle: {
					position: 'absolute',
					elevation: 20,
					height: 54,
					borderTopStartRadius: 50,
					borderTopEndRadius: 50,
				},

				headerShown: false,
			}}
		>
			<Tab.Screen
				options={{
					tabBarIcon: ({ focused }) => (
						<Ionicons
							name="home-sharp"
							color={focused ? '#13C9EF' : '#b6b7b7'}
							size={20}
						/>
					),
					tabBarLabel: ({ focused }) => {
						return !focused && <Text style={styles.tabLabel}>Home</Text>;
					},
				}}
				name="Home"
				component={Home}
			/>
			<Tab.Screen
				options={{
					tabBarIcon: ({ focused }) => (
						<Ionicons
							name="grid-sharp"
							color={focused ? '#13C9EF' : '#b6b7b7'}
							size={20}
						/>
					),
					tabBarLabel: ({ focused }) => {
						return (
							!focused && <Text style={styles.tabLabel}>Meus Serviços</Text>
						);
					},
					headerShown: true,
				}}
				name="Meus Serviços"
				component={Servicos}
			/>
			<Tab.Screen
				options={{
					tabBarIcon: ({ focused }) => (
						<Ionicons
							name="person"
							color={focused ? '#13C9EF' : '#b6b7b7'}
							size={20}
						/>
					),
					tabBarLabel: ({ focused }) => {
						return !focused && <Text style={styles.tabLabel}>Perfil</Text>;
					},
				}}
				name="Profile"
				component={Profile}
			/>
			<Tab.Screen
				options={{
					tabBarIcon: ({ focused }) => (
						<Foundation
							name="indent-more"
							color={focused ? '#13C9EF' : '#b6b7b7'}
							size={22}
						/>
					),
					tabBarLabel: ({ focused }) => {
						return !focused && <Text style={styles.tabLabel}>Mais</Text>;
					},
				}}
				name="More"
				component={More}
			/>
		</Tab.Navigator>
	);
}

const styles = StyleSheet.create({
	tabLabel: {
		fontSize: 12,
		color: '#a1a1a1',
		paddingBottom: 4,
	},
});
