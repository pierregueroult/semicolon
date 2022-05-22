import { PageTypes } from "../../interfaces";

const SearchPage = ({ searchValue }: PageTypes) => {
  return <div className="search">{searchValue}</div>;
};

export default SearchPage;
