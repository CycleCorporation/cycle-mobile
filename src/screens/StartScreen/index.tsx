import React from 'react';
import {
	Wrapper,
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

export function StartScreen() {
	return (
		<Wrapper>
			<StatusBar
				barStyle="light-content"
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
				<LoginButton activeOpacity={0.6} style={{ elevation: 3 }}>
					<LoginButtonText>Login</LoginButtonText>
				</LoginButton>
				<CriarContaButton activeOpacity={0.6} style={{ elevation: 3 }}>
					<CriarContaButtonText>Criar conta</CriarContaButtonText>
				</CriarContaButton>
			</ButtonWrapper>
		</Wrapper>
	);
}
