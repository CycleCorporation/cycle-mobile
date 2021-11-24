import React, { useEffect, useState } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { ServicoContent, ServicoProps } from '../../components/ServicoContent';
import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';

export function Servicos() {
	const { user } = useAuth();
	const [servicos, setServicos] = useState<ServicoProps[]>([]);

	useEffect(() => {
		async function loadServicos() {
			const servicosResponse = await api.get(`/servicos-usuario/${user.id}`);

			setServicos(servicosResponse.data);
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
			{/* <ScrollView
				style={{ height: '100%' }}
				showsVerticalScrollIndicator={false}
			> */}
			<FlatList
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
			{/* </ScrollView> */}
		</View>
	);
}
