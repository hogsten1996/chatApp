import { Link } from "react-router-dom";
import { useLogoutMutation } from "../reducers/auth";

function Nav() {
  const [logout] = useLogoutMutation();

  return (
    <nav>
      <Link to={"/"}>HOME</Link>
      <Link to={"/purchase/6"}>Purchase 6</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}

export default Nav;
