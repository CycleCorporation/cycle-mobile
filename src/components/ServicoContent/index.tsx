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
import tecnico from '../../assets/tecnico.png';
import cozinheiro from '../../assets/cozinheiro.png';
import eletricista from '../../assets/eletricista.png';
import domesticos from '../../assets/domesticos.png';
import pedreiro from '../../assets/pedreiro.png';
import { ipConfig } from '../../utils/ipVariable';

export type ServicoProps = {
	id: string;
	nome_prestador: string;
	nome_profissao: string;
	nome_servico: string;
	status: number;
	image: string;
};

export function ServicoContent({
	nome_prestador,
	nome_profissao,
	nome_servico,
	status,
	image,
}: ServicoProps) {
	let imgUrl = `http://${ipConfig}/files/${image}`;

	return (
		<Container style={{ elevation: 10 }}>
			<Image source={{ uri: imgUrl }} style={{ width: 85, height: 85 }} />
			<InfoContainer>
				<NomeText>{nome_servico}</NomeText>
				<ProfissaoText>{nome_prestador}</ProfissaoText>

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
								backgroundColor: status !== 0 ? '#35F568' : '#707070',
							}}
						/>
						<View
							style={{
								width: 22,
								height: 22,
								borderRadius: 20,
								borderWidth: 1,
								backgroundColor: '#fff',
								borderColor: status !== 0 ? '#35F568' : '#707070',
							}}
						/>
						<View
							style={{
								width: 60,
								height: 1,
								backgroundColor: status === 2 ? '#35F568' : '#707070',
							}}
						/>
						<View
							style={{
								width: 22,
								height: 22,
								borderRadius: 20,
								borderWidth: 1,
								backgroundColor: '#fff',
								borderColor: status === 2 ? '#35F568' : '#707070',
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
