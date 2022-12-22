import React from "react";
import { GenerateGiftCode } from "../giftcodes/GenerateGiftCode";
import { GrantCredits } from "../giftcodes/GrantCredits";

export const AdminPage = () => {
    return(
        <div>
            <h1 className="center_elem">Admin Console</h1>
            <table className="full_width center_elem">
                <tbody>
                    <tr>
                        <td>
                            <h2>Manage Users</h2>
                        </td>
                        <td>
                            <h2>Grant credit</h2>
                            <GrantCredits />
                        </td>
                        <td>
                            <h2>Generate gift code</h2>
                            <GenerateGiftCode />
                        </td> 
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

// class ManageUsers extends React.Component {
// 	constructor(props) {
// 		super(props);
//         this.state = {
//             users: [],
//             user_id: undefined
//         }
//         this.handle_approve_click = this.handle_approve_click.bind(this);
//         this.handle_suspend_click = this.handle_suspend_click.bind(this);
//         this.handle_delete_click = this.handle_delete_click.bind(this);
//         this.handle_user_change = this.handle_user_change.bind(this);
// 	}

//     async componentDidMount() {
// 		const users = await this.fetch_users();
// 		await this.update_list(users);
//         this.setState({user_id: this.state.users[0].id});
// 	}

//     update_list(users) {
// 		this.setState({users: users.filter(user => user.role != "admin")});
// 	}

//     async handle_approve_click(){
//         const response = await this.change_user_status(this.state.user_id, "active");
//         const response_text = await response.text();
//         alert(response_text);
//     }

//     async handle_suspend_click(){
//         const response = await this.change_user_status(this.state.user_id, "suspended");
//         const response_text = await response.text();
//         alert(response_text);
//     }

//     async handle_delete_click(){
//         const response = await this.delete_user(this.state.user_id);
//         const response_text = await response.text();
//         alert(response_text);
//         if(response.status == 200){
//             location.reload();
//         }
//     }

//     handle_user_change(event){
//         this.setState({user_id: event.target.value})
//     }

//     async fetch_users() {
// 		const response = await fetch('/api/users', 
// 		{
// 			headers: {
// 				'Accept': 'application/json',
// 				'Content-Type': 'application/json',
//                 'authorization': this.props.user_token
// 			},
// 			method: 'GET'
// 		});
// 		if (response.status != 200) throw new Error('Error while fetching messages');
// 		const data = await response.json();
// 		return data;
// 	}

//     async change_user_status(id, status){
//         try{
//             const promise = fetch(`/api/users/${id}`,
//             {
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                     'authorization': this.props.user_token
//                 },
//                 method: 'PUT',
//                 body: JSON.stringify({status: status})
//             })
//             return promise;
//         }
//         catch(err){
//             console.log(err);
//         }
//     }

//     async delete_user(id){
//         try{
//             const promise = fetch(`/api/users/${id}`,
//             {
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                     'authorization': this.props.user_token
//                 },
//                 method: 'DELETE'
//             })
//             return promise;
//         }
//         catch(err){
//             console.log(err);
//         }
//     }

// 	render() {
//         const users_options = this.state.users.map((item, index) =>{
//             return <option key={index} value={item.id}>{item.full_name}</option>
// 		})
// 		return (
//             <div className="center_elem">
//                 <label>Select user: </label>
//                 <select onChange={this.handle_user_change}>
//                     {users_options}
//                 </select>
//                 <br/>
//                 <button onClick={this.handle_approve_click}>Approve</button>
//                 <button onClick={this.handle_suspend_click}>Suspend</button>
//                 <button onClick={this.handle_delete_click}>Delete</button>
//             </div>
//         )
// 	}
// }

// class AdminPage extends React.Component {
// 	constructor(props) {
// 		super(props);
//         this.state = {
//             navbar_mode: undefined,
//             user_token: extract_token_from_cookie()
//         }
// 	}

//     async componentDidMount() {
// 		const user_permissions = await verify_page_access();
// 		if(user_permissions.includes("admin")){
// 			this.setState({navbar_mode: "full"});
// 		}
// 		else if(user_permissions.includes("user")){
//             location.href = "/login.html";
// 		}
// 	}
    
// 	render() {
		
// 	}
// }