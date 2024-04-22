import React from 'react';
import { useSelector } from 'react-redux';

export const Profile = () => {
	const user = useSelector((state) => state.reducer.user);

	return (
		<div className='flex flex-col items-center h-screen text-[white]'>
			<h1>
				UserName:
			</h1>
			<p className=''>{user.user}</p>
		</div>
	);
};
