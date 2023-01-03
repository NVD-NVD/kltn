import React from 'react';
import { Link } from 'react-router-dom';
import mt1 from '../../../../images/mt1.png';
interface Props {}

const HeroWrap = (props: Props) => {
	return (
		<div
			className='hero-wrap hero-bread'
			style={{ backgroundImage: `url(${mt1})` }}
		>
			<div className='container'>
				<div className='row no-gutters slider-text align-items-center justify-content-center'>
					<div className='col-md-9 ftco-animate text-center'>
						<p className='breadcrumbs'>
							<span className='mr-2'>
								<Link to='/'>Home</Link>
							</span>{' '}
							<span>Cart</span>
						</p>
						<h1 className='mb-0 bread'>My Cart</h1>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeroWrap;
