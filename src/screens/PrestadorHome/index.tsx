import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import {
	BackHandler,
	Text,
	View,
	FlatList,
	Image,
	RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../hooks/auth';
import { RectButton } from 'react-native-gesture-handler';
import { api } from '../../services/api';
import { ipConfig } from '../../utils/ipVariable';
import { ActivityIndicator } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

type ServicoPrestadorProps = {
	id: string;
	nome_cliente: string;
	nome_servico: string;
	status: number;
	image: string;
	id_servico: string;
};

export function PrestadorHome() {
	const { prestador_id } = useAuth();
	const [loading, setLoading] = useState(true);
	const [servicos, setServicos] = useState<ServicoPrestadorProps[]>([]);
	const [refreshing, setRefreshing] = useState(false);

	async function handleServico(servicoId: string, status: number) {
		try {
			await api.put(`/servico/status/${servicoId}`, { status });
			onRefresh();
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		async function loadServicos() {
			try {
				const response = await api.get(`/servicos/prestador/${prestador_id}`);

				const servicos = response.data;

				setServicos(servicos);
			} catch (error) {
			} finally {
				setLoading(false);
			}
		}

		BackHandler.addEventListener('hardwareBackPress', () => true);
		loadServicos();
		return () =>
			BackHandler.removeEventListener('hardwareBackPress', () => true);
	}, [loading]);

	async function onRefresh() {
		setRefreshing(true);
		const { data } = await api.get(`/servicos/prestador/${prestador_id}`);

		setServicos(data);
		setRefreshing(false);
	}

	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center' }}>
				<ActivityIndicator size="large" color="#5664d2" />
			</View>
		);
	}

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

			{servicos.length === 0 ? (
				<Text>NÃO possui serviços ainda</Text>
			) : (
				<>
					<FlatList
						refreshControl={
							<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
						}
						style={{ height: '100%', paddingVertical: 80 }}
						data={servicos}
						keyExtractor={(item) => item.id}
						showsVerticalScrollIndicator={false}
						renderItem={({ item }) => (
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'space-evenly',
									marginVertical: 20,
									backgroundColor: '#fff',
									elevation: 3,
									borderRadius: 30,
									height: 100,
									marginLeft: 20,
								}}
							>
								<Image
									source={{
										uri: `http://${ipConfig}/files/${item.image}`,
									}}
									style={{ width: 60, height: 60 }}
								/>
								<View style={{ width: 218 }}>
									<Text
										style={{
											textAlign: 'center',
											color: '#4A4B4D',
											fontSize: 16,
											fontFamily: 'Roboto_700Bold',
										}}
									>
										{item.nome_cliente}
									</Text>

									<Text style={{ textAlign: 'center', marginBottom: 7 }}>
										{item.nome_servico}
									</Text>
									<View
										style={{
											flexDirection: 'row',
											justifyContent: 'space-between',
										}}
									>
										{item.status === 0 ? (
											<>
												<RectButton
													onPress={() => handleServico(item.id_servico, 1)}
													style={{
														backgroundColor: '#1fe668',
														padding: 10,
														width: 100,
														justifyContent: 'center',
														alignItems: 'center',
														borderRadius: 20,
													}}
												>
													<Text style={{ color: '#fff' }}>Aceitar</Text>
												</RectButton>

												<RectButton
													onPress={() => handleServico(item.id_servico, 3)}
													style={{
														backgroundColor: '#ec1111',
														padding: 10,
														width: 100,
														justifyContent: 'center',
														alignItems: 'center',
														borderRadius: 20,
													}}
												>
													<Text style={{ color: '#fff' }}>Recusar</Text>
												</RectButton>
											</>
										) : item.status === 1 ? (
											<RectButton
												onPress={() => handleServico(item.id_servico, 2)}
												style={{
													backgroundColor: '#00CDFF',
													padding: 10,
													width: 150,
													marginLeft: 30,
													borderRadius: 10,
												}}
											>
												<Text style={{ color: '#fff', textAlign: 'center' }}>
													Finalizar o Serviço
												</Text>
											</RectButton>
										) : item.status === 2 ? (
											<View
												style={{
													flexDirection: 'row',
													backgroundColor: '#1fe668',
													alignItems: 'center',
													width: 180,
													justifyContent: 'space-evenly',
													borderRadius: 6,
													marginLeft: 20,
													padding: 6,
												}}
											>
												<Text style={{ textAlign: 'center', color: '#fff' }}>
													Serviço Finalizado
												</Text>
												<AntDesign
													name="checkcircleo"
													size={24}
													color="white"
												/>
											</View>
										) : (
											<View
												style={{
													flexDirection: 'row',
													backgroundColor: '#ec1111',
													alignItems: 'center',
													width: 180,
													justifyContent: 'space-evenly',
													borderRadius: 6,
													marginLeft: 20,
													padding: 6,
												}}
											>
												<Text style={{ textAlign: 'center', color: '#fff' }}>
													Serviço Recusado
												</Text>
												<AntDesign
													name="closecircleo"
													size={24}
													color="white"
												/>
											</View>
										)}
									</View>
								</View>
							</View>
						)}
					/>
				</>
			)}
		</View>
	);
}
