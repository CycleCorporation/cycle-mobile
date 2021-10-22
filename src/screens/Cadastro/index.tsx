import React, { useState, useEffect, useContext } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StatusBar,
	Text,
} from 'react-native';
import {
	Container,
	Title,
	Subtitle,
	CriarContaButton,
	CriarContaButtonText,
	FooterText,
	ErrorText,
	ButtonWrapper,
} from './styles';
import { Input } from '../../components/Input';
import { InputMasked } from '../../components/InputMasked';
import { Controller } from 'react-hook-form';
import { FormStep } from '../../components/FormStep';
import { Step } from '../../components/Step';
import { FormStepContext } from '../../contexts/FormStepContext';
import { Button } from 'react-native-paper';
import { apiBuscaCEP } from '../../services/api';
import { useNavigation } from '@react-navigation/core';
import { ValidarCPF } from '../../utils/validarCPF';

export function Cadastro() {
	const {
		steps,
		setStep,
		register,
		errors,
		control,
		setValue,
		handleSubmit,
		onSubmit,
		clearErrors,
		handleNextStep,
		reset,
		setError,
	} = useContext(FormStepContext);

	const navigation = useNavigation<any>();
	const handleValidarCPF = (cpf: string) => {
		cpf = cpf.replace(/[^\d]+/g, '');
		const cpfValido = ValidarCPF(cpf);

		if (!cpfValido) {
			setError('cpf', { message: 'CPF invalído, tente novamente.' });
		} else {
			clearErrors('cpf');
		}
	};

	const hanleSearchCEP = async (cep: string) => {
		if (cep && cep.length === 9) {
			const { data } = await apiBuscaCEP.get(`${cep}/json`);

			if (data.erro) {
				setError('cep', { message: 'CEP invalído. Tente outro CEP' });
			} else {
				clearErrors();
			}
			setValue('logradouro', data.logradouro);
			setValue('bairro', data.bairro);
			setValue('localidade', data.localidade);
			setValue('uf', data.uf);
		}
	};

	useEffect(() => {
		setStep(1);
		reset();
		register('name');
		register('email');
		register('telephone');
		register('cep');
		register('logradouro');
		register('complemento');
		register('bairro');
		register('localidade');
		register('uf');
		register('cpf');
		register('age');
		register('password');
		register('password_confirmation');
	}, [register]);
	return (
		<KeyboardAvoidingView
			style={{ flex: 1, backgroundColor: '#fff' }}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			enabled
		>
			<StatusBar barStyle="dark-content" backgroundColor="#fff" />
			<ScrollView
				contentContainerStyle={[
					{
						flex: steps === 2 ? 0 : 1,
						justifyContent: 'center',
					},
				]}
				showsVerticalScrollIndicator={false}
			>
				<Container>
					<>
						<FormStep>
							{steps === 1 && (
								<Step>
									<Title>Criar Conta</Title>
									<Subtitle>Preencha os dados para criar uma conta</Subtitle>
									<Controller
										name="name"
										defaultValue=""
										control={control}
										render={({ field: { onChange, value } }) => (
											<Input
												errors={errors.name}
												returnKeyType="next"
												autoCapitalize="words"
												placeholder="Nome"
												value={value}
												onChangeText={onChange}
											/>
										)}
									></Controller>

									{errors.name && (
										<ErrorText>{errors.name?.message} </ErrorText>
									)}
									<Controller
										name="email"
										defaultValue=""
										control={control}
										render={({ field: { onChange, value } }) => (
											<Input
												errors={errors.email}
												returnKeyType="next"
												autoCapitalize="none"
												autoCorrect={false}
												keyboardType="email-address"
												placeholder="E-mail"
												value={value}
												onChangeText={onChange}
											/>
										)}
									></Controller>

									{errors.email && (
										<ErrorText>{errors.email?.message} </ErrorText>
									)}
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
								</Step>
							)}

							{steps === 2 && (
								<Step>
									<Title>Endereço</Title>
									<Subtitle>Preencha o CEP para buscar as informações</Subtitle>
									<Controller
										name="cep"
										defaultValue=""
										control={control}
										render={({ field: { onChange, value } }) => (
											<InputMasked
												onEndEditing={() => hanleSearchCEP(value)}
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
										name="logradouro"
										defaultValue=""
										control={control}
										render={({ field: { onChange, value } }) => (
											<Input
												errors={errors.logradouro}
												placeholder="Logradouro"
												value={value}
												returnKeyType="next"
												autoCapitalize="words"
												onChangeText={onChange}
											/>
										)}
									/>
									{errors.logradouro && (
										<ErrorText>{errors.logradouro?.message} </ErrorText>
									)}

									<Controller
										name="bairro"
										defaultValue=""
										control={control}
										render={({ field: { onChange, value } }) => (
											<Input
												errors={errors.bairro}
												placeholder="Bairro"
												value={value}
												returnKeyType="next"
												autoCapitalize="words"
												onChangeText={onChange}
											/>
										)}
									/>
									{errors.bairro && (
										<ErrorText>{errors.bairro?.message} </ErrorText>
									)}

									<Controller
										name="complemento"
										defaultValue=""
										control={control}
										render={({ field: { onChange, value } }) => (
											<Input
												errors={errors.complemento}
												placeholder="Complemento"
												value={value}
												returnKeyType="next"
												autoCapitalize="words"
												onChangeText={onChange}
											/>
										)}
									/>
									{errors.complemento && (
										<ErrorText>{errors.complemento?.message} </ErrorText>
									)}

									<Controller
										name="localidade"
										defaultValue=""
										control={control}
										render={({ field: { onChange, value } }) => (
											<Input
												errors={errors.localidade}
												placeholder="Cidade"
												value={value}
												returnKeyType="next"
												autoCapitalize="words"
												onChangeText={onChange}
											/>
										)}
									/>
									{errors.localidade && (
										<ErrorText>{errors.localidade?.message} </ErrorText>
									)}

									<Controller
										name="uf"
										defaultValue=""
										control={control}
										render={({ field: { onChange, value } }) => (
											<Input
												errors={errors.uf}
												placeholder="UF"
												value={value}
												returnKeyType="next"
												maxLength={2}
												onChangeText={onChange}
												autoCapitalize="characters"
											/>
										)}
									/>
									{errors.uf && <ErrorText>{errors.uf?.message} </ErrorText>}
								</Step>
							)}

							{steps === 3 && (
								<Step>
									<Title>Informações Pessoais</Title>
									<Subtitle>Preencha suas informações pessoais</Subtitle>
									<Controller
										name="cpf"
										defaultValue=""
										control={control}
										render={({ field: { onChange, value } }) => (
											<InputMasked
												onEndEditing={() => handleValidarCPF(value)}
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
									<Controller
										name="age"
										defaultValue=""
										control={control}
										render={({ field: { onChange, value } }) => (
											<Input
												errors={errors.age}
												keyboardType="number-pad"
												maxLength={2}
												placeholder="Idade"
												value={value}
												onChangeText={onChange}
											/>
										)}
									/>

									{errors.age && <ErrorText>{errors.age?.message} </ErrorText>}
								</Step>
							)}

							{steps === 4 && (
								<Step>
									<Title>Segurança</Title>
									<Subtitle>Crie uma senha segura</Subtitle>
									<Controller
										name="password"
										defaultValue=""
										control={control}
										render={({ field: { onChange, value } }) => (
											<Input
												errors={errors.password}
												secureTextEntry
												placeholder="Senha"
												value={value}
												onChangeText={onChange}
											/>
										)}
									/>
									{errors.password && (
										<ErrorText>{errors.password?.message} </ErrorText>
									)}
									<Controller
										name="password_confirmation"
										defaultValue=""
										control={control}
										render={({ field: { onChange, value } }) => (
											<Input
												errors={errors.password_confirmation}
												secureTextEntry
												placeholder="Confirme a Senha"
												value={value}
												onChangeText={onChange}
											/>
										)}
									/>

									{errors.password_confirmation && (
										<ErrorText>
											{errors.password_confirmation?.message}
										</ErrorText>
									)}
									<CriarContaButton
										onPress={handleSubmit(onSubmit)}
										activeOpacity={0.6}
									>
										<CriarContaButtonText>Criar conta</CriarContaButtonText>
									</CriarContaButton>
								</Step>
							)}

							<ButtonWrapper
								style={steps === 1 && { justifyContent: 'flex-end' }}
							>
								{steps !== 1 && (
									<Button
										onPress={() => setStep((oldValue) => oldValue - 1)}
										icon="arrow-left"
										mode="outlined"
										color="#3760FF"
									>
										<Text>Anterior</Text>
									</Button>
								)}
								{steps <= 3 && (
									<Button
										onPress={handleSubmit(onSubmit, handleNextStep)}
										icon="arrow-right"
										mode="outlined"
										color="#3760FF"
									>
										<Text>Próximo</Text>
									</Button>
								)}
							</ButtonWrapper>
						</FormStep>

						{steps === 1 && (
							<FooterText>
								Já tem uma conta ?
								<Text
									onPress={() => navigation.navigate('Login')}
									style={{ color: '#3760FF' }}
								>
									{` `}Faça Login aqui !
								</Text>
							</FooterText>
						)}
					</>
				</Container>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
