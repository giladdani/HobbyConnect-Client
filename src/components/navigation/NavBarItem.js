import { NavLink } from "react-router-dom"

export const NavBarItem = (props) => {
    return (
        <NavLink to={props.relativePath}>{props.name}</NavLink>
    )
}