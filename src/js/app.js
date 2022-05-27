import readPokemons from './components/read';
import searchFilter from './components/searchFilter';
import {openModal} from './components/modal';

export const loadPokemons = () => {
	addEventListener('DOMContentLoaded', (e) => {
		readPokemons();
		searchFilter();
		openModal();
	});
};
