import React from "react";
import { NavBarItem } from "./NavBarItem";

export const NavBar = (props) => {
    const pages_list = props.pages.map((item, index) =>{
        return <li onClick={item.extra_fn} key={index}><NavBarItem name={item.name} relativePath={item.relativePath}></NavBarItem></li>
    })

    return (
        <div id="navbar">
            <ul>
                {pages_list}
            </ul>
        </div>
    )
}