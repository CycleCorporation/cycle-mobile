import React from 'react';
import { useAuth } from '../../hooks/auth';
import {
	Title,
	Container,
	OptionsContainer,
	MainContent,
	OptionsTitle,
	IconContainer,
	IconRigth,
} from './styles';
import { Ionicons, Fontisto, MaterialIcons, Entypo } from '@expo/vector-icons';

export function More({ navigation }: any) {
	const { signOut } = useAuth();

	return (
		<Container>
			<Title
				style={{
					borderWidth: 2,
					borderBottomColor: '#b5b5b5',
					borderTopColor: 'transparent',
					borderLeftColor: 'transparent',
					borderRightColor: 'transparent',
				}}
			>
				Mais
			</Title>

			<MainContent>
				<OptionsContainer>
					<IconContainer>
						<Ionicons name="md-newspaper" size={26} color="#4A4B4D" />
					</IconContainer>
					<OptionsTitle>Termos de Uso</OptionsTitle>
					<IconRigth>
						<Entypo name="chevron-right" size={24} color="#7C7D7E" />
					</IconRigth>
				</OptionsContainer>

				<OptionsContainer>
					<IconContainer>
						<Fontisto name="info" size={26} color="#4A4B4D" />
					</IconContainer>
					<OptionsTitle>Sobre Nós</OptionsTitle>
					<IconRigth>
						<Entypo name="chevron-right" size={24} color="#7C7D7E" />
					</IconRigth>
				</OptionsContainer>

				<OptionsContainer onPress={signOut}>
					<IconContainer>
						<MaterialIcons name="logout" size={25} color="#4A4B4D" />
					</IconContainer>
					<OptionsTitle>Sair</OptionsTitle>
					<IconRigth>
						<Entypo name="chevron-right" size={24} color="#7C7D7E" />
					</IconRigth>
				</OptionsContainer>
			</MainContent>
		</Container>
	);
}
