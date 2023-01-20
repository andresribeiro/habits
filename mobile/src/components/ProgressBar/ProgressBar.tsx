import { View } from "react-native";
import Animated, {
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated";

type ProgressBarProps = {
	progress: number;
};

export default function ProgressBar({ progress }: ProgressBarProps) {
	const animatedStyle = useAnimatedStyle(() => {
		return {
			width: withTiming(`${progress}%`),
		};
	});

	return (
		<View className="w-full h-3 rounded-xl bg-zinc-700 mt-4">
			<Animated.View
				className="h-3 rounded-xl bg-violet-600"
				style={animatedStyle}
			/>
		</View>
	);
}
