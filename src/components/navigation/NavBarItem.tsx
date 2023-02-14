import { NavLink } from "react-router-dom"

interface Page {
    relativePath: string,
    name: string
}

export const NavBarItem = (props:Page) => {
    return (
        <NavLink to={props.relativePath}>{props.name}</NavLink>
    )
}