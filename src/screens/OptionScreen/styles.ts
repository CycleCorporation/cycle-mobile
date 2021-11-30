import styled from 'styled-components/native';
import {
	fontPixel,
	heightPixel,
	pixelSizeHorizontal,
	pixelSizeVertical,
	widthPixel,
} from '../../utils/pixelSize';

export const Container = styled.View`
	margin: ${pixelSizeVertical(0)}px ${pixelSizeHorizontal(50)}px;
`;

export const Title = styled.Text`
	color: #4a4b4d;
	font-size: 18px;
	text-align: center;
	font-family: Roboto_400Regular;
`;

export const ButtonWrapper = styled.View`
	width: 100%;
	align-self: center;
	margin: ${pixelSizeVertical(50)}px ${pixelSizeHorizontal(0)}px;
`;

export const SearchButton = styled.TouchableOpacity`
	background: #00cdff;
	width: ${widthPixel(310)}px;
	height: ${heightPixel(66)}px;
	border-radius: 28px;
	align-items: center;
	justify-content: center;
	margin-bottom: ${heightPixel(20)}px;
`;

export const SearchButtonText = styled.Text`
	color: white;
	font-family: 'Roboto_500Medium';
	font-size: ${fontPixel(20)}px;
	font-weight: bold;
`;

export const JobButton = styled.TouchableOpacity`
	width: ${widthPixel(310)}px;
	height: ${heightPixel(66)}px;
	background: #fff;
	border: 1px solid #3760ff;
	border-radius: 28px;
	align-items: center;
	justify-content: center;
`;

export const JobButtonText = styled.Text`
	color: #3760ff;
	font-family: 'Roboto_500Medium';
	font-size: ${fontPixel(20)}px;
`;
