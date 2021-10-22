import React from 'react';
import { useState, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../hooks/auth';
import { HeaderLogo, FilterContainer, FilterTitle } from './styles';
import { StatusBar } from 'expo-status-bar';
import { Picker } from '@react-native-picker/picker';
import LogoSvg from '../../assets/logoJob.svg';

export function Home() {
	const { signOut } = useAuth();
	const [selectFilter, setSelectFilter] = useState('');
	const remove = () => {
		signOut();
	};

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: '#f8f8f8',
			}}
		>
			<StatusBar backgroundColor="transparent" />
			<ScrollView contentContainerStyle={{}}>
				<HeaderLogo>
					<LogoSvg width={110} height={110} />
				</HeaderLogo>

				<FilterContainer>
					<FilterTitle>Buscando por</FilterTitle>
					<Picker
						mode="dropdown"
						style={{
							width: 180,
							color: '#7C7D7E',
							fontWeight: 'bold',
						}}
						selectedValue={selectFilter}
						dropdownIconColor="#00CDFF"
						onValueChange={(filter: string) => {
							setSelectFilter(filter);
						}}
					>
						<Picker.Item style={{ color: '#adafb1' }} label="Nenhum" value="" />
						<Picker.Item
							style={{ color: '#4A4B4D' }}
							label="Bairro"
							value="bairro"
						/>
						<Picker.Item
							style={{ color: '#4A4B4D' }}
							label="Cidade"
							value="cidade"
						/>
						<Picker.Item
							style={{ color: '#4A4B4D' }}
							label="Mais próximos"
							value="proximos"
						/>
					</Picker>
				</FilterContainer>
			</ScrollView>
		</SafeAreaView>
	);
}
