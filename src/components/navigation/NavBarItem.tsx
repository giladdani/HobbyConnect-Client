import { NavLink } from "react-router-dom"
import { Page } from "../../interfaces/Page"

export const NavBarItem = (props:Page) => {
    return (
        <NavLink to={props.relativePath}>{props.name}</NavLink>
    )
}