import React from "react";
import { NavBarItem } from "./NavBarItem";

interface Page {
    name: string,
    relativePath: string,
    element: JSX.Element,
    extra_fn?(): void
}

interface Pages {
    pages: Page[]
}

export const NavBar = (props:Pages) => {
    const pages_list = props.pages.map((page, index: number) =>{
        return <li data-name={page.name} onClick={page.extra_fn} key={index}><NavBarItem name={page.name} relativePath={page.relativePath}></NavBarItem></li>
    })

    return (
        <div id="navbar">
            <ul>
                {pages_list}
            </ul>
        </div>
    )
}