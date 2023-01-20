import { useFocusEffect, useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { useCallback, useState } from "react";
import { Alert, View, Text, ScrollView } from "react-native";
import HabitDay, { DAY_SIZE } from "../../components/HabitDay";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import api from "../../lib/axios";
import { generateDatesFromYearBeginning } from "../../utils/generate-dates-from-year-beginning";

const datesFromYearStart = generateDatesFromYearBeginning();

const minimumSummaryDatesSize = 18 * 5;
const amountOfDaysToFill = minimumSummaryDatesSize - datesFromYearStart.length;

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

type Summary = {
	id: string;
	date: string;
	amount: number;
	completed: number;
}[];

export default function Home() {
	const [loading, setLoading] = useState(true);
	const [summary, setSummary] = useState<Summary | null>(null);

	const navigation = useNavigation();

	async function fetchData() {
		try {
			setLoading(true);

			const response = await api.get("/summary");

			setSummary(response.data);
		} catch (error) {
			Alert.alert("Ops", "Não foi possível carregar o sumário de hábitos");
		} finally {
			setLoading(false);
		}
	}

	useFocusEffect(
		useCallback(() => {
			fetchData();
		}, []),
	);

	if (loading) {
		return <Loading />;
	}

	return (
		<View className="flex-1 bg-background px-8 pt-16">
			<Header />

			<View className="flex-row mt-6 mb-2">
				{weekDays.map((weekDay, index) => (
					<Text
						key={`${weekDay}_${index}`}
						className="text-zinc-400 text-xl font-bold text-center mx-1"
						style={{ width: DAY_SIZE }}
					>
						{weekDay}
					</Text>
				))}
			</View>

			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingBottom: 100,
				}}
			>
				{summary && (
					<View className="flex-row flex-wrap">
						{datesFromYearStart.map((date) => {
							const dayWithHabits = summary.find((day) =>
								dayjs(date).isSame(day.date, "day"),
							);

							return (
								<HabitDay
									key={date.toString()}
									date={date}
									amountOfHabits={dayWithHabits?.amount}
									amountCompleted={dayWithHabits?.completed}
									onPress={() =>
										navigation.push("Habit", {
											date: date.toISOString(),
										})
									}
								/>
							);
						})}

						{amountOfDaysToFill > 0 &&
							Array.from({ length: amountOfDaysToFill }).map((_, index) => (
								<View
									// rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									key={index}
									className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
									style={{ width: DAY_SIZE, height: DAY_SIZE }}
								/>
							))}
					</View>
				)}
			</ScrollView>
		</View>
	);
}