import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDriversByName } from '../../Redux/actions';
import Style from './searchbar.module.css';

export const SearchBar = () => {
	const dispatch = useDispatch();
	const [input, setInput] = useState('');

	const handleOnchange = (event) => {
		setInput(event.target.value);
	};

	const handleSearch = async () => {
		dispatch(getDriversByName(input));
	};

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			handleSearch();
		}
	};

	return (
		<div className={Style.container}>
			<input
				className={Style.searchbar}
				type="search"
				placeholder="Buscar conductor..."
				value={input}
				onChange={(event) => handleOnchange(event)}
				onKeyDown={handleKeyDown}
			/>
			<button className={Style.button} onClick={() => handleSearch()}>
				Buscar
			</button>
		</div>
	);
};
