import React from 'react';

export const Input = ({
	name,
	value,
	type,
	placeholder,
	autoComplete,
	className,
	onChange,
	bgColor,
	min,
	max,
	step,
}) => {
	return (
		<>
			<input
				name={name}
				value={value}
				type={type || 'text'}
				placeholder={placeholder || ''}
				autoComplete={autoComplete || false}
				className={className + (bgColor ?? '')}
				onChange={onChange}
				min={min}
				max={max}
				step={step}
			/>
		</>
	);
};
