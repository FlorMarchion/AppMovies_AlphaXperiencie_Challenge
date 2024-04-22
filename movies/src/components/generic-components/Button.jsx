import React from 'react';

export const Button = ({ value, className, onClick }) => {
	return (
		<button className={className} onClick={onClick}>
			{value}
		</button>
	);
};
