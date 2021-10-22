import React, { useCallback } from 'react';
import { Alert, StatusBar, Text } from 'react-native';
import { Container, Title, Subtitle, ErrorText } from './styles';
import { Input } from '../../components/Input';
import { LoginButton, LoginButtonText } from './styles';
import { heightPixel } from '../../utils/pixelSize';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAuth } from '../../hooks/auth';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';

type LoginProps = {
	email: string;
	password: string;
};

export function Login() {
	const schema = yup.object().shape({
		email: yup
			.string()
			.required('E-mail obrigatório')
			.email('Digite um e-mail valído'),
		password: yup.string().required('Senha é obrigatória'),
	});

	const { signIn } = useAuth();
	const navigation = useNavigation<any>();

	const onSubmitLogin = useCallback(
		async ({ email, password }: LoginProps) => {
			try {
				await signIn({ email, password });
			} catch (error: any) {
				if (error.response.status === 500) {
					Alert.alert('Erro ao fazer login. Tente novamente');
				}
				Alert.alert('Erro', error.response.data.error);
			}
		},
		[signIn],
	);

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		reValidateMode: 'onSubmit',
	});

	return (
		<Container>
			<StatusBar barStyle="dark-content" backgroundColor="transparent" />
			<Title> Login </Title>

			<Subtitle>Preencha seu login</Subtitle>
			<Controller
				name="email"
				defaultValue=""
				control={control}
				render={({ field: { onChange, value } }) => (
					<Input
						errors={errors.email}
						value={value}
						onChangeText={onChange}
						returnKeyType="next"
						autoCapitalize="none"
						keyboardType="email-address"
						placeholder="E-mail"
					/>
				)}
			/>
			{errors.email && <ErrorText>{errors.email?.message} </ErrorText>}
			<Controller
				name="password"
				defaultValue=""
				control={control}
				render={({ field: { onChange, value } }) => (
					<Input
						errors={errors.password}
						value={value}
						onChangeText={onChange}
						placeholder="Senha"
						returnKeyType="send"
						secureTextEntry
					/>
				)}
			/>
			{errors.password && <ErrorText>{errors.password?.message} </ErrorText>}

			<LoginButton onPress={handleSubmit(onSubmitLogin)} activeOpacity={0.6}>
				<LoginButtonText> Entrar </LoginButtonText>
			</LoginButton>

			<Text
				style={{
					paddingTop: heightPixel(30),
					textAlign: 'center',
					color: '#3760FF',
					fontSize: 15,
				}}
			>
				Esqueci minha senha
			</Text>
			<Button
				onPress={() => navigation.navigate('Cadastro')}
				mode="outlined"
				color="#3760FF"
				uppercase={false}
				icon="logout"
				style={{ marginTop: 20, marginHorizontal: 100 }}
			>
				Crie uma conta
			</Button>
		</Container>
	);
}
