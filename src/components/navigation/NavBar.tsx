import React from "react";
import { NavBarItem } from "./NavBarItem";
import { Page } from "../../interfaces/Page";

export const NavBar = (props: { pages: Page[] }) => {
    const pages_list = props.pages.map((page, index: number) =>{
        return <li data-name={page.name} onClick={page.extra_fn} key={index}><NavBarItem name={page.name} relativePath={page.relativePath} element={page.element}></NavBarItem></li>
    })

    return (
        <div id="navbar">
            <ul>
                {pages_list}
            </ul>
        </div>
    )
}