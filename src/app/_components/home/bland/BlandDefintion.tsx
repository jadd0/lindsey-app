'use client';
import Typewriter from '../../typewriter';
import { Fade } from 'react-awesome-reveal';

export default function BlandDefinition() {
	function handleTypewriterFinished() {
		console.log('Typewriter finished');
	}

	return (
		<div className="w-screen flex flex-col items-center justify-center p-5">
			<h1 className="text-6xl font-bold text-[#ff568c]">unique</h1>
			<h2 className="text-3xl mt-3">/juːˈniːk/</h2>
			<h3 className="text-lg font-light">adjective</h3>
			<Typewriter
				text={
					'being the only one of its kind; unlike anything else'
				}
				hasFinished={() => {
					handleTypewriterFinished();
				}}
			/>

			<div className="w-screen flex flex-col items-start pl-10">
				<Fade cascade triggerOnce delay={2000}>
					<h4 className={`text-5xl font-bold`}>in</h4>
					<h4 className="text-5xl font-bold pl-12">other</h4>
					<h4 className="text-5xl font-bold pl-25">words...</h4>
				</Fade>
			</div>
		</div>
	);
}
