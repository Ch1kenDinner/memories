import { useEffect, useState } from "react";
import { MdOutlineClear } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import { DetailedDivProps } from "../../common/types";
import "./Search.scss";

export interface SearchProps extends DetailedDivProps {}

export const Search = (props: SearchProps): JSX.Element => {
  const [search, setSearch] = useSearchParams();

  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (value) {
      setSearch({ search: value });
    } else {
      setSearch();
    }
  }, [value]);

  return (
    <div {...props} className="search">
      <input
        value={value}
        type="text"
        onChange={(e) => setValue(e.target.value)}
				placeholder="Search..."
      />
      <button onClick={() => setValue("")}>
        <MdOutlineClear />
      </button>
    </div>
  );
};
