import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

function Home() {
	return (
		<div className="h-full w-full bg-white">
			<div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
				<main className="flex items-center justify-center h-full">
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
							<Link to={'/data'}>
								<Button variant="outline">Explorer</Button>
							</Link>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}

export default Home;
