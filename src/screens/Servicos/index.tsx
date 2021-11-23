import React from 'react';
import { View, ScrollView } from 'react-native';
import { ServicoContent } from '../../components/ServicoContent';

export function Servicos() {
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
			<ScrollView
				style={{ height: '100%' }}
				showsVerticalScrollIndicator={false}
			>
				<ServicoContent />
			</ScrollView>
		</View>
	);
}
