import { useDispatch, useSelector } from 'react-redux';
import { SearchBar } from '../SearchBar';
import { useEffect, useState } from 'react';
import {
	alphabeticalOrder,
	filterDriversApiOrDb,
	filterDriversByTeam,
	getAllDrivers,
	getAllTeams,
	sortByBirthDate,
} from '../../Redux/actions';
import { Link } from 'react-router-dom';
import Style from './navbar.module.css';

const useGetData = () => {
	const dispatch = useDispatch();
	const teams = useSelector((state) => state.driversTeams);

	useEffect(() => {
		dispatch(getAllDrivers());
		dispatch(getAllTeams());
	}, [dispatch]);

	return teams;
};

export const Navbar = () => {
	const dispatch = useDispatch();
	const teams = useGetData();
	const [hasDateFilter, setHasDatetFilter] = useState(false);
	const [hasApiFilter, setHasApiFilter] = useState(false);

	const handlerFilter = (event) => {
		event.preventDefault();
		const team = event.target.value;
		dispatch(filterDriversByTeam(team));
		setHasDatetFilter(true);
	};

	const handleCleanFilters = () => {
		dispatch(getAllDrivers());
		setHasDatetFilter(false);
		setHasApiFilter(false);
	};

	const handleSort = (orden) => {
		dispatch(sortByBirthDate(orden));
	};

	const handlerOrder = (event) => {
		const { value } = event.target;
		dispatch(alphabeticalOrder(value));
	};

	const handleFilterFromApi = (isFromApi) => {
		setHasApiFilter(true);
		dispatch(filterDriversApiOrDb(isFromApi));
	};

	return (
		<nav className={Style.container}>
			<section className={Style.filter_container}>
				<select
					className={Style.select}
					onChange={handlerOrder}
					name="Orden alfabetico"
					defaultValue={'DEFAULT'}
				>
					<option value="DEFAULT" disabled>
						Orden alfabetico
					</option>
					<option value="A-Z">A-Z</option>
					<option value="Z-A">Z-A</option>
				</select>
				{!hasDateFilter && (
					<select
						className={Style.select}
						onChange={handlerFilter}
						name="teams"
						defaultValue={'DEFAULT'}
					>
						<option value="DEFAULT" disabled>
							Equipos
						</option>
						{teams.map((team, index) => (
							<option key={index} value={team}>
								{team}
							</option>
						))}
					</select>
				)}
				<button className={Style.button} onClick={() => handleSort('menor')}>
					Menor a mayor
				</button>
				<button className={Style.button} onClick={() => handleSort('mayor')}>
					Mayor a menor
				</button>
				<button className={Style.button} onClick={() => handleCleanFilters()}>
					Limpiar filtros
				</button>
			</section>

			<section className={Style.searchbar_container}>
				{!hasApiFilter ? (
					<>
						<button
							className={Style.button2}
							onClick={() => handleFilterFromApi(true)}
						>
							Mostrar drivers de la API
						</button>
						<button
							className={Style.button2}
							onClick={() => handleFilterFromApi(false)}
						>
							Conductores creados
						</button>
					</>
				) : null}
				<Link to="/form-page" className={Style.button2}>
					Crear conductor
				</Link>
				<SearchBar />
			</section>
		</nav>
	);
};
