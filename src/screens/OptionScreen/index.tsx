import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { Text, StatusBar } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoSvg from '../../assets/logoJob.svg';
import {
	Container,
	SearchButtonText,
	SearchButton,
	JobButtonText,
	JobButton,
	ButtonWrapper,
	Title,
} from './styles';
import { HeaderLogo } from '../Home/styles';

export function OptionScreen() {
	const navigation = useNavigation<any>();

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
				<HeaderLogo style={{ alignSelf: 'center' }}>
					<LogoSvg width={150} height={150} />
				</HeaderLogo>
				<Title>Primeiro selecione qual função você deseja fazer</Title>
				<ButtonWrapper>
					<SearchButton
						onPress={() => navigation.navigate('TabApp')}
						activeOpacity={0.6}
					>
						<SearchButtonText> Buscar Serviços</SearchButtonText>
					</SearchButton>
					<JobButton
						onPress={() => navigation.navigate('CadastroPrestador')}
						activeOpacity={0.6}
					>
						<JobButtonText> Prestar Serviços</JobButtonText>
					</JobButton>
				</ButtonWrapper>
			</Container>
		</SafeAreaView>
	);
}
