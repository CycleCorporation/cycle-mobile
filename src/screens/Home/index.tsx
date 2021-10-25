import React, { useState, useEffect } from 'react';
import {
	FlatList,
	ScrollView,
	Text,
	TouchableOpacity,
	Image,
	Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
	HeaderLogo,
	FilterContainer,
	FilterTitle,
	TitleListContainer,
	TitleListTitle,
	TitleListSubtitle,
} from './styles';
import { StatusBar } from 'expo-status-bar';
import { Picker } from '@react-native-picker/picker';
import LogoSvg from '../../assets/logoJob.svg';
import { SearchBar } from '../../components/SearchBar';
import { areaList } from './areaList';
import { useNavigation } from '@react-navigation/core';
import { api } from '../../services/api';
import { ActivityIndicator } from 'react-native-paper';

export function Home() {
	const navigation = useNavigation<any>();

	const [selectFilter, setSelectFilter] = useState('');
	const [populares, setPopulares] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadPopulares() {
			try {
				const response = await api.get('/profissoes');
				setPopulares(response.data);
			} catch (error) {
				Alert.alert('Erro ao buscar prestadores.');
			} finally {
				setLoading(false);
			}
		}

		loadPopulares();
	}, []);

	if (loading) {
		return (
			<SafeAreaView
				style={{
					flex: 1,
					backgroundColor: '#f8f8f8',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<StatusBar backgroundColor="transparent" />
				<ActivityIndicator color="#5664d2" size="large" />
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: '#f8f8f8',
			}}
		>
			<StatusBar backgroundColor="transparent" />
			<ScrollView
				contentContainerStyle={{
					paddingBottom: 100,
				}}
				showsVerticalScrollIndicator={false}
			>
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
				<SearchBar onPress={() => navigation.navigate('Search')} />

				<Text
					style={{
						fontFamily: 'Roboto_400Regular',
						fontSize: 20,
						color: '#4A4B4D',
						paddingLeft: 30,
						marginBottom: 10,
					}}
				>
					Categorias
				</Text>
				<FlatList
					horizontal
					showsHorizontalScrollIndicator={false}
					data={areaList}
					keyExtractor={(item) => item.id}
					style={{ paddingLeft: 20 }}
					renderItem={({ item }) => (
						<TouchableOpacity
							style={{
								alignItems: 'center',
								justifyContent: 'center',
								marginHorizontal: 10,
								paddingHorizontal: 16,
								paddingVertical: 6,
								borderWidth: 1,
								borderColor: '#c4c4c4',
								borderRadius: 10,
								maxWidth: 140,
							}}
							activeOpacity={0.6}
						>
							<Image source={item.image} style={{ width: 140, height: 140 }} />
							<Text
								style={{
									textAlign: 'center',
									fontFamily: 'Roboto_500Medium',
									color: '#4A4B4D',
								}}
							>
								{item.nome}
							</Text>
						</TouchableOpacity>
					)}
				/>

				<TitleListContainer>
					<TitleListTitle>Profissionais Populares</TitleListTitle>
					<TitleListSubtitle>Ver Todos</TitleListSubtitle>
				</TitleListContainer>
				<FlatList
					horizontal
					showsHorizontalScrollIndicator={false}
					data={populares}
					keyExtractor={(item) => item.id}
					style={{ paddingHorizontal: 20 }}
					renderItem={({ item }) => (
						<TouchableOpacity
							style={{
								alignItems: 'center',
								justifyContent: 'center',
								marginHorizontal: 10,
								paddingHorizontal: 16,
								paddingVertical: 6,
								borderWidth: 1,
								borderColor: '#c4c4c4',
								borderRadius: 10,
								maxWidth: 140,
							}}
							activeOpacity={0.6}
						>
							<Image
								source={{ uri: `http://localhost:3333/files/${item.image}` }}
								style={{ width: 140, height: 140 }}
							/>
							<Text
								style={{
									textAlign: 'center',
									fontFamily: 'Roboto_500Medium',
									color: '#4A4B4D',
								}}
							>
								{item.nome}
							</Text>
						</TouchableOpacity>
					)}
				/>
			</ScrollView>
		</SafeAreaView>
	);
}
