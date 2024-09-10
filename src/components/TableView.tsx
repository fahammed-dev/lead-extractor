import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table';

type Lead = {
	id: string;
	value: number;
};

export function TableView({ data }: { data: Lead[] }) {
	const days = data.map((lead, index) => ({
		index: (index + 1).toString(), // Convert the index to a string and start from 1
		lead: lead.toString() // Convert the lead value to a string
	}));

	return (
		<div className="rounded-lg shadow mb-5">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Day</TableHead>
						{days.map((day) => (
							<TableHead key={day.index} className="text-center">
								{day.index}
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell className="font-medium">Leads</TableCell>
						{days.map((day) => (
							<TableCell key={day.index} className="text-center">
								{day.lead}
							</TableCell>
						))}
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
}
