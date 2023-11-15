import { Dispatch, RootState } from "store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";

const Navigation = ():JSX.Element => {
  const dispatch = useDispatch<Dispatch>();
  const email = useSelector((state: RootState) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch.auth.logout();
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navbar-start">
        <NavLink className="navbar-item" to="/">
          THE event app
        </NavLink>
      </div>
      <div className="navbar-end">
        <NavLink className="navbar-item" to="/">
          Home
        </NavLink>
        {email ? (
          <>
            <NavLink className="navbar-item" to="/create">
              Create
            </NavLink>
            <NavLink className="navbar-item" to="/user">
              Profile
            </NavLink>
          </>
        ) : null}
      </div>
      {email ? (
        <button className="btn btn-outline-primary" onClick={handleLogOut}>
          Logout
        </button>
      ) : (
        <button className="btn btn-outline-primary" onClick={handleLogin}>
          Login
        </button>
      )}
    </div>
  );
};

export default Navigation;
