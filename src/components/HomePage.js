import React from 'react';

export const HomePage = () => {
	return(
		<div className='center_elem'>
			<h1>Welcome to GameHub!</h1>
			<h4>The best place to buy games and chat with friends!</h4>
		</div>
	)
}

// class HomePage extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
//             navbar_mode: undefined,
// 			user_token: extract_token_from_cookie(),
// 			posts: [],
// 			messages: [],
// 			user: undefined
//         }
// 		this.posts_loaded = this.posts_loaded.bind(this);
// 	}

// 	async componentDidMount() {
// 		const user_permissions = await verify_page_access();
// 		if(user_permissions.includes("admin")){
// 			this.setState({navbar_mode: "full"});
// 		}
// 		else if(user_permissions.includes("user")){
// 			this.setState({navbar_mode: "normal"});
// 		}

// 		const user = await this.get_user_details();
// 		this.setState({user: user});
// 		const messages = await this.fetch_all_messages();
// 		const my_messages = messages.filter(message => (message.receiver_id == this.state.user.id || message.sender_id == this.state.user.id)).reverse();
// 		this.setState({messages: my_messages});
// 	}

// 	posts_loaded(posts){
// 		this.setState({posts: posts});
// 	}

// 	async fetch_all_messages() {
// 		const response = await fetch('/api/messages', 
// 		{
// 			headers: {
// 				'Accept': 'application/json',
// 				'Content-Type': 'application/json',
//                 'authorization': this.state.user_token
// 			},
// 			method: 'GET'
// 		});
// 		if (response.status != 200) throw new Error('Error while fetching messages');
// 		const data = await response.json();
// 		return data;
// 	}

// 	async get_user_details() {
// 		const response = await fetch('/api/users/about', 
// 		{
// 			headers: {
// 				'Accept': 'application/json',
// 				'Content-Type': 'application/json',
//                 'authorization': this.state.user_token
// 			},
// 			method: 'GET'
// 		});
// 		if (response.status != 200) throw new Error('Error while fetching user details');
// 		const data = await response.json();
// 		return data;
// 	}

// 	render() {
// 		return(
// 			<div>
// 				<NavBar mode={this.state.navbar_mode}></NavBar>
// 				<h1 className="center_elem">Home Page</h1>
// 				<Indicator mode="posts" items={this.state.posts} user_token={this.state.user_token}></Indicator>
// 				<Indicator mode="messages" items={this.state.messages} user_token={this.state.user_token} user={this.state.user}></Indicator>
// 				<table className="full_width">
// 					<tbody>
// 						<tr>
// 							<td>
// 								<h2 className="center_elem">Your last post</h2>
// 								<MyLastPost user_token={this.state.user_token}></MyLastPost>
// 								<h2 className="center_elem">Latest 10 posts</h2>
// 								<RecentPostsList user_token={this.state.user_token} max="10" notify_posts_loaded={this.posts_loaded}></RecentPostsList>
// 							</td>
// 							<td className="center_elem">
// 								<h2>Create a post</h2>
// 								<CreatePost user_token={this.state.user_token}></CreatePost>
// 							</td>
// 						</tr>
// 					</tbody>
// 				</table>
				
// 			</div>
// 		)
// 	}
// }

// export default HomePage;