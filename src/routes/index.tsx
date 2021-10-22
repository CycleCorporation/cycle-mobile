import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthRoutes } from './auth.routes';
import { FormStepContextProvider } from '../contexts/FormStepContext';
import { View, ActivityIndicator } from 'react-native';

import { useAuth } from '../hooks/auth';
import { AppRoutes } from './app.routes';

export function Routes() {
	const { user, loading } = useAuth();

	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator color="#3760FF" size="large" />
			</View>
		);
	}

	return (
		<NavigationContainer>
			<FormStepContextProvider>
				{user ? <AppRoutes /> : <AuthRoutes />}
			</FormStepContextProvider>
		</NavigationContainer>
	);
}
