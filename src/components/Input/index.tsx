import React from 'react';
import { styles } from './styles';
import { TextInputProps, TextInput } from 'react-native';

interface InputProps extends TextInputProps {
	errors?: boolean;
}

export function Input({ errors, ...rest }: InputProps) {
	return (
		<TextInput style={[styles.container, errors && styles.errors]} {...rest} />
	);
}
