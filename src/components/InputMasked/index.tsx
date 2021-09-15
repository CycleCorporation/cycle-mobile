import React from 'react';
import { styles } from './styles';
import { TextInputMask, TextInputMaskProps } from 'react-native-masked-text';

interface InputMaskedProps extends TextInputMaskProps {
	errors?: boolean;
}

export function InputMasked({ errors, ...rest }: InputMaskedProps) {
	return (
		<TextInputMask
			style={[styles.container, errors && styles.errors]}
			{...rest}
		/>
	);
}
