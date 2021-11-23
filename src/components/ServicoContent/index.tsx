import React from 'react';
import { View, Image } from 'react-native';
import {
	Container,
	InfoContainer,
	NomeText,
	ProfissaoText,
	StatusContainer,
	StatusTitle,
	StatusInfoText,
} from './styles';
import fotoPerfil from '../../assets/design.png';

export function ServicoContent() {
	return (
		<Container style={{ elevation: 10 }}>
			<Image source={fotoPerfil} style={{ width: 80, height: 80 }} />
			<InfoContainer>
				<NomeText>Marcelo Almeida</NomeText>
				<ProfissaoText>Designer</ProfissaoText>

				<StatusContainer>
					<StatusTitle>Situação</StatusTitle>

					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							marginTop: 10,
						}}
					>
						<View
							style={{
								width: 22,
								height: 22,
								borderRadius: 20,
								borderWidth: 1,
								backgroundColor: '#fff',
								borderColor: '#35F568',
							}}
						/>
						<View
							style={{
								width: 60,
								height: 1,
								backgroundColor: '#707070',
							}}
						/>
						<View
							style={{
								width: 22,
								height: 22,
								borderRadius: 20,
								borderWidth: 1,
								backgroundColor: '#fff',
								borderColor: '#707070',
							}}
						/>
						<View
							style={{
								width: 60,
								height: 1,
								backgroundColor: '#707070',
							}}
						/>
						<View
							style={{
								width: 22,
								height: 22,
								borderRadius: 20,
								borderWidth: 1,
								backgroundColor: '#fff',
								borderColor: '#707070',
							}}
						/>
					</View>

					<View
						style={{
							flexDirection: 'row',
						}}
					>
						<StatusInfoText
							style={{
								position: 'absolute',
								left: -12,
							}}
						>
							Pendente
						</StatusInfoText>
						<StatusInfoText
							style={{
								position: 'absolute',
								right: 55,
							}}
						>
							Em Andamento
						</StatusInfoText>
						<StatusInfoText
							style={{
								position: 'absolute',
								right: -20,
							}}
						>
							Finalizado
						</StatusInfoText>
					</View>
				</StatusContainer>
			</InfoContainer>
		</Container>
	);
}
