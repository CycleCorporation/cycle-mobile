import styled from 'styled-components/native';
import { TextInputProps } from 'react-native';

export const Container = styled.View`
	justify-content: center;
	padding-left: 28px;
	height: 58px;
	background: #f2f2f2;
	margin: 12px 30px;
	border-radius: 28px;
`;

export const InputText = styled.TextInput<any>`
	color: #7c7d7e;
	font-family: 'Roboto_500Medium';
`;
