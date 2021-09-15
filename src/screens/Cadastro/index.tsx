import React, { useState, useEffect, useRef } from 'react';
import {
	Alert,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StatusBar,
	Text,
	TextInput,
} from 'react-native';
import {
	Container,
	Title,
	Subtitle,
	CriarContaButton,
	CriarContaButtonText,
	FooterText,
	ErrorText,
} from './styles';
import { Input } from '../../components/Input';
import { InputMasked } from '../../components/InputMasked';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { api } from '../../services/api';
import { yupResolver } from '@hookform/resolvers/yup';

interface FormProps {
	name: string;
	email: string;
	telephone: string;
	cep: string;
	cpf: string;
	password: string;
	password_confirmation?: string;
	age: number;
}

export function Cadastro() {
	const schema = yup.object().shape({
		name: yup.string().required('Nome é obrigatório'),
		email: yup
			.string()
			.required('E-mail obrigatório')
			.email('Digite um e-mail valído'),
		telephone: yup.string().required('Telefone é obrigatório'),
		cep: yup.string().required('CEP é obrigatório'),
		cpf: yup.string().required('CPF é obrigatório'),
		age: yup.number().required('Idade é obrigatória'),
		password: yup.string().required('Senha é obrigatória'),
		password_confirmation: yup
			.string()
			.required('Confirmação é obrigatória')
			.oneOf([yup.ref('password'), null], 'Confirmação incorreta'),
	});

	const {
		register,
		setValue,
		handleSubmit,
		control,
		clearErrors,

		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data: FormProps) => {
		data.cep = data.cep.replace(/[^\d]+/g, ''); // cep virar string
		data.telephone = data.telephone.replace(/[^\d]+/g, '');
		data.cpf = data.cpf.replace(/[^\d]+/g, '');

		delete data.password_confirmation; //refactor
		console.log(data);

		try {
			await api.post('/users', data);

			Alert.alert('Cadastro realizado com sucesso!');
		} catch (error) {
			console.log(error);
			Alert.alert('Não foi possível realizar o cadastro. Tente novamente.');
		}
	};

	useEffect(() => {
		register('name');
		register('email');
		register('telephone');
		register('cep');
		register('cpf');
		register('age');
		register('password');
		register('password_confirmation');
	}, [register]);
	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			enabled
		>
			<StatusBar barStyle="dark-content" backgroundColor="#fff" />
			<ScrollView showsVerticalScrollIndicator={false}>
				<Container>
					<Title>Criar Conta</Title>
					<Subtitle>Preencha os dados para criar uma conta</Subtitle>

					<>
						<Input
							errors={errors.name}
							returnKeyType="next"
							autoCapitalize="words"
							placeholder="Nome"
							onChangeText={(text) => {
								setValue('name', text);
								clearErrors('name');
							}}
						/>
						{errors.name && <ErrorText>{errors.name?.message} </ErrorText>}
						<Input
							errors={errors.email}
							returnKeyType="next"
							autoCapitalize="none"
							autoCorrect={false}
							keyboardType="email-address"
							placeholder="E-mail"
							onChangeText={(text) => {
								setValue('email', text);
								clearErrors('email');
							}}
						/>
						{errors.email && <ErrorText>{errors.email?.message} </ErrorText>}
						<Controller
							name="telephone"
							defaultValue=""
							control={control}
							render={({ field: { onChange, value } }) => (
								<InputMasked
									errors={errors.telephone}
									keyboardType="number-pad"
									placeholder="Número de Celular"
									type="cel-phone"
									options={{
										withDDD: true,
										maskType: 'BRL',
										dddMask: '(99)',
									}}
									value={value}
									onChangeText={onChange}
								/>
							)}
						/>
						{errors.telephone && (
							<ErrorText>{errors.telephone?.message} </ErrorText>
						)}

						<Controller
							name="cep"
							defaultValue=""
							control={control}
							render={({ field: { onChange, value } }) => (
								<InputMasked
									errors={errors.cep}
									keyboardType="number-pad"
									placeholder="CEP"
									type="custom"
									options={{
										mask: '99999-999',
									}}
									value={value}
									onChangeText={onChange}
								/>
							)}
						/>
						{errors.cep && <ErrorText>{errors.cep?.message} </ErrorText>}

						<Controller
							name="cpf"
							defaultValue=""
							control={control}
							render={({ field: { onChange, value } }) => (
								<InputMasked
									errors={errors.cpf}
									keyboardType="number-pad"
									type="cpf"
									placeholder="CPF"
									value={value}
									onChangeText={onChange}
								/>
							)}
						/>
						{errors.cpf && <ErrorText>{errors.cpf?.message} </ErrorText>}
						<Input
							errors={errors.age}
							keyboardType="number-pad"
							maxLength={2}
							placeholder="Idade"
							onChangeText={(text) => {
								setValue('age', text);
								clearErrors('age');
							}}
						/>
						{errors.age && <ErrorText>{errors.age?.message} </ErrorText>}

						<Input
							errors={errors.password}
							secureTextEntry
							placeholder="Senha"
							onChangeText={(text) => {
								setValue('password', text);
								clearErrors('password');
							}}
						/>
						{errors.password && (
							<ErrorText>{errors.password?.message} </ErrorText>
						)}

						<Input
							errors={errors.password_confirmation}
							secureTextEntry
							placeholder="Confirme a Senha"
							onChangeText={(text) => {
								setValue('password_confirmation', text);
								clearErrors('password_confirmation');
							}}
						/>
						{errors.password_confirmation && (
							<ErrorText>{errors.password_confirmation?.message} </ErrorText>
						)}
						<CriarContaButton
							onPress={handleSubmit(onSubmit)}
							activeOpacity={0.6}
						>
							<CriarContaButtonText>Criar conta</CriarContaButtonText>
						</CriarContaButton>
					</>
					<FooterText>
						Já tem uma conta ?
						<Text style={{ color: '#3760FF' }}> Faça Login aqui !</Text>
					</FooterText>
				</Container>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
