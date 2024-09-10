import axios from 'axios';
import { useState } from 'react';

import { ChartView, TableView } from '@/components';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function Home() {
	const [data, setData] = useState({ august: null, september: null });
	const [loading, setLoading] = useState({ august: false, september: false });
	const [error, setError] = useState({ august: null, september: null });

	const monthMap: Record<string, string> = {
		'08': 'august',
		'09': 'september'
	};

	const fetchData = async (month: string, year: string) => {
		const token = import.meta.env.VITE_TOKEN;
		const monthName = monthMap[month];

		if (!monthName) {
			console.error('Invalid month value');
			return;
		}

		setLoading((prev) => ({ ...prev, [monthName]: true }));
		setError((prev) => ({ ...prev, [monthName]: null }));
		try {
			const response = await axios.get(
				`https://engine.netsupport.dk:8270/leadextract/v1/31days/${token}`,
				{
					params: { month, year }
				}
			);

			const invalidJson = response.data;

			const fixedJson = invalidJson
				.replace('{"days": ', '{"days": [')
				.replace('}', ']}');

			const finalData = JSON.parse(fixedJson);

			setData((prev) => ({ ...prev, [monthName]: finalData.days }));
		} catch (err) {
			setError((prev) => ({ ...prev, [monthName]: (err as Error).message }));
		} finally {
			setLoading((prev) => ({ ...prev, [monthName]: false }));
		}
	};

	const handleTabClick = (month: string) => {
		const year = '2024';
		fetchData(month, year);
	};

	return (
		<div className="h-full w-full bg-white">
			<div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
				<main className="flex mt-[10%] justify-center h-full">
					<div className="text-center px-4">
						<div>
							<h1 className="text-4xl md:text-5xl font-bold mb-4">
								Lead Extractor
							</h1>
							<p className="text-lg md:text-xl text-gray-600 mb-6">
								Unlocking the Power of Potential Connections
							</p>
						</div>

						<div>
							<Tabs defaultValue="account">
								<TabsList className="flex justify-center mb-5">
									<TabsTrigger
										value="august"
										onClick={() => handleTabClick('08')}
									>
										August
									</TabsTrigger>
									<TabsTrigger
										value="september"
										onClick={() => handleTabClick('09')}
									>
										September
									</TabsTrigger>
								</TabsList>
								{/* August Tab Content */}
								<TabsContent value="august">
									<div>
										{loading.august ? (
											<div>Loading...</div>
										) : error.august ? (
											<div>Error: {error.august}</div>
										) : data.august ? (
											<>
												<div>
													<TableView data={data.august} />
												</div>
												<div>
													<ChartView data={data.august} />
												</div>
											</>
										) : (
											<div>No data available</div>
										)}
									</div>
								</TabsContent>

								{/* September Tab Content */}
								<TabsContent value="september">
									<div>
										{loading.september ? (
											<div>Loading...</div>
										) : error.september ? (
											<div>Error: {error.september}</div>
										) : data.september ? (
											<>
												<div>
													<TableView data={data.september} />
												</div>
												<div>
													<ChartView data={data.september} />
												</div>
											</>
										) : (
											<div>No data available</div>
										)}
									</div>
								</TabsContent>
							</Tabs>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}

export default Home;
