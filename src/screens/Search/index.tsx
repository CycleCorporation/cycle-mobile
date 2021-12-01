import React, { useState, useEffect, useRef } from 'react';
import { Alert, FlatList, TextInput, Text, View, Image } from 'react-native';
import {
	PrestadorContainer,
	SearchContainer,
	PrestadorSubtitle,
	PrestadorTitle,
} from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import IconBack from 'react-native-vector-icons/Ionicons';
import { BorderlessButton } from 'react-native-gesture-handler';
import { api } from '../../services/api';
import { AirbnbRating } from 'react-native-ratings';
import { ipConfig } from '../../utils/ipVariable';

export const Search = ({ navigation }) => {
	const [input, setInput] = useState('');
	const textInputRef = useRef<TextInput>(null);
	const [prestadores, setPrestadores] = useState<any[]>([]);

	const imageUrl = `http://${ipConfig}/files`;

	const handleSearch = async () => {
		try {
			const responseArea = await api.get('/prestadores/area', {
				params: { areaAtuacao: input },
			});

			setPrestadores(responseArea.data);

			const responseProfissao = await api.get('/prestadores/profissao', {
				params: { profissao: input },
			});

			if (responseArea.data.length === 0) {
				setPrestadores(responseProfissao.data);
			}
		} catch (error) {
			Alert.alert('Erro', 'falha na pesquisa.');
			console.log(error);
		}
	};

	useEffect(() => {
		if (textInputRef.current) {
			const unsubscribe = navigation.addListener('transitionEnd', () => {
				textInputRef.current?.focus();
			});

			return unsubscribe;
		}
	}, []);

	return (
		<SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
			<SearchContainer>
				<BorderlessButton
					rippleColor="#c7c7c7"
					onPress={() => navigation.goBack()}
				>
					<IconBack name="chevron-back-sharp" size={28} color="#828282" />
				</BorderlessButton>
				<TextInput
					style={{
						width: '80%',
						height: 45,
						paddingHorizontal: 30,
						backgroundColor: '#0000000c',
						borderRadius: 28,
						marginRight: 20,
					}}
					ref={textInputRef}
					placeholder="Procure Profissionais"
					value={input}
					returnKeyType="search"
					onChangeText={(text) => setInput(text)}
					onSubmitEditing={handleSearch}
				/>
			</SearchContainer>

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
						style={{marginVertical: 8}}
						onPress={() => navigation.navigate('Profissional', { item })}
						rippleColor="#dddddd"
					>
						<Image
							source={{ uri: `${imageUrl}/${item.user.user_image}` }}
							style={{ width: 60, height: 60, borderRadius: 30 }}
						/>
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
};
