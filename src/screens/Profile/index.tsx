import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
	Title,
	ImageContainer,
	UserName,
	EditProfile,
	SignOut,
	TextBox,
} from './styles';

import { TextInput } from 'react-native-paper';

import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';
import { ipConfig } from '../../utils/ipVariable';
import { FontAwesome5 } from '@expo/vector-icons';

type UserProps = {
	id: string;
	name: string;
	email: string;
	logradouro: string;
	telephone: string;
	user_image: string;
};

export function Profile() {
	const { user } = useAuth();
	const [data, setData] = useState<UserProps>({} as UserProps);

	useEffect(() => {
		async function loadUser() {
			try {
				const response = await api.get(`/users/${user.id}`);
				setData(response.data);
				console.log(response.data);
			} catch (error) {
				console.log(error);
			}
		}

		loadUser();
	}, []);
	return (
		<SafeAreaView>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Title
					style={{
						borderWidth: 2,
						borderBottomColor: '#b5b5b5',
						borderTopColor: 'transparent',
						borderLeftColor: 'transparent',
						borderRightColor: 'transparent',
					}}
				>
					Perfil
				</Title>
				<ImageContainer style={{ paddingBottom: 50 }}>
					{data.user_image ? (
						<Image
							source={{ uri: `http://${ipConfig}/files/${data.user_image}` }}
							style={{ width: 120, height: 120, borderRadius: 60 }}
						/>
					) : (
						<View style={{ padding: 14 }}>
							<FontAwesome5 name="user-alt" size={60} />
						</View>
					)}
					<EditProfile>
						<Text>
							Editar Perfil
							<Feather name="edit-2" size={15} color="#00cdff" />
						</Text>
					</EditProfile>
					<UserName>
						<Text>Olá {data.name}</Text>
					</UserName>
					<SignOut>
						<Text>Sair</Text>
					</SignOut>
					<TextBox>
						<TextInput
							theme={{ colors: { primary: '#00cdff' } }}
							style={{ marginBottom: 15 }}
							value={data.name}
							label="Nome"
						/>
						<TextInput
							style={{ marginBottom: 15 }}
							theme={{ colors: { primary: '#00cdff' } }}
							value={data.email}
							label="Email"
						/>
						<TextInput
							theme={{ colors: { primary: '#00cdff' } }}
							style={{ marginBottom: 15 }}
							value={data.logradouro}
							label="Endereço"
						/>
						<TextInput
							theme={{ colors: { primary: '#00cdff' } }}
							style={{ marginBottom: 15 }}
							value="*********"
							label="Senha"
						/>
						<TextInput
							theme={{ colors: { primary: '#00cdff' } }}
							style={{ marginBottom: 15 }}
							value="*********"
							label="Confirmar Senha"
						/>
						<TextInput
							theme={{ colors: { primary: '#00cdff' } }}
							style={{ marginBottom: 15 }}
							value={data.telephone}
							label="Número de telefone"
						/>
					</TextBox>
				</ImageContainer>
			</ScrollView>
		</SafeAreaView>
	);
}
