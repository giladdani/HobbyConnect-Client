class Indicator extends React.Component {
	constructor(props) {
		super(props);
        this.state = {
            new_items_available: false
        }
	}

    async componentDidMount() {
        const this_bounded_update_items = this.update_items.bind(this);
        setInterval(this_bounded_update_items, 30000);
	}
    
    async update_items(){
        let new_items;
        if(this.props.mode == "posts"){
            new_items = await this.fetch_all_posts();
        }
        else if(this.props.mode == "messages"){
            const all_messages = await this.fetch_all_messages();
            new_items = all_messages.filter(message => (message.receiver_id == this.props.user.id || message.sender_id == this.props.user.id));
        }
        if(new_items.length > 0 && this.props.items.length > 0){
            if(new_items.reverse()[0].id != this.props.items[0].id){
                this.setState({new_items_available: true});
            }
        }
        else if(new_items.length > 0){
            this.setState({new_items_available: true});
        }
    }

    async fetch_all_posts() {
		const response = await fetch('/api/posts', 
		{
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
                'authorization': this.props.user_token
			},
			method: 'GET'
		});
		if (response.status != 200) throw new Error('Error while fetching posts');
		const data = await response.json();
		return data;
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

	render() {
        const url = this.props.mode == "posts" ? "/homepage.html" : "/messages.html";
        const indicator_text = <a href={url}><label className="indicator_text">{this.state.new_items_available ? `New ${this.props.mode} available!` : ''}</label></a>
		return (
            <div>{indicator_text}</div>
        )
	}
}

async function validate_user_token(token){
    try{
        const promise = fetch('/api/users/permissions',
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': token
            },
            method: 'GET'
        })
        return promise;
    }
    catch(err){
        console.log(err);
    }
}

function extract_token_from_cookie(){
    if(document.cookie)
        return JSON.parse(document.cookie).token;
    else{
        return undefined;
    }
}

async function verify_page_access(){
    if(document.cookie){
        const token = JSON.parse(document.cookie).token;
        const response = await validate_user_token(token);
        if(response.status == 403){
            location.href = "/login.html";
        }
        else{
            const permissions = await response.json();
            if(permissions.roles.length > 0){
                return permissions.roles;
            }
            else{
                location.href = "/login.html";
            }
        }
    }
    else{
        location.href = "/login.html";
    }
}