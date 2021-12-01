import React, { useState, useEffect } from 'react';
import { Text, StatusBar, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import { api } from '../../services/api';
import { Entypo } from '@expo/vector-icons';
import {
	Container,
	Title,
	DescriptionContainer,
	DescriptionInput,
	DescriptionTitle,
	PrecoMedioInput,
	Button,
	ButtonText,
} from './styles';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputMasked } from '../../components/InputMasked';
import { useAuth } from '../../hooks/auth';
import { useNavigation } from '@react-navigation/core';
import { ActivityIndicator } from 'react-native-paper';

type Profissao = {
	id: string;
	nome: string;
};

type FormProps = {
	descricao: string;
	profissao: string;
	precoMedio: string;
};

export function CadastroPrestador() {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [items, setItems] = useState([{ label: '', value: '' }]);
	const { user, setPrestador_id } = useAuth();
	const navigation = useNavigation<any>();

	DropDownPicker.addTranslation('BR', {
		PLACEHOLDER: 'Selecione sua Profissão',
		SEARCH_PLACEHOLDER: '',
		NOTHING_TO_SHOW: '',
		SELECTED_ITEMS_COUNT_TEXT: '',
	});

	DropDownPicker.setLanguage('BR');

	useEffect(() => {
		async function isPrestador() {
			setLoading(true);
			try {
				const response = await api.get(`/prestador/user/${user.id}`);
				const prestador = response.data;

				if (prestador) {
					navigation.navigate('TabPrestador');
					setPrestador_id(prestador.id);
				}
			} catch (error) {
			} finally {
				setLoading(false);
			}
		}
		async function loadProfissoes() {
			const response = await api.get<Profissao[]>('/profissoes');

			const profissoes = response.data;

			const profissoesItems = profissoes.map((profissao) => ({
				label: profissao.nome,
				value: profissao.id,
			}));

			setItems(profissoesItems);
		}

		isPrestador();
		loadProfissoes();
	}, []);

	const schema = yup.object().shape({
		profissao: yup.string().required(),
		descricao: yup.string().required(),
		precoMedio: yup.string().required(),
	});

	const {
		register,
		setValue,
		handleSubmit,
		control,
		setError,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		reValidateMode: 'onSubmit',
	});

	const onSubmit = async ({ descricao, precoMedio, profissao }: FormProps) => {
		precoMedio = precoMedio.replace(/['$']/, '');
		precoMedio = precoMedio.replace(/['R']/, '');
		try {
			await api.post('/prestador', {
				user_id: user.id,
				descricao,
				valorMedioServico: precoMedio,
				profissao_id: profissao,
			});

			navigation.navigate('TabPrestador');
		} catch (error) {
			console.log(error);
			Alert.alert(
				'Erro',
				'Não foi possível se cadastrar como prestador. Tente novamente mais tarde',
			);
		}
	};

	useEffect(() => {
		register('profissao');
		register('descricao');
		register('precoMedio');
	}, [register]);

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: '#fff',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<StatusBar backgroundColor="#fff" barStyle="dark-content" />
			<Container>
				<Title>Seja um Prestador</Title>
				<Controller
					name="profissao"
					defaultValue=""
					control={control}
					render={({ field: { onChange, value } }) => (
						<DropDownPicker
							style={{
								backgroundColor: '#F2F2F2',
								borderWidth: 0,
								borderRadius: 18,
							}}
							labelStyle={{ color: '#4A4B4D', fontSize: 16 }}
							textStyle={{ color: '#707070', fontSize: 16 }}
							ArrowDownIconComponent={() => (
								<Entypo name="chevron-down" size={24} color="#00CDFF" />
							)}
							ArrowUpIconComponent={() => (
								<Entypo name="chevron-up" size={24} color="#00CDFF" />
							)}
							open={open}
							value={value}
							items={items}
							setOpen={setOpen}
							setValue={onChange}
							setItems={setItems}
						/>
					)}
				/>

				<DescriptionContainer>
					<DescriptionTitle>Descrição</DescriptionTitle>
					<Controller
						name="descricao"
						defaultValue=""
						control={control}
						render={({ field: { onChange, value } }) => (
							<DescriptionInput
								onChangeText={onChange}
								multiline
								value={value}
								numberOfLines={4}
								style={{maxWidth: 350}}
								textAlignVertical="top"
								placeholder="Fale um pouco sobre você e sua profissão"
							/>
						)}
					/>
				</DescriptionContainer>

				<DescriptionContainer style={{ marginTop: 2 }}>
					<DescriptionTitle style={{ marginLeft: 30 }}>
						Preço Médio
					</DescriptionTitle>
					<Controller
						name="precoMedio"
						defaultValue=""
						control={control}
						render={({ field: { onChange, value } }) => (
							<InputMasked
								errors={errors.precoMedio}
								keyboardType="decimal-pad"
								placeholder="O preço médio de suas atividades"
								type="money"
								options={{
									maskType: 'BRL',
								}}
								value={value}
								onChangeText={onChange}
							/>
						)}
					/>
				</DescriptionContainer>

				<Button onPress={handleSubmit(onSubmit)}>
					<ButtonText>Comece Agora!</ButtonText>
				</Button>
			</Container>
		</SafeAreaView>
	);
}
