import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled(RectButton)`
	width: 100%;
	border-radius: 30px;
	flex-direction: row;
	background: #fff;
	padding: 10px;
	align-items: center;

	/* tempo */
	margin: 30px;
`;

export const InfoContainer = styled.View`
	margin-left: 40px;
	padding-bottom: 12px;
`;

export const NomeText = styled.Text`
	color: #4a4b4d;
	font-size: 18px;
	text-align: center;
	font-family: Roboto_700Bold;
`;

export const ProfissaoText = styled.Text`
	color: #b6b7b7;
	font-size: 12px;
	text-align: center;
`;

export const StatusContainer = styled.View`
	padding: 10px;
`;

export const StatusTitle = styled.Text`
	font-family: Roboto_700Bold;
	text-align: center;
	color: #4a4b4d;
`;

export const StatusInfoText = styled.Text`
	font-size: 11px;
`;
