import { useRoute } from '@react-navigation/core';
import React from 'react';
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

export function Profile() {
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
					<Image
						source={{ uri: 'https://github.com/Joo-Dias.png' }}
						style={{ width: 120, height: 120, borderRadius: 60 }}
					/>
					<EditProfile>
						<Text>
							Editar Perfil
							<Feather name="edit-2" size={15} color="#00cdff" />
						</Text>
					</EditProfile>
					<UserName>
						<Text>Olá João Dias</Text>
					</UserName>
					<SignOut>
						<Text>Sair</Text>
					</SignOut>
					<TextBox>
						<TextInput
							theme={{ colors: { primary: '#00cdff' } }}
							style={{ marginBottom: 15 }}
							value="João Dias"
							label="Nome"
						/>
						<TextInput
							style={{ marginBottom: 15 }}
							theme={{ colors: { primary: '#00cdff' } }}
							value="joaodias@gmail.com"
							label="Email"
						/>
						<TextInput
							theme={{ colors: { primary: '#00cdff' } }}
							style={{ marginBottom: 15 }}
							value="Travessa Samba da Rosa, 170"
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
							value="09091290-210931928"
							label="Número de telefone"
						/>
					</TextBox>
				</ImageContainer>
			</ScrollView>
		</SafeAreaView>
	);
}
