import {Link} from "react-router-dom";

function Nav(){
    return(
        <nav>
            <Link to={"/"}>HOME</Link>
            <Link to={"/purchase/6"}>
                Purchase 6
            </Link>
        </nav>
    )
}

export default Nav;