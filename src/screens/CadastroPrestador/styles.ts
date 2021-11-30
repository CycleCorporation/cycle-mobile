import styled from 'styled-components/native';
import { fontPixel, heightPixel, widthPixel } from '../../utils/pixelSize';

export const Container = styled.View`
	margin: 0 20px;
`;

export const Title = styled.Text`
	font-size: 24px;
	color: #4a4b4d;
	text-align: center;
	margin: 20px 0;
`;

export const DescriptionContainer = styled.View`
	margin: 20px 0;
`;

export const DescriptionTitle = styled.Text`
	font-family: Roboto_700Bold;
	font-size: 16px;
	color: #4a4b4d;
`;

export const DescriptionInput = styled.TextInput`
	width: 100%;
	background: #f2f2f2;
	border-radius: 20px;
	margin-top: 10px;
	padding: 10px;
	font-size: 16px;
`;

export const PrecoMedioInput = styled.TextInput`
	width: 100%;
	background: #f2f2f2;
	border-radius: 20px;
	margin-top: 10px;
	padding: 6px 14px;
	font-size: 16px;
`;

export const Button = styled.TouchableOpacity`
	background: #00cdff;
	width: ${widthPixel(310)}px;
	height: ${heightPixel(66)}px;
	border-radius: 28px;
	align-self: center;
	align-items: center;
	justify-content: center;
	margin-bottom: ${heightPixel(20)}px;
`;

export const ButtonText = styled.Text`
	color: white;
	font-family: 'Roboto_500Medium';
	font-size: ${fontPixel(20)}px;
	font-weight: bold;
`;
