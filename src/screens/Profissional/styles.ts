import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
	flex: 1;
	background: #fff;
	padding: 20px;
`;

export const ImageContainer = styled.View`
	align-items: center;
	justify-content: center;
`;

export const NameTitle = styled.Text`
	color: #4a4b4d;
	font-size: 18px;
	margin-top: 10px;
	font-family: Roboto_700Bold;
`;

export const Avaliation = styled.View`
	margin-top: 24px;
`;
export const AvaliationText = styled.Text`
	font-family: Roboto_700Bold;
	font-size: 16px;
	color: #4a4b4d;
	margin-left: 32px;
`;

export const DescriptionContainer = styled.View`
	margin-top: 20px;
	margin-left: 32px;
`;

export const DescriptionTitle = styled.Text`
	font-family: Roboto_700Bold;
	font-size: 16px;
	color: #4a4b4d;
`;

export const DescriptionInput = styled.View`
	width: 100%;
	background: #f2f2f2;
	height: 140px;
	border-radius: 20px;
	margin-top: 10px;
`;

export const DescriptionText = styled.Text`
	padding: 18px;
	color: #4a4b4d;
`;

export const PrecoMedioContainer = styled.View`
	margin: 24px 32px;
`;
export const PrecoMedioTitle = styled.Text`
	font-family: Roboto_700Bold;
	font-size: 16px;
	color: #4a4b4d;
`;
export const PrecoMedioValue = styled.Text`
	font-family: Roboto_700Bold;
	font-size: 22px;
	color: #4a4b4d;
	margin-top: 10px;
`;

export const ButtonsContainer = styled.View`
	align-self: center;
	margin-bottom: 60px;
`;

export const ContratarButton = styled(RectButton)`
	width: 320px;
	height: 58px;
	background: #00cdff;
	border-radius: 40px;
	align-items: center;
	justify-content: center;
	flex-direction: row;
`;
export const WhatsappButton = styled(RectButton)`
	width: 320px;
	height: 58px;
	background: #46c254;
	border-radius: 40px;
	align-items: center;
	justify-content: center;
	margin-top: 16px;
	flex-direction: row;
`;

export const ButtonText = styled.Text`
	color: white;
	font-size: 16px;
	margin-right: 14px;
	font-weight: bold;
`;
