import { Link } from "react-router-dom";
import { useLogoutMutation } from "../reducers/auth";
import { useSelector } from "react-redux";

function Nav() {
  const [logout] = useLogoutMutation();
  const user = useSelector((state) => state.auth.credentials.user) || "";

  return (
    <nav>
      <div>
        <Link to={"/"}>HOME</Link>
        <Link to={"/purchase/6"}>Purchase 6</Link>
        {user && <button onClick={logout}>Logout</button>}
      </div>
      {user && <h2>Welcome {user.username}!</h2>}
    </nav>
  );
}

export default Nav;
