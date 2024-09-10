import { ChartView, TableView } from '@/components';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function Data() {
	return (
		<div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] flex justify-center">
			<Tabs defaultValue="account" className="mt-[5%]">
				<TabsList className="flex justify-center">
					<TabsTrigger value="august">August</TabsTrigger>
					<TabsTrigger value="september">September</TabsTrigger>
				</TabsList>
				<TabsContent value="august">
					<div className="flex items-end">
						<div>
							<TableView />
						</div>
						<div>
							<ChartView />
						</div>
					</div>
				</TabsContent>
				<TabsContent value="september">
					<div className="flex items-end">
						<div>
							<TableView />
						</div>
						<div>
							<ChartView />
						</div>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}

export default Data;
