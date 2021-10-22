import styled from 'styled-components/native';
import { fontPixel, heightPixel, widthPixel } from '../../utils/pixelSize';

export const Container = styled.SafeAreaView`
	flex: 1;
	padding-bottom: 42px;
	background: #fff;
	padding-top: ${heightPixel(100)}px;
`;

export const Title = styled.Text`
	font-size: ${fontPixel(38)}px;
	color: #4a4b4d;
	font-family: 'Roboto_400Regular';
	text-align: center;
`;
export const Subtitle = styled.Text`
	font-family: 'Roboto_500Medium';
	color: #7c7d7e;
	text-align: center;
	margin: 14px 0;
`;

export const CriarContaButton = styled.TouchableOpacity`
	background: #00cdff;
	width: ${widthPixel(310)}px;
	height: ${heightPixel(66)}px;
	align-self: center;
	border-radius: 28px;
	align-items: center;
	justify-content: center;
	margin: ${heightPixel(20)}px 0;
`;

export const CriarContaButtonText = styled.Text`
	color: white;
	font-family: 'Roboto_500Medium';
	font-size: ${fontPixel(20)}px;
	font-weight: bold;
`;

export const FooterText = styled.Text`
	margin-top: 14px;
	text-align: center;
	font-family: 'Roboto_500Medium';
	color: #7c7d7e;
`;

export const ErrorText = styled.Text`
	font-family: 'Roboto_400Regular';
	color: #ff6961;
	font-size: ${fontPixel(16)}px;
	margin-left: 40px;
`;

export const ButtonWrapper = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin: 20px;
`;
