import React from 'react';
import { TextContainer, Container } from './styles';

type Props = {
	text: string;
};

export const TextScroll = ({ text }: Props) => {
	return (
		<Container>
			<TextContainer>{text}</TextContainer>
		</Container>
	);
};
