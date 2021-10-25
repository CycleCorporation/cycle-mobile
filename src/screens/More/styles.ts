import { RectButton } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Container = styled(SafeAreaView)`
	background: #fff;
`;

export const Title = styled.Text`
	font-size: 22px;
	color: #4a4b4d;
	padding: 8px 30px;
`;
export const MainContent = styled.View`
	height: 100%;
	margin: 36px 50px;
`;

export const IconContainer = styled.View`
	width: 54px;
	height: 54px;
	background: #d8d8d8;
	border-radius: 27px;
	align-items: center;
	justify-content: center;
`;

export const IconRigth = styled.View`
	position: absolute;
	right: -20px;
	width: 32px;
	height: 32px;
	border-radius: 16px;
	background-color: #f0f0f0;
	align-items: center;
	justify-content: center;
`;

export const OptionsContainer = styled(RectButton)`
	height: 75px;
	flex-direction: row;
	align-items: center;
	background: #f0f0f0;
	margin-bottom: 50px;
	padding-left: 30px;
	border-radius: 6px;
`;

export const OptionsTitle = styled.Text`
	color: #4a4b4d;
	font-family: Roboto_500Medium;
	font-size: 16px;
	margin-left: 20px;
`;
