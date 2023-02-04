import { ga } from "../../common/helpers";
import { DetailedDivProps } from "../../common/types";
import { Pagination } from "../../components/Pagination/Pagination";
import { Search } from "../../components/Search/Search";
import { User } from "../../components/User/User";
import { PostForm } from "../../sections/PostForm/PostForm";
import { Posts } from "../../sections/Posts/Posts";
import "./Home.scss";

export interface IHome extends DetailedDivProps {}

export const Home = (): JSX.Element => {
  return (
    <div className="home">
      <User className="user" style={ga("us")} />
      <Search style={ga("se")} />
      <Posts style={ga("ps")} />
      <PostForm style={ga("pf")} />
      <Pagination className="pa" style={ga("pa")} />
    </div>
  );
};
