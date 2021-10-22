import React from 'react';
import {
	View,
	Text,
	Image,
	useWindowDimensions,
	ImageSourcePropType,
	StyleSheet,
} from 'react-native';
import { Container } from './styles';

type ItemProps = {
	item: {
		id: string;
		title: string;
		description: string;
		image: ImageSourcePropType;
	};
};

export const OnBoardingItem = ({ item }: ItemProps) => {
	const { width } = useWindowDimensions();

	return (
		<Container style={{ width }}>
			<Image
				source={item.image}
				style={{
					flex: 0.7,
					justifyContent: 'center',
					width,
					resizeMode: 'contain',
				}}
			/>
			<View style={{ flex: 0.3 }}>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.description}>{item.description}</Text>
			</View>
		</Container>
	);
};

const styles = StyleSheet.create({
	title: {
		fontWeight: '700',
		fontSize: 28,
		marginBottom: 10,
		color: '#4A4B4D',
		textAlign: 'center',
	},
	description: {
		fontWeight: '300',
		color: '#7C7D7E',
		textAlign: 'center',
		paddingHorizontal: 64,
	},
});
