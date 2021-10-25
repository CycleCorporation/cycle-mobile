import React from 'react';
import { TouchableOpacityProps, Text } from 'react-native';
import { Container } from './styles';
import { AntDesign } from '@expo/vector-icons';

export const SearchBar = ({ ...rest }: TouchableOpacityProps) => {
	return (
		<Container {...rest} activeOpacity={0.8}>
			<AntDesign
				style={{ paddingRight: 10 }}
				name="search1"
				size={24}
				color="#7C7D7E"
			/>
			<Text style={{ color: '#adadad' }}>Procure Profissionais</Text>
		</Container>
	);
};
