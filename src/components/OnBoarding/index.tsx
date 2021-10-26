import React, { useState, useRef, useEffect } from 'react';
import { View, Text, FlatList, Animated, ScrollView } from 'react-native';
import { Container, NextButton, NextButtonText } from './styles';
import { OnBoardingItem } from '../OnBoardingItem';
import { slides } from './slides';
import { Paginator } from '../Paginator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import { useAuth } from '../../hooks/auth';
import { StatusBar } from 'expo-status-bar';

export const OnBoarding = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const scrollX = useRef(new Animated.Value(0)).current;

	const slidesRef = useRef<any>(null);
	const navigation = useNavigation<any>();
	const { user } = useAuth();

	const viewableItemsChanged = useRef(({ viewableItems }) => {
		setCurrentIndex(viewableItems[0].index);
	}).current;

	const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

	const scrollTo = async () => {
		if (currentIndex < slides.length - 1) {
			slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
		} else {
			try {
				await AsyncStorage.setItem('@viewedOnboarding', user.email);
				navigation.navigate('TabApp');
			} catch (error) {
				console.log('Error @checkOnboarding', error);
			}
		}
	};

	return (
		<Container>
			<StatusBar backgroundColor="#fff" />

			<View style={{ flex: 3 }}>
				<FlatList
					data={slides}
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					renderItem={({ item }) => <OnBoardingItem item={item} />}
					keyExtractor={(item) => item.id}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { x: scrollX } } }],
						{
							useNativeDriver: false,
						},
					)}
					scrollEventThrottle={32}
					onViewableItemsChanged={viewableItemsChanged}
					viewabilityConfig={viewConfig}
					ref={slidesRef}
				/>
			</View>
			<Paginator data={slides} scrollX={scrollX} />

			<NextButton onPress={scrollTo} activeOpacity={0.6}>
				<NextButtonText> Proxímo </NextButtonText>
			</NextButton>
		</Container>
	);
};
