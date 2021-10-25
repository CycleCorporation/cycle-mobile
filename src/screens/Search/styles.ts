import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const SearchContainer = styled.View`
	align-items: center;
	flex-direction: row;
	justify-content: space-between;
	padding: 0 10px;
`;

export const PrestadorContainer = styled(RectButton)`
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	padding: 0 20px;
`;

export const PrestadorTitle = styled.Text`
	font-size: 20px;
	color: #4a4b4d;
	font-family: 'Roboto_500Medium';
`;
export const PrestadorSubtitle = styled.Text`
	font-size: 14px;
	color: #b6b7b7;
	padding-right: 16px;
`;
