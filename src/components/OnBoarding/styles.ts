import styled from 'styled-components/native';
import { fontPixel, heightPixel, widthPixel } from '../../utils/pixelSize';

export const Container = styled.SafeAreaView`
	flex: 1;
	background: #fff;
	justify-content: center;
	align-items: center;
`;

export const NextButton = styled.TouchableOpacity`
	background: #00cdff;
	width: ${widthPixel(280)}px;
	height: ${heightPixel(66)}px;
	align-self: center;
	border-radius: 28px;
	align-items: center;
	justify-content: center;
	margin: ${heightPixel(50)}px 0;
`;

export const NextButtonText = styled.Text`
	color: white;
	font-family: 'Roboto_500Medium';
	font-size: ${fontPixel(20)}px;
	font-weight: bold;
`;
