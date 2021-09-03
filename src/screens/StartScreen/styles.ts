import styled from 'styled-components/native';
import {
	fontPixel,
	pixelSizeVertical,
	pixelSizeHorizontal,
	widthPixel,
	heightPixel,
} from '../../utils/pixelSize';

export const Container = styled.SafeAreaView`
	flex: 1;
`;

export const Description = styled.Text`
	font-size: ${fontPixel(17)}px;
	color: #7c7d7e;
	font-family: 'Roboto_500Medium';
	text-align: center;
`;

export const ButtonWrapper = styled.View`
	width: 100%;
	align-items: center;
	justify-content: center;
	margin: ${pixelSizeVertical(50)}px ${pixelSizeHorizontal(0)}px;
`;

export const LoginButton = styled.TouchableOpacity`
	background: #00cdff;
	width: ${widthPixel(310)}px;
	height: ${heightPixel(66)}px;
	border-radius: 28px;
	align-items: center;
	justify-content: center;
	margin-bottom: ${heightPixel(20)}px;
`;

export const LoginButtonText = styled.Text`
	color: white;
	font-family: 'Roboto_500Medium';
	font-size: ${fontPixel(20)}px;
	font-weight: bold;
`;

export const CriarContaButton = styled.TouchableOpacity`
	width: ${widthPixel(310)}px;
	height: ${heightPixel(66)}px;
	background: #fff;
	border: 1px solid #3760ff;
	border-radius: 28px;
	align-items: center;
	justify-content: center;
`;

export const CriarContaButtonText = styled.Text`
	color: #3760ff;
	font-family: 'Roboto_500Medium';
	font-size: ${fontPixel(20)}px;
`;
