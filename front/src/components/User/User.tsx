import { useEffect, useState } from "react";
import { CiLogin } from "react-icons/ci";
import { ImExit } from "react-icons/im";
import { Link, useLocation } from "react-router-dom";
import { IUser } from "../../../../back/models/types";
import { DetailedDivProps } from "../../common/types";
import "./User.scss";

export interface UserProps extends DetailedDivProps {}

export const User = ({ className, ...props }: UserProps): JSX.Element => {
  const [user, setUser] = useState<IUser>();

  const { pathname } = useLocation();
  useEffect(() => {
    const profile = localStorage.getItem("profile");
    if (profile) setUser(JSON.parse(profile).user);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  if (!user) return <EmptyUser />;

  return (
    <div {...props} className={"user " + className}>
      <div className="img">
        <img src={user.image} alt="user_image" />
      </div>
      <div className="name">{user.name}</div>
      <button type="button" onClick={() => handleLogout()}>
        <ImExit size={15} />
      </button>
    </div>
  );
};

const EmptyUser = () => (
  <Link to={"/login"} className="user">
    <CiLogin />
    <span>Log In</span>
  </Link>
);
