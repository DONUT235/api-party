import React, { Component } from 'react';
import './Pokemon.css';

class Pokemon extends Component {
	constructor(props) {
		super(props)
		this.state = {
			pokemonData: {},
			name: '',
		}
	}
	onChange = ev => {
		const o = {};
		o[ev.target.name] = ev.target.value;
		this.setState(o);
	};
	onSubmit = ev => {
		ev.preventDefault();
		fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.name.toLowerCase()}/`)
			.then(data => data.json())
			.then(data => {
				const pokemonData = {};
				console.log(data);
				pokemonData.imageURL = data.sprites.front_default;
				pokemonData.types = data.types.map(x => x.type.name);
				pokemonData.name = data.name.charAt(0).toUpperCase()+data.name.slice(1);
				pokemonData.id = data.id;
				pokemonData.stats = {};
				data.stats.forEach(x => pokemonData.stats[x.stat.name]=x.base_stat);
				console.log(pokemonData);
			});
	}
	render() {
		return (
			<div className="Pokemon">
				<img src="http://pluspng.com/img-png/pokemon-logo-png-file-international-pokemon-logo-svg-1000.png"/>
				<form onSubmit={this.onSubmit}>
					<input 
						type="text" 
						name="name"
						placeholder="Enter a pokemon's name or National Pokedex ID"
						onChange={this.onChange}
					/>
					<input type="submit" value="Search"/>
				</form>
			</div>
		);
	}
}

export default Pokemon;
