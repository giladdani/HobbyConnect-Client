class MessagesPage extends React.Component {
	constructor(props) {
		super(props);
        this.state = {
            navbar_mode: undefined,
            user_token: extract_token_from_cookie()
        }
	}

    async componentDidMount() {
		const user_permissions = await verify_page_access();
		if(user_permissions.includes("admin")){
			this.setState({navbar_mode: "full"});
		}
		else if(user_permissions.includes("user")){
			this.setState({navbar_mode: "normal"});
		}
	}

	render() {
		return(
			<div>
				<NavBar mode={this.state.navbar_mode}></NavBar>
				<h1 className="center_elem">Messages</h1>
				<table className="full_width">
					<tbody>
						<tr>
							<td>
								<h2 className="center_elem">Your last 10 messages</h2>
								<RecentMessagesList user_token={this.state.user_token} max="10"></RecentMessagesList>
							</td>
							<td className="center_elem">
								<h2>Send a message</h2>
								<SendMessage user_token={this.state.user_token}></SendMessage>
							</td>
						</tr>
					</tbody>
				</table>
				
			</div>
		)
	}
}

class SendMessageToAll extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            text: undefined
        }
        this.handle_text_change = this.handle_text_change.bind(this);
        this.handle_send_message_to_all_click = this.handle_send_message_to_all_click.bind(this);
    }

    handle_text_change(event){
        this.setState({text: event.target.value})
    }

    async handle_send_message_to_all_click(){
        if(this.state.text){
            const response = await this.send_message_to_all(this.state.text);
            if(response.status == 201){
                location.reload();
            }
            else if(response.status == 403){
                alert("User token expired. Try to relogin");
            }
            else{
                const response_text = await response.text();
                alert(response_text);
            }
        }
    }

    async send_message_to_all(text){
        try{
            const promise = fetch(`/api/messages`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': this.props.user_token
                },
                method: 'POST',
                body: JSON.stringify({text: text})
            })
            return promise;
        }
        catch(err){
            console.log(err);
        }    
    }

    render(){
        return (
            <div>
                <textarea rows="10" cols="50" value={this.state.text} onChange={this.handle_text_change} placeholder="Write something.."></textarea>
                <br/>
                <button onClick={this.handle_send_message_to_all_click}>Send</button>
            </div>
        )
    }
}

class SendMessage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            users: [],
            to_user_id: undefined,
            text: undefined
        }
        this.handle_text_change = this.handle_text_change.bind(this);
        this.handle_to_user_change = this.handle_to_user_change.bind(this);
        this.handle_send_message_click = this.handle_send_message_click.bind(this);
    }

    async componentDidMount() {
		const users = await this.fetch_users();
		await this.update_list(users);
        this.setState({to_user_id: this.state.users[0].id});
	}

    update_list(users) {
		this.setState({users: users});
	}

    handle_text_change(event){
        this.setState({text: event.target.value})
    }

    handle_to_user_change(event){
        this.setState({to_user_id: event.target.value})
    }

    async handle_send_message_click(){
        if(this.state.text && this.state.to_user_id){
            const to_user_id = parseInt(this.state.to_user_id);
            const response = await this.send_message(this.state.text, to_user_id);
            if(response.status == 201){
                location.reload();
            }
            else if(response.status == 403){
                alert("User token expired. Try to relogin");
            }
            else{
                const response_text = await response.text();
                alert(response_text);
            }
        }
    }

    async fetch_users() {
		const response = await fetch('/api/users', 
		{
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
                'authorization': this.props.user_token
			},
			method: 'GET'
		});
		if (response.status != 200) throw new Error('Error while fetching messages');
		const data = await response.json();
		return data;
	}

    async send_message(text, to_user_id){
        try{
            const promise = fetch(`/api/messages`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': this.props.user_token
                },
                method: 'POST',
                body: JSON.stringify({text: text, receiver_id: to_user_id })
            })
            return promise;
        }
        catch(err){
            console.log(err);
        }    
    }

    render(){
        const users_options = this.state.users.map((item, index) =>{
			return <option key={index} value={item.id}>{item.full_name}</option>
		})
        return (
            <div>
                <textarea rows="10" cols="50" value={this.state.text} onChange={this.handle_text_change} placeholder="Write something.."></textarea>
                <br/>
                <label>To: </label><select onChange={this.handle_to_user_change}>
                    {users_options}
                </select>

                <button onClick={this.handle_send_message_click}>Send</button>
            </div>
        )
    }
}

class RecentMessagesList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            user: undefined,
            all_messages: [],
			recent_messages: []
		}
	}

	async componentDidMount() {
        const user = await this.get_user_details();
		this.setState({user: user});
		const messages = await this.fetch_all_messages();
		await this.update_list(messages);
	}

	async fetch_all_messages() {
		const response = await fetch('/api/messages', 
		{
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
                'authorization': this.props.user_token
			},
			method: 'GET'
		});
		if (response.status != 200) throw new Error('Error while fetching messages');
		const data = await response.json();
		return data;
	}

    async get_user_details() {
		const response = await fetch('/api/users/about', 
		{
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
                'authorization': this.props.user_token
			},
			method: 'GET'
		});
		if (response.status != 200) throw new Error('Error while fetching user details');
		const data = await response.json();
		return data;
	}

	update_list(all_messages) {
        const my_recent_messages = all_messages.filter(message => (message.receiver_id == this.state.user.id || message.sender_id == this.state.user.id)).reverse();
		this.setState({all_messages: all_messages, recent_messages: my_recent_messages.slice(0, 10)});
	}

	render() {
		const messages_list = this.state.recent_messages.map((item, index) =>{
			return <li className="padded_item" key={index}><MessageListItem message={item}></MessageListItem></li>
		})
		return (
			<div>
                <ul>
                    {messages_list}
                </ul>
			</div>			
		)
	}
}

class MessageListItem extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
        const to_symbol = "->";
		return (
			<div className="border padded_item data_list_item">
                <h4>{this.props.message.date_time}</h4>
				<h2>{this.props.message.sender_name} {to_symbol} {this.props.message.receiver_name} </h2>
				<h3>{this.props.message.text}</h3>
			</div>
		)
	}
}