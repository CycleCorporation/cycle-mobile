import React, { ReactNode } from 'react';

import { Container } from './styles';

type FormStepProps = {
	children: ReactNode;
};

export function FormStep({ children }: FormStepProps) {
	return <Container>{children}</Container>;
}
