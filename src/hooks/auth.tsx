import React, {
	createContext,
	useCallback,
	useEffect,
	useState,
	useContext,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';

type User = {
	id: string;
	name: string;
	email: string;
	user_image: string;
};

type AuthState = {
	token: string;
	user: User;
};

type SignInCredentials = {
	email: string;
	password: string;
};

type AuthContextData = {
	user: User;
	loading: boolean;
	signIn(credentials: SignInCredentials): Promise<void>;
	signOut(): void;
	updateUser(user: User): Promise<void>;
	viewedOnboarding: any;
	setViewedOnboarding: any;
	checkOnboarding: () => void;
};

type AuthProviderProps = {
	children: React.ReactNode;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
	const [data, setData] = useState<AuthState>({} as AuthState);
	const [loading, setLoading] = useState(true);

	const [viewedOnboarding, setViewedOnboarding] = useState(false);

	const checkOnboarding = async () => {
		try {
			const value = await AsyncStorage.getItem('@viewedOnboarding');
			if (value !== null) {
				setViewedOnboarding(true);
			}
		} catch (error) {
			console.log('Error @checkOnboarding', error);
		}
	};

	useEffect(() => {
		async function loadStorageData(): Promise<void> {
			const [token, user] = await AsyncStorage.multiGet([
				'@Jobplus:token',
				'@Jobplus:user',
			]);
			if (token[1] && user[1]) {
				api.defaults.headers.authorization = `Bearer ${token[1]}`;

				setData({ token: token[1], user: JSON.parse(user[1]) });
			}

			setLoading(false);
		}
		checkOnboarding();
		loadStorageData();
	}, []);

	const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
		try {
			const response = await api.post('/sessions', {
				email,
				password,
			});
	
			const { token, user } = response.data;
	
			await AsyncStorage.multiSet([
				['@Jobplus:token', token],
				['@Jobplus:user', JSON.stringify(user)],
			]);
	
			api.defaults.headers.authorization = `Bearer ${token}`;
	
			setData({ token, user });		
		} catch (error) {
			console.log(error)
		}
	
	}, []);

	const signOut = useCallback(async () => {
		await AsyncStorage.multiRemove(['@Jobplus:token', '@Jobplus:user']);

		setData({} as AuthState);
	}, []);

	const updateUser = useCallback(
		async (user: User) => {
			await AsyncStorage.setItem('@Jobplus:user', JSON.stringify(user));

			setData({
				token: data.token,
				user: user,
			});
		},
		[setData, data.token],
	);

	return (
		<AuthContext.Provider
			value={{
				user: data.user,
				signIn,
				signOut,
				loading,
				updateUser,
				viewedOnboarding,
				setViewedOnboarding,
				checkOnboarding,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

function useAuth(): AuthContextData {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
}

export { AuthProvider, useAuth };
