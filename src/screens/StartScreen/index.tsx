import React from 'react';
import {
	Container,
	Description,
	ButtonWrapper,
	CriarContaButton,
	LoginButton,
	CriarContaButtonText,
	LoginButtonText,
} from './styles';
import LogoSvg from '../../assets/logo.svg';
import Banner from '../../assets/banner.svg';
import { View, StatusBar } from 'react-native';
import { widthPixel, heightPixel } from '../../utils/pixelSize';
import { useNavigation } from '@react-navigation/core';

export function StartScreen() {
	const navigation = useNavigation<any>();

	return (
		<Container>
			<StatusBar
				barStyle="dark-content"
				translucent
				backgroundColor="transparent"
			/>
			<View>
				<Banner width={widthPixel(415)} height={heightPixel(464)} />
				<LogoSvg
					width="36%"
					style={{
						position: 'absolute',
						top: '90%',
						alignSelf: 'center',
					}}
				/>
			</View>
			<View style={{ height: `${heightPixel(20)}%` }} />
			<Description>
				Descubra profissionais a qualquer momento e {'\n'}
				em qualquer lugar!
			</Description>

			<ButtonWrapper>
				<LoginButton
					onPress={() => navigation.navigate('Login')}
					activeOpacity={0.6}
					style={{ elevation: 3 }}
				>
					<LoginButtonText>Login</LoginButtonText>
				</LoginButton>
				<CriarContaButton
					onPress={() => navigation.navigate('Cadastro')}
					activeOpacity={0.6}
					style={{ elevation: 3 }}
				>
					<CriarContaButtonText>Criar conta</CriarContaButtonText>
				</CriarContaButton>
			</ButtonWrapper>
		</Container>
	);
}
