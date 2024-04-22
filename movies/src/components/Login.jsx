import React, { useState } from 'react';
import { Input } from './generic-components/Input';
import { Button } from './generic-components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../redux/actions/actions';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [userData, setUserData] = useState({
		user: '',
		password: '',
	});

	const handleOnChange = (e) => {
		e.preventDefault();
		setUserData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleOnSubmit = () => {
		dispatch(logIn(userData));
		navigate('/');
	};

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="flex flex-col justify-center items-center">
				<Input
					name="user"
					value={userData.user}
					type="text"
					placeholder="username"
					autoComplete="off"
					className="rounded-lg m-2 p-2"
					onChange={(e) => handleOnChange(e)}
				/>
				<Input
					name="password"
					value={userData.password}
					type="password"
					placeholder="password"
					autoComplete="off"
					className="rounded-lg m-2 p-2"
					onChange={(e) => handleOnChange(e)}
				/>
				<div className="p-4 flex flex-col w-[200px] ">
					<Button
						className="bg-[#DDDDDD] rounded-md h-[40px] p-2 flex items-center justify-center"
						value={'Log in'}
						onClick={handleOnSubmit}
					/>
				</div>
			</div>
		</div>
	);
};
