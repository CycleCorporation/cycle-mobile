import React from 'react';
import { useRoute } from '@react-navigation/core';
import {
	Avaliation,
	AvaliationText,
	ButtonsContainer,
	ButtonText,
	Container,
	ContratarButton,
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
import { Image, Text } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { FontAwesome5 } from '@expo/vector-icons';

export const Profissional = () => {
	const { params } = useRoute<any>();

	const { item } = params;

	const imageUrl = 'http://localhost:3333/files';

	return (
		<Container showsVerticalScrollIndicator={false}>
			<ImageContainer>
				<Image
					source={{ uri: `${imageUrl}/${item.user.user_image}` }}
					style={{ width: 120, height: 120, borderRadius: 60 }}
				/>
				<NameTitle>{item.user.name}</NameTitle>
			</ImageContainer>
			<Avaliation>
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

			<DescriptionContainer>
				<DescriptionTitle>Descrição</DescriptionTitle>
				<DescriptionInput>
					<DescriptionText>{item.descricao}</DescriptionText>
				</DescriptionInput>
			</DescriptionContainer>

			<PrecoMedioContainer>
				<PrecoMedioTitle>Preço Médio do Serviço</PrecoMedioTitle>
				<PrecoMedioValue>{item.valorMedioServico}</PrecoMedioValue>
			</PrecoMedioContainer>

			<ButtonsContainer>
				<ContratarButton>
					<ButtonText>Contrate</ButtonText>
					<FontAwesome5 name="hand-holding-usd" size={28} color="white" />
				</ContratarButton>

				<WhatsappButton>
					<ButtonText>Negocie</ButtonText>
					<FontAwesome5 name="whatsapp" size={28} color="white" />
				</WhatsappButton>
			</ButtonsContainer>
		</Container>
	);
};
