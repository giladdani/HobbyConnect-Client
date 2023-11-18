import React, { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import { LoginPage } from '../login/LoginPage'
import { NavBar } from './NavBar'
import { HomePage } from '../HomePage'
import { ProfilePage } from '../profile/ProfilePage'
import { ActivityDetailsPage } from '../activities/ActivityDetailsPage'
import { ExplorePage } from '../explore/ExplorePage'
import { CreateActivityPage } from '../activities/CreateActivityPage'
import { FriendsPage } from '../friends/FriendsPage'
import { AdminPage } from '../admin/AdminPage'
import UsersService from '../../services/UsersService'
const logo =  require("../../images/logo.png")

interface User {
  username: string,
  fullName: string,
  balance: string,
  role: string,
  creation_date: string
}

export const MainPagesContainer = () => {
  
  const [user, setUser] = useState<null | User>(null);

  // Redirect to login page if no user token found
  useEffect(() => {
    if(!sessionStorage.getItem("userToken")){
      window.location.href = "/login";
    }
    else{
      get_user();
    }
  }, [])

  async function get_user() {
		const response = await UsersService.get_user_details(sessionStorage.getItem("userToken") || "");
		if(response.status === 200){
			setUser(response.data);
		}
		else{
			alert(response.data)
		}
	}

  const deleteToken = () => {
    sessionStorage.removeItem("userToken");
  }

  const pages = [{
    name: "Home",
    relativePath: "/home",
    element: <HomePage />,
  },
  {
    name: "Explore",
    relativePath: "/explore",
    element: <ExplorePage />
  },
  {
    name: "Create",
    relativePath: "/create",
    element: <CreateActivityPage />
  },
  {
    name: "Friends",
    relativePath: "/friends",
    element: <FriendsPage />
  },{
    name: "Profile",
    relativePath: "/profile",
    element: <ProfilePage />
  },{
    name: "Logout",
    relativePath: "/login",
    element: <LoginPage />,
    extra_fn: deleteToken
  },{
    name: "",
    relativePath: "explore/:id",
    element: <ActivityDetailsPage />
  }]
  // TODO: only add this page if user role is admin
  if(user?.role == "admin"){
    pages.push({
      name: "Admin Console",
      relativePath: "/admin",
      element: <AdminPage />
    })
  }
  
  const routes = pages.map((page, index) => <Route path={page.relativePath} element={page.element} key={index} />);

  return(
    <>
      <img src={logo} alt="logo" id="site_logo"></img>
      <NavBar pages={pages} />
      <Routes>
        {routes}
      </Routes>
    </>
    )
  }