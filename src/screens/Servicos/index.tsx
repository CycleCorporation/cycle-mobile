import React, { useEffect, useState } from 'react';
import {
	View,
	ScrollView,
	FlatList,
	RefreshControl,
	Alert,
	Text,
} from 'react-native';
import { ServicoContent, ServicoProps } from '../../components/ServicoContent';
import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';
import LottieView from 'lottie-react-native';

export function Servicos() {
	const { user } = useAuth();
	const [servicos, setServicos] = useState<ServicoProps[]>([]);
	const [refreshing, setRefreshing] = useState(false);

	async function onRefresh() {
		try {
			setRefreshing(true);
			const { data } = await api.get(`/servicos-usuario/${user.id}`);

			setServicos(data);
			setRefreshing(false);
		} catch (error) {
			Alert.alert('Erro', 'Não foi possível buscar os serviços.');
			setRefreshing(false);
		}
	}

	useEffect(() => {
		async function loadServicos() {
			try {
				const servicosResponse = await api.get(`/servicos-usuario/${user.id}`);
				setServicos(servicosResponse.data);
			} catch (error) {
				Alert.alert('Erro', 'não foi possível buscar os seus serviços.');
			}
		}
		loadServicos();
	}, []);

	return (
		<View style={{ paddingBottom: 40 }}>
			<View
				style={{
					bottom: 90,
					position: 'absolute',
					width: 80,
					height: '85%',
					borderTopEndRadius: 20,
					borderBottomEndRadius: 20,
					backgroundColor: '#00CDFF',
				}}
			/>

			{servicos.length === 0 && (
				<View
					style={{
						marginTop: 200,
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<LottieView
						style={{
							width: 200,
							height: 200,
							alignSelf: 'center',
						}}
						source={require('../../assets/animation/search.json')}
						autoPlay
						loop
					/>
					<Text>Nenhum serviço ativo</Text>
				</View>
			)}
			<FlatList
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
				style={{ height: '100%' }}
				data={servicos}
				keyExtractor={(item) => item.id}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => (
					<ServicoContent
						id={item.id}
						nome_prestador={item.nome_prestador}
						nome_profissao={item.nome_profissao}
						nome_servico={item.nome_servico}
						status={item.status}
						image={item.image}
					/>
				)}
			/>
		</View>
	);
}
