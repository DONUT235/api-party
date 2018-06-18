import React, { Component } from 'react';

class GithubUser extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: {},
		};
	}
	fetchUserData() {
		fetch(`https://api.github.com/users/${this.props.match.params.username}`)
			.then(response => response.json())
			.then(user => this.setState({user: user}));
	}
	componentDidMount() {
		this.fetchUserData();
	}
	componentDidUpdate(prevProps) {
		if(prevProps.match.params.username != this.props.match.params.username) {
			this.fetchUserData();
		}
	}
	render() {
		const user = this.state.user;
		return (
			<div className="GithubUser">
				<img src={user.avatar_url} />
				<a href={user.html_url} target="_blank">
					<h2>Github User: {user.name} ({user.login})</h2>
				</a>
			</div>
		);
	}
}

export default GithubUser;
