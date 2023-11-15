import { useState } from "react";
import { Dispatch } from "store";
import { useDispatch } from "react-redux";
import { SearchKeys } from "models/events";

type DropdownProps = {
  handleSearch(): void;
};

type SearchProperty = 'name' | 'category'

const Dropdown = (props:DropdownProps):JSX.Element => {
  const dispatch = useDispatch<Dispatch>();

  const [searchValue, setSearchValue] = useState("");
  const [searchProperty, setSearchProperty] = useState<SearchProperty>("category");

  const searchEvents = async(searchProperty: SearchProperty, searchValue: string) => {
    let searchBy:SearchKeys = ''
    if(searchProperty === 'category')searchBy = 'segmentName'
    if(searchProperty === 'name')searchBy = 'keyword'
    dispatch.events.getSearchedEvents({searchProperty:searchBy, searchValue})
    props.handleSearch()

  };

  return (
    <>
      <div className="text-center mt-20">Search by:</div>
      <div className="w-6/12 flex flex-col items-center m-auto mt-12 lg:w-full lg:flex lg:flex-row lg:justify-center lg:items-start">
        <select
          className="select select-ghost-primary lg:mr-12 mb-12 mr-0"
          onChange={(e) => {
            setSearchProperty(e.target.value as SearchProperty);
          }}
          value={searchProperty}
        >
          <option value="category">Category</option>
          <option value="name">Name</option>
        </select>
        <input
          className="input-ghost-primary input mb-12 mr-0 lg:mr-12"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder=""
        />
        <button className="btn-secondary btn" onClick={() => searchEvents(searchProperty, searchValue)}>
          Search
        </button>
      </div>
    </>
  );
};

export default Dropdown;
