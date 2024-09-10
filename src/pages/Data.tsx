import { ChartView, TableView } from '@/components';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import axios from 'axios';
import { useState } from 'react';

function Data() {
	const [data, setData] = useState({ august: null, september: null });
	const [loading, setLoading] = useState({ august: false, september: false });
	const [error, setError] = useState({ august: null, september: null });

	const monthMap: Record<string, string> = {
		'08': 'august',
		'09': 'september'
	};

	const fetchData = async (month: string, year: string) => {
		const token = 'dyH3JPMDWx2C3MJuKhTDJzyvnp7hyZ';
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
		<div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] flex justify-center">
			<Tabs defaultValue="account" className="mt-[5%]">
				<TabsList className="flex justify-center mb-5">
					<TabsTrigger value="august" onClick={() => handleTabClick('08')}>
						August
					</TabsTrigger>
					<TabsTrigger value="september" onClick={() => handleTabClick('09')}>
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
						) : (
							<>
								<div>
									<TableView data={data.august || []} />
								</div>
								<div>
									<ChartView data={data.august || []} />
								</div>
							</>
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
						) : (
							<>
								<div>
									<TableView data={data.september || []} />
								</div>
								<div>
									<ChartView data={data.september || []} />
								</div>
							</>
						)}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}

export default Data;
