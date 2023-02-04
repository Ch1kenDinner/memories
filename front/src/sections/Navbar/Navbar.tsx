import { DetailedDivProps } from "../../common/types";
import { User } from "../../components/User/User";
import "./Navbar.scss";

export interface INavbar extends DetailedDivProps {}

export const Navbar = ({
  style,
  className,
  ...props
}: INavbar): JSX.Element => {
  return (
    <div style={style} className={"navbar " + className ?? ""}>
      <User />
    </div>
  );
};
