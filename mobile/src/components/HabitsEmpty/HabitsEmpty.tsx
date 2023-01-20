import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";

export default function HabitsEmpty() {
	const navigation = useNavigation();

	return (
		<Text className="text-zinc-400 text-base">
			Você ainda não está monitorando nenhum hábito{" "}
			<Text
				className="text-violet-400 text-base underline active:text-violet-500"
				onPress={() => navigation.push("New")}
			>
				comece cadastrando um.
			</Text>
		</Text>
	);
}
