import React, { Component } from 'react';
import './pokemondata.css';

class PokemonData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: '',
			pokemonData: {
				imageURL: '',
				types: ['grass'],
				name: '',
				id: 1,
				stats: {
					hp: 100,
					attack: 20,
					defense: 90,
					'special-attack': 0,
					'special-defense': 0,
					speed: 120,
				},
				flavorText: '',
			},
		}
	}
	fetchWithErrorCheck(query, f) {
		fetch(query).then(data => {
			if(data.ok) {
				return data.json()
			} else {
				throw new Error('Invalid Pokemon name or ID');
			}
		}).then(f).catch(e => {
			this.setState({error: e.message});
		});
	}
	fetchData() {
		const requestedMon = this.props.match.params.name;
		this.setState({error: ''});
		this.fetchWithErrorCheck(
			`https://pokeapi.co/api/v2/pokemon/${requestedMon}/`,
			data => {
				const pokemonData = {};
				console.log(data);
				pokemonData.imageURL = data.sprites.front_default;
				pokemonData.types = data.types.map(x => x.type.name.charAt(0).toUpperCase()+x.type.name.slice(1));
				pokemonData.name = data.name.charAt(0).toUpperCase()+data.name.slice(1);
				pokemonData.id = data.id;
				pokemonData.stats = {};
				data.stats.forEach(x => pokemonData.stats[x.stat.name]=x.base_stat);
				console.log(pokemonData);
				this.setState({pokemonData: {...this.state.pokemonData, ...pokemonData}});
			}
		);
		this.fetchWithErrorCheck(
			`https://pokeapi.co/api/v2/pokemon-species/${requestedMon}/`,
			data => {
				let flavorText = '';
				for(let entry of data.flavor_text_entries) {
					if(entry.language.name==='en') {
						flavorText = entry.flavor_text.replace(/\r?\n/g,' ');
						break;
					}
				}
				this.setState({pokemonData: {...this.state.pokemonData, flavorText: flavorText}});
			}
		);
	}
	componentDidMount() {
		this.fetchData();
	}
	componentDidUpdate(prevProps) {
		if(this.props.match.params.name !== prevProps.match.params.name) {
			this.fetchData();
		}
	}
	render() {
		return (
			<div className="PokemonData">
				{
					this.state.pokemonData.id
						?<div>
							<img className="sprite" src={this.state.pokemonData.imageURL}/>
							<div className="name">{this.state.pokemonData.name}</div>
							<div className="types">{this.state.pokemonData.types.reduce((a,b)=>`${a} / ${b}`)} Type</div>
							<p className="flavor">{this.state.pokemonData.flavorText}</p>
							<ul className="baseStats">
								{Object.keys(this.state.pokemonData.stats).map(stat => (
									<li key={stat}>
										<div className="statLabel">{stat}:</div>
										<div 
											className="baseStatBar" 
											style={{width: (this.state.pokemonData.stats[stat]*100/255)+'%'}}
										>
											{this.state.pokemonData.stats[stat]}
										</div>
									</li>
								))}
							</ul>
						</div>
						:null
				}
				<p className="error">{this.state.error}</p>
			</div>
		);
	}
}

export default PokemonData;
