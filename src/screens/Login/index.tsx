import React from 'react';
import { StatusBar, Text } from 'react-native';
import { Container, Title, Subtitle } from './styles';
import { Input } from '../../components/Input';
import { LoginButton, LoginButtonText } from './styles';

export function Login() {
	return (
		<Container>
			<StatusBar barStyle="dark-content" backgroundColor="#fff" />
			<Title> Login </Title>

			<Subtitle>Preencha seu login</Subtitle>
			<Input placeholder="E-mail" />
			<Input placeholder="Senha" secureTextEntry />
			<LoginButton activeOpacity={0.6}>
				<LoginButtonText> Entrar </LoginButtonText>
			</LoginButton>

			<Text style={{ textAlign: 'center' }}>Esqueci minha senha</Text>
		</Container>
	);
}
