import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import {
	Avaliation,
	AvaliationText,
	ButtonsContainer,
	ButtonText,
	Container,
	ContratarButton,
	ContratarModalButton,
	DescriptionContainer,
	DescriptionInput,
	DescriptionText,
	DescriptionTitle,
	ImageContainer,
	NameTitle,
	PrecoMedioContainer,
	PrecoMedioTitle,
	PrecoMedioValue,
	WhatsappButton,
} from './styles';
import { Image, Linking, Text, View, TextInput, Alert } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { FontAwesome5 } from '@expo/vector-icons';
import { ipConfig } from '../../utils/ipVariable';
import { Modal } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { api } from '../../services/api';
import { useAuth } from '../../hooks/auth';

export const Profissional = () => {
	const { params } = useRoute<any>();
	const [modalVisible, setModalVisible] = useState(false);
	const { user } = useAuth();
	const navigation = useNavigation<any>();

	const { item } = params;

	const imageUrl = `http://${ipConfig}/files`;
	function handleLinkToWhatsapp() {
		Linking.openURL(`whatsapp://send?phone=55${item.user.telephone}`);
	}

	async function handleNegociar() {
		setModalVisible((value) => !value);
	}

	const schema = Yup.object().shape({
		nomeServico: Yup.string().required(),
	});

	const {
		register,
		handleSubmit,
		control,
		setError,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		reValidateMode: 'onSubmit',
	});

	const onSubmit = async (data) => {
		try {
			await api.post('/servico/contratar', {
				user_id: user.id,
				prestador_id: item.id,
				nomeServico: data.nomeServico,
			});

			setModalVisible(false);
			navigation.navigate('Meus Serviços');
		} catch (error) {
			Alert.alert(
				'Erro',
				'Não foi possível contratar o serviço, tente novamente.',
			);
		}
	};

	useEffect(() => {
		register('nomeServico');
	}, [register]);

	return (
		<>
			<Container style={{ zIndex: 2 }} showsVerticalScrollIndicator={false}>
				<Modal
					onDismiss={() => setModalVisible(false)}
					contentContainerStyle={{
						backgroundColor: '#fff',
						zIndex: 10,
						margin: 20,
						padding: 30,
						borderRadius: 20,
					}}
					visible={modalVisible}
				>
					<View style={{ justifyContent: 'center', alignItems: 'center' }}>
						<Text
							style={{
								textAlign: 'center',
								color: '#4A4B4D',
								fontSize: 15,
								marginBottom: 20,
								fontFamily: 'Roboto_700Bold',
							}}
						>
							Tenha certeza que negociou os valores antes de contratar o
							serviço.
						</Text>
						<Text
							style={{ textAlign: 'center', color: '#4A4B4D', fontSize: 15 }}
						>
							Insira o serviço no qual deseja contratar
						</Text>
						<Controller
							name="nomeServico"
							defaultValue=""
							control={control}
							render={({ field: { onChange, value } }) => (
								<TextInput
									style={{
										backgroundColor: '#f2f2f2',
										color: '#7c7d7e',
										marginVertical: 18,
										padding: 12,
										borderRadius: 10,
										width: 230,
									}}
									onChangeText={onChange}
									value={value}
									placeholder="Ex: consertar chuveiro"
								/>
							)}
						/>

						<ContratarModalButton
							onPress={handleSubmit(onSubmit)}
							style={{ width: 180, height: 50 }}
							activeOpacity={0.6}
						>
							<ButtonText>Contratar</ButtonText>
						</ContratarModalButton>
					</View>
				</Modal>
				<ImageContainer style={{ zIndex: -1 }}>
					<Image
						source={{ uri: `${imageUrl}/${item.user.user_image}` }}
						style={{ width: 120, height: 120, borderRadius: 60 }}
					/>
					<NameTitle>{item.user.name}</NameTitle>
				</ImageContainer>
				<Avaliation style={{ zIndex: -1 }}>
					<AvaliationText>Classificação</AvaliationText>

					<AirbnbRating
						defaultRating={3}
						starContainerStyle={{
							paddingTop: 10,
						}}
						isDisabled
						selectedColor="#e0b320"
						size={34}
						showRating={false}
					/>
				</Avaliation>

				<DescriptionContainer style={{ zIndex: -1 }}>
					<DescriptionTitle>Descrição</DescriptionTitle>
					<DescriptionInput>
						<DescriptionText>{item.descricao}</DescriptionText>
					</DescriptionInput>
				</DescriptionContainer>

				<PrecoMedioContainer style={{ zIndex: -1 }}>
					<PrecoMedioTitle>Preço Médio do Serviço</PrecoMedioTitle>
					<PrecoMedioValue>{item.valorMedioServico}</PrecoMedioValue>
				</PrecoMedioContainer>

				<ButtonsContainer style={{ zIndex: -1 }}>
					<ContratarButton onPress={handleNegociar}>
						<ButtonText>Contrate</ButtonText>
						<FontAwesome5 name="hand-holding-usd" size={28} color="white" />
					</ContratarButton>

					<WhatsappButton onPress={handleLinkToWhatsapp}>
						<ButtonText>Negocie</ButtonText>
						<FontAwesome5 name="whatsapp" size={28} color="white" />
					</WhatsappButton>
				</ButtonsContainer>
			</Container>
		</>
	);
};
