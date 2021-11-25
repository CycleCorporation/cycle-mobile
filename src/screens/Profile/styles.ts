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

export const ImageContainer = styled.View`
	align-items: center;
	justify-content: center;
	margin-top: 10px;
`;

export const UserName = styled.Text`
	font-weight: bold;
	font-size: 18px;
	margin-bottom: 5px;
`;

export const EditProfile = styled.Text`
	margin-top: 5px;
	margin-bottom: 5px;
	color: #00cdff;
`;

export const SignOut = styled.Text`
	color: #ccc;
	margin-bottom: 5px;
`;

export const TextBox = styled.View`
	width: 80%;
	margin-top: 5%;
	margin-bottom: 5%;
`;
