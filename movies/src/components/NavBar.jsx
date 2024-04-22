import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './generic-components/Button';
import { filterByGenre, loggOut, searchMovies } from '../redux/actions/actions';
import { Input } from './generic-components/Input';

export const NavBar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userLogged = useSelector((state) => state.reducer.logged);
	const genres = useSelector((state) => state.reducer.allGenres);

	const [inputValue, setInputValue] = useState('');
	const [selectedGenre, setSelectedGenre] = useState(0);

	const handleOnClick = () => {
		dispatch(loggOut());
		navigate('/');
	};

	const handleOnChangeInput = (e) => {
		e.preventDefault();
		setInputValue(e.target.value);
		dispatch(searchMovies(e.target.value));
	};

	const handleOnChangeSelect = (e) => {
		e.preventDefault();
		setSelectedGenre(parseInt(e.target.value));
		dispatch(filterByGenre(selectedGenre));
	};

	return (
		 <div className="bg-[#EEEEEE]">
            <nav className="flex flex-row items-center sm:justify-between mx-2 p-2 w-full sm:w-full flex-wrap sm:flex-nowrap">
                <div className="flex p-2">
                    <select
                        name="genre"
                        value={selectedGenre}
                        onChange={(e) => {
                            handleOnChangeSelect(e);
                        }}
                        className="m-2 p-2 border border-black rounded-lg w-full min-w-[90px] sm:w-auto"
                    >
                        <option disabled value="Select Genre">
                            Select Genre
                        </option>
                        {genres.length > 0
                            ? genres.map((genre) => (
                                <option key={genre.id} value={genre.id}>
                                    {genre.name}
                                </option>
                            ))
                            : null}
                    </select>
                </div>
                <div className="flex-shrink-0 flex-nowrap p-2">
                    <Input
                        type="text"
                        placeholder="Search"
                        className="m-2 rounded-xl p-2 pr-0 w-full min-w-[100px] sm:max-w-[300px]"
                        onChange={(e) => handleOnChangeInput(e)}
                        value={inputValue}
                    />
                </div>
                <ul className="flex p-2 pl-0">
                    <li className="flex items-center m-2">
                        <Link to="/favorites">Favorites</Link>
                    </li>
                    {!userLogged ? (
                        <li className="flex items-center bg-[#B5C0D0] rounded-lg p-2">
                            <Link to="/login" className="text-center">
                                Log In
                            </Link>
                        </li>
                    ) : (
                        <div className="flex">
                            <li className="m-2">
                                <Link to="/profile">My Profile</Link>
                            </li>
                            <li className="m-2">
                                <Button value="Log Out" onClick={() => handleOnClick()} />
                            </li>
                        </div>
                    )}
                </ul>
            </nav>
        </div>
	);
};
