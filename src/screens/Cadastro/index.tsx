import React, { useRef } from 'react';
import { StatusBar, ScrollView, Text, TextInput } from 'react-native';
import {
	Container,
	Title,
	Subtitle,
	CriarContaButton,
	CriarContaButtonText,
	FooterText,
} from './styles';
import { Form } from '@unform/mobile';
import Input from '../../components/Input';
import { FormHandles } from '@unform/core';

export function Cadastro() {
	const formRef = useRef<FormHandles>(null);

	return (
		<ScrollView>
			<Container>
				<StatusBar barStyle="dark-content" backgroundColor="transparent" />
				<Title>Criar Conta</Title>
				<Subtitle>Preencha os dados para criar uma conta</Subtitle>
				<Form ref={formRef} onSubmit={() => {}}>
					<Input
						returnKeyType="next"
						autoCapitalize="words"
						placeholder="Nome"
					/>
					<Input
						returnKeyType="next"
						autoCorrect={false}
						keyboardType="email-address"
						placeholder="Email"
					/>
					<Input
						returnKeyType="next"
						keyboardType="number-pad"
						placeholder="Número de Celular"
					/>
					<Input
						returnKeyType="next"
						keyboardType="number-pad"
						placeholder="CEP"
					/>
					<Input
						returnKeyType="next"
						keyboardType="number-pad"
						placeholder="CPF"
					/>
					<Input returnKeyType="next" secureTextEntry placeholder="Senha" />
					<Input
						returnKeyType="send"
						secureTextEntry
						placeholder="Confirme a Senha"
					/>
					<CriarContaButton activeOpacity={0.6}>
						<CriarContaButtonText>Criar conta</CriarContaButtonText>
					</CriarContaButton>
				</Form>
				<FooterText>
					Já tem uma conta ?
					<Text style={{ color: '#3760FF' }}> Faça Login aqui !</Text>
				</FooterText>
			</Container>
		</ScrollView>
	);
}
