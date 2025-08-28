'use client';
import Typewriter from '../../typewriter';
import { Fade } from 'react-awesome-reveal';


export default function BlandDefinition() {
  function handleTypewriterFinished() {
console.log('Typewriter finished');
  }

	return (
		<div className="w-screen flex flex-col items-center justify-center p-5">
			<h1 className="text-6xl font-bold">bland</h1>
			<h2 className="text-3xl">/blænd/</h2>
			<h3 className="text-lg font-light">adjective</h3>
			<Typewriter
				text={
					'lacking strong features or characteristics and therefore uninteresting'
				}
        hasFinished={() => {handleTypewriterFinished()}}
			/>

			<div className="w-screen flex flex-col items-start pl-10">
        <Fade cascade triggerOnce delay={2000}>
				<h4 className={`text-5xl font-bold`}>in</h4>
				<h4 className='text-5xl font-bold pl-12'>other</h4>
				<h4 className='text-5xl font-bold pl-25'>words...</h4>
        </Fade>

			</div>
		</div>
	);
}
