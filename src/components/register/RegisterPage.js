import React, {useState} from "react";
import logo from "../../images/logo.png";
import UsersService from '../../services/UsersService'

export const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");

    const create_user = async() => {
        const response = await UsersService.create_user({username, password, fullName});
        if(response.status === 201){
            alert("User created!");
            window.location.href = '/login';
        }
    }

    return(
        <div>
            <img src={logo} alt="logo" id="site_logo"></img>
            <h1 className="center_elem">Register</h1>
            <table className="medium_window center_elem border">
                <tbody>
                    <tr>
                        <td><label>Username:</label></td><td><input type="text" value={username} onChange={(newValue) => { setUsername(newValue.target.value) }}></input></td>
                    </tr>
                    <tr>
                        <td><label>Password:</label></td><td><input type="password" value={password} onChange={(newValue) => { setPassword(newValue.target.value) }}></input></td>
                    </tr>
                    <tr>
                        <td><label>Full Name:</label></td><td><input type="text" value={fullName} onChange={(newValue) => { setFullName(newValue.target.value) }}></input></td>
                    </tr>
                    <tr>
                        <td colSpan="2"><button onClick={create_user}>Create</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

//     async handle_create_click(){
//         const response = await this.create_user();
//         const response_text = await response.text();
//         alert(response_text);
//         if (response.status === 201) {
//             window.location.href = "/login.html";
//         }
//     }

//     async create_user() {
        // try{
        //     const promise = fetch('/api/users',
        //     {
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json'
        //         },
        //         method: 'POST',
        //         body: JSON.stringify({full_name: this.state.name, id: this.state.id, email: this.state.email, password: this.state.password})
        //     })
        //     return promise;
        // }
        // catch(err){
        //     console.log(err);
        // }
// 	}