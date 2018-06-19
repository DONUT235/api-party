import React, { Component } from 'react';
import './Pokemon.css';
import PokemonData from './PokemonData';
import { Route } from 'react-router-dom';

class Pokemon extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			error: '',
		}
	}
	onChange = ev => {
		const o = {};
		o[ev.target.name] = ev.target.value;
		this.setState(o);
	};
	onSubmit = ev => {
		const requestedMon = this.state.name.toLowerCase(); //fortunately, IDs and names work equally well by default.
		ev.preventDefault();                                //Thanks, PokeAPI!
		this.props.history.push(`/pokemon/${requestedMon}`);
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
				<p className="error">{this.state.error}</p>
				<Route path="/pokemon/:name" component={PokemonData}/> 
			</div>
		);
	}
}

export default Pokemon;
