import styles from './styles.scss';

import readPokemons from './js/components/read';

import searchFilter from './js/components/searchFilter';
import {openModal} from './js/components/modal';

addEventListener('DOMContentLoaded', (e) => {
	readPokemons();
	searchFilter();
	openModal();
});
