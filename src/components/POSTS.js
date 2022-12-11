class CreatePost extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            text: undefined
        }
        this.handle_text_change = this.handle_text_change.bind(this);
        this.handle_create_post_click = this.handle_create_post_click.bind(this);
    }

    handle_text_change(event){
        this.setState({text: event.target.value})
    }

    async handle_create_post_click(){
        if(this.state.text){
            const response = await this.create_post(this.state.text);
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

    async create_post(text){
        const user_id = parseInt(this.props.user_id);
        try{
            const promise = fetch(`/api/posts`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': this.props.user_token
                },
                method: 'POST',
                body: JSON.stringify({text: text, user_id: user_id})
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
                <button onClick={this.handle_create_post_click}>Post</button>
            </div>
        )
    }

}

class PostListItem extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="border padded_item data_list_item">
				<h4>{this.props.post.date_time}</h4>
				<h2>{this.props.post.creator_name}</h2>
				<h3>{this.props.post.text}</h3>
			</div>
		)
	}
}

class RecentPostsList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			all_posts: [],
			recent_posts: []
		}
	}

	async componentDidMount() {
		const posts = await this.fetch_all_posts();
		await this.update_list(posts);
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

	update_list(all_posts) {
		this.setState({all_posts: all_posts, recent_posts: all_posts.reverse().slice(0, this.props.max)});
		this.props.notify_posts_loaded(all_posts);
	}

	render() {
		const posts_list = this.state.recent_posts.map((item, index) =>{
			return <li className="padded_item" key={index}><PostListItem post={item}></PostListItem></li>
		})
		return (
			<div>
                <ul>
                    {posts_list}
                </ul>
			</div>			
		)
	}
}

class MyLastPost extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			user: undefined,
			post: undefined
		}
	}

	async componentDidMount() {
		const user = await this.get_user_details();
		this.setState({user: user});
		const posts = await this.fetch_all_posts();
		await this.update_list(posts);
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

	update_list(all_posts) {
		const my_recent_posts = all_posts.filter(post => post.creator_id == this.state.user.id).reverse();
		this.setState({post: my_recent_posts[0]});
	}

	render() {
		if(this.state.post){
			return (
				<div>
					<ul>
						<li className="padded_item">
							<PostListItem post={this.state.post}></PostListItem>
						</li>
					</ul>
				</div>			
			)
		}
		else{
			return <div>No post to show</div>
		}
	}
}