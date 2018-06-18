import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import './App.css';
import Github from './Github';


class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="App-header">
					<h3>Ain't no party like an </h3>
					<h1>API Party</h1>
				</div>
				<ul className="navLinks">
					<li>
						<NavLink to="/github">Github API</NavLink>
					</li>
				</ul>

				<Switch>
					<Route path="/github" component={Github}/>
					<Route render={()=>(
						<p>To get started click an API link.</p>
					)}/>
				</Switch>
			</div>
		);
	}
}

export default App;
