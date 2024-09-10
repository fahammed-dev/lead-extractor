import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts';

type Lead = {
	id: string;
	value: number;
};

export function ChartView({ data }: { data: Lead[] }) {
	const days = data.map((lead, index) => ({
		day: (index + 1).toString(),
		lead: lead.toString()
	}));

	return (
		<div className="p-4 rounded-lg shadow mt-2">
			<ResponsiveContainer width="100%" height={400}>
				<LineChart data={days}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="day" />
					<YAxis domain={[0, 500]} />
					<Tooltip />
					<Legend />
					<Line
						type="monotone"
						dataKey="lead"
						stroke="#8884d8"
						activeDot={{ r: 8 }}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}
