import React, { createContext, ReactNode, useState } from 'react';
import * as yup from 'yup';
import { api } from '../services/api';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	Control,
	FieldValues,
	useForm,
	UseFormClearErrors,
	UseFormGetValues,
	UseFormHandleSubmit,
	UseFormRegister,
	UseFormReset,
	UseFormSetError,
	UseFormSetValue,
} from 'react-hook-form';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';

type FormStepContextData = {
	steps: number;
	setStep: React.Dispatch<React.SetStateAction<number>>;
	register: UseFormRegister<FieldValues>;
	setValue: UseFormSetValue<FieldValues>;
	control: Control<FieldValues, object>;
	errors: {
		[x: string]: any;
	};
	handleSubmit: UseFormHandleSubmit<FieldValues>;
	clearErrors: UseFormClearErrors<FieldValues>;
	onSubmit: (data: FormProps) => void;
	handleNextStep: () => void;
	reset: UseFormReset<FieldValues>;
	setError: UseFormSetError<FieldValues>;
	getValues: UseFormGetValues<FieldValues>;
};

type ContextProps = {
	children: ReactNode;
};

type FormProps = {
	name: string;
	email: string;
	telephone: string;
	cep: string;
	cpf: string;
	password: string;
	password_confirmation?: string;
	age: number;
};

export const FormStepContext = createContext({} as FormStepContextData);

export function FormStepContextProvider({ children }: ContextProps) {
	const [steps, setStep] = useState(1);
	const navigation = useNavigation<any>();

	const schema = yup.object().shape({
		name: yup
			.string()
			.required('Nome é obrigatório')
			.min(10, 'Nome deve ter no mínimo 10 caracteres'),
		email: yup
			.string()
			.required('E-mail obrigatório')
			.email('Digite um e-mail valído'),
		telephone: yup
			.string()
			.required('Telefone é obrigatório')
			.min(14, 'Telefone deve ter 11 números'),
		cep: yup
			.string()
			.required('CEP é obrigatório')
			.min(8, 'CEP deve ter 8 números'),
		logradouro: yup
			.string()
			.required('Logradouro é obrigatório')
			.min(10, 'Logradouro deve no mínimo ter 10 caracteres'),
		bairro: yup
			.string()
			.required('Bairro é obrigatório')
			.min(4, 'Bairro deve no mínimo ter 4 caracteres'),
		localidade: yup
			.string()
			.required('Cidade é obrigatória')
			.min(5, 'Cidade deve no mínimo ter 5 caracteres'),
		uf: yup
			.string()
			.required('UF é obrigatória')
			.min(2, 'UF deve no mínimo ter 2 caracteres')
			.max(2, 'UF deve no máximo ter 2 caracteres'),
		cpf: yup
			.string()
			.required('CPF é obrigatório')
			.min(11, 'CPF deve ter 11 números'),
		age: yup
			.number()
			.typeError('Idade é obrigatória')
			.required('Idade é obrigatória'),
		password: yup
			.string()
			.required('Senha é obrigatória')
			.min(8, 'Senha deve ter no mínimo 8 caracteres'),
		password_confirmation: yup
			.string()
			.required('Confirmação é obrigatória')
			.oneOf([yup.ref('password'), null], 'Confirmação incorreta'),
	});

	const {
		register,
		setValue,
		handleSubmit,
		control,
		clearErrors,
		getValues,
		reset,
		setError,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		reValidateMode: 'onSubmit',
	});

	const onSubmit = async (data: FormProps) => {
		data.cep = data.cep.replace(/[^\d]+/g, ''); // cep virar string
		data.telephone = data.telephone.replace(/[^\d]+/g, '');
		data.cpf = data.cpf.replace(/[^\d]+/g, '');

		delete data.password_confirmation; //refactor
		console.log(data);
		try {
			await api.post('/users', data);

			Alert.alert('Cadastro realizado com sucesso!');
			navigation.navigate('Login');
		} catch (error) {
			console.log(error);
			Alert.alert('Não foi possível realizar o cadastro. Tente novamente.');
		}
	};

	const handleNextStep = async (data?: any) => {
		if (steps === 1) {
			if (!data.name && !data.email && !data.telephone) {
				setStep((old) => old + 1);
				clearErrors();
			}
		}

		if (
			steps === 2 &&
			!data.cep &&
			!data.logradouro &&
			!data.localidade &&
			!data.bairro &&
			!data.uf
		) {
			setStep((old) => old + 1);
			clearErrors();
		}
		if (steps === 3 && !data.cpf && !data.age) {
			setStep((old) => old + 1);
			clearErrors();
		}
		if (steps === 4 && !data.password && !data.password_confirmation) {
			setStep((old) => old + 1);
		}
	};
	return (
		<FormStepContext.Provider
			value={{
				setStep,
				steps,
				register,
				setValue,
				handleSubmit,
				control,
				errors,
				clearErrors,
				onSubmit,
				handleNextStep,
				reset,
				setError,
				getValues,
			}}
		>
			{children}
		</FormStepContext.Provider>
	);
}
