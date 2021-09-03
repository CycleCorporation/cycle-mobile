import React, { forwardRef, useRef } from 'react';
import { TextInputProps } from 'react-native';
import { InputText, Container } from './styles';

interface InputValueReference {
	value: string;
}

function Input({ ...rest }: TextInputProps) {
	// const inputValueRef = useRef<InputValueReference>({ value: defa });

	return (
		<Container>
			<InputText {...rest} />
		</Container>
	);
}

export default Input;
