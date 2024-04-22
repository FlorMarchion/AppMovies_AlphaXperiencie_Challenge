import React, { useState } from 'react';
import { Button } from './generic-components/Button';
import { Input } from './generic-components/Input';
import { useDispatch } from 'react-redux';
import { addReview, createRating } from '../redux/actions/actions';

export const AddReview = ({ movieDetail }) => {
	const dispatch = useDispatch();
	const [rate, setRate] = useState(0);
	const [review, setReview] = useState({
		date: '',
		user: '',
		content: '',
	});

	const handleOnChangeRate = (e) => {
		e.preventDefault();
		setRate(e.target.value);
	};

	const handleOnChangeReview = (e) => {
		setReview((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = (movieId, value) => {
		dispatch(createRating(movieId, value));
		dispatch(
			addReview({
				created_at: review.date,
				author_details: { username: review.user },
				content: review.content,
				movie_id: movieDetail.id,
			})
		);
		setReview({
			date: '',
			user: '',
			content: '',
		});
		setRate(0)
	};

	return (
		<div className="flex flex-col justify-center items-center">
			<h1 className="text-[24px]">Rate Movie:</h1>
			<Input
				type="number"
				min={0}
				max={10}
				step={0.5}
				onChange={(e) => handleOnChangeRate(e)}
				className="m-2 text-[black] rounded-md h-[40px] text-center"
				value={rate}
			/>
			<Input
				type="text"
				name="date"
				value={review.date}
				placeholder="Example: YYYY-MM-DD"
				onChange={(e) => handleOnChangeReview(e)}
				className="m-2 text-[black] rounded-md h-[40px] text-center"
			/>
			<Input
				type="text"
				name="user"
				value={review.user}
				placeholder="Username"
				onChange={(e) => handleOnChangeReview(e)}
				className="m-2 text-[black] rounded-md h-[40px] text-center"
			/>
			<Input
				type="text"
				name="content"
				value={review.content}
				placeholder="Write your review"
				onChange={(e) => handleOnChangeReview(e)}
				className="m-2 text-[black] rounded-md h-[40px] text-center"
			/>
			<Button
				className="m-2 bg-[#DDDDDD] rounded-md h-[40px] p-2 flex items-center justify-center text-[black] w-[200px]"
				onClick={() => handleSubmit(movieDetail?.id, rate)}
				value="Send"
			/>
		</div>
	);
};
