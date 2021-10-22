import React, { useState, useEffect, ReactNode, useContext } from 'react';
import { FormStepContext } from '../../contexts/FormStepContext';
import { Container } from './styles';
import Animated, {
	useAnimatedStyle,
	withTiming,
	Easing,
	useSharedValue,
	interpolate,
	Extrapolate,
} from 'react-native-reanimated';
import { StyleSheet, View, Text } from 'react-native';
import { heightPixel } from '../../utils/pixelSize';

type StepProps = {
	children: ReactNode;
	// stepPosition: number;
};

export function Step({ children }: StepProps) {
	const { steps } = useContext(FormStepContext);
	const containerPosition = useSharedValue(100);

	useEffect(() => {
		containerPosition.value = withTiming(0, {
			duration: 700,
		});
	}, []);

	const viewStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: containerPosition.value,
				},
			],
			opacity: interpolate(
				containerPosition.value,
				[100, 0],
				[0, 1],
				Extrapolate.CLAMP,
			),
		};
	});

	return (
		<Animated.View style={[styles.container, viewStyle]}>
			<View>{children}</View>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		// backgroundColor: '#444',
	},
});
