import { useDispatch, useSelector } from "react-redux";
import { setFilter, selectFilter } from "../../redux/filterSlice";

const SearchBox = () => {
  const dispatch = useDispatch();
  const search = useSelector(selectFilter);

  const handleSearchChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <div>
      <p>Find contacts by name</p>
      <input type="text" value={search} onChange={handleSearchChange} />
    </div>
  );
};

export default SearchBox;
