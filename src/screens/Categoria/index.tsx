import React, { useState, useEffect } from 'react';
import { Alert, FlatList, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Title } from './styles';
import { Ionicons } from '@expo/vector-icons';
import {
	PrestadorContainer,
	PrestadorSubtitle,
	PrestadorTitle,
} from '../Search/styles';
import { AirbnbRating } from 'react-native-ratings';
import { api } from '../../services/api';
import { ipConfig } from '../../utils/ipVariable';
import { FontAwesome5 } from '@expo/vector-icons';

type RouteProps = {
	item: any;
};

export function Categoria() {
	const { params } = useRoute<any>();
	const { item } = params;
	const navigation = useNavigation<any>();
	const [prestadores, setPrestadores] = useState<any[]>([]);

	const imageUrl = `http://${ipConfig}/files`;

	useEffect(() => {
		const handleSearch = async () => {
			try {
				const responseArea = await api.get('/prestadores/area', {
					params: { areaAtuacao: item.nome },
				});

				setPrestadores(responseArea.data);

				const responseProfissao = await api.get('/prestadores/profissao', {
					params: { profissao: item.nome },
				});

				if (responseArea.data.length === 0) {
					setPrestadores(responseProfissao.data);
				}
			} catch (error) {
				Alert.alert('Erro', 'falha na pesquisa.');
				console.log(error);
			}
		};

		handleSearch();
	}, []);

	return (
		<SafeAreaView>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					borderWidth: 2,
					borderBottomColor: '#b5b5b5',
					borderTopColor: 'transparent',
					borderLeftColor: 'transparent',
					borderRightColor: 'transparent',
				}}
			>
				<Ionicons
					onPress={() => navigation.goBack()}
					size={30}
					name="chevron-back-sharp"
					color="#828282"
				/>
				<Title>{item.nome}</Title>
			</View>

			<FlatList
				data={prestadores}
				style={{ marginTop: 40 }}
				ItemSeparatorComponent={() => (
					<View
						style={{ height: 1, backgroundColor: '#c0c0c0', marginTop: 6 }}
					/>
				)}
				keyExtractor={(prestador) => prestador.id}
				renderItem={({ item }) => (
					<PrestadorContainer
						onPress={() => navigation.navigate('Profissional', { item })}
						rippleColor="#dddddd"
					>
						{item.user.user_image ? (
							<Image
								source={{ uri: `${imageUrl}/${item.user.user_image}` }}
								style={{ width: 60, height: 60, borderRadius: 30 }}
							/>
						) : (
							<View style={{ padding: 14 }}>
								<FontAwesome5 name="user-alt" size={40} />
							</View>
						)}
						<View style={{ paddingLeft: 20 }}>
							<PrestadorTitle>{item.user.name}</PrestadorTitle>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
								}}
							>
								<PrestadorSubtitle>{item.profissao.nome}</PrestadorSubtitle>
								<AirbnbRating
									defaultRating={3}
									starContainerStyle={{
										paddingTop: 4,
									}}
									isDisabled
									selectedColor="#e0b320"
									size={12}
									showRating={false}
								/>
							</View>
						</View>
					</PrestadorContainer>
				)}
			/>
		</SafeAreaView>
	);
}
