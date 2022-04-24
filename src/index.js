import styles from './styles.scss';

import {readAll} from './js/https-axios';
import readPokemons from './js/components/read';
// import './js/components/read';
import searchFilter from './js/components/searchFilter';

addEventListener('DOMContentLoaded', (e) => {
	// readAll();

	readPokemons();
	searchFilter();
});
