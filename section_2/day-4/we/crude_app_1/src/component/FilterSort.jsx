import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

/* 

1. The user should be able to toggle the checkbox
2. The user should be able to update that data in the URL Search Params 
3. The Checkbox should rename selected (if it was already selected), when the page refreshes.

*/

const FilterSort = () => {
  const [searchParams,setSearchParams]=useSearchParams();
  const [category, setCategory] = useState(searchParams.getAll("genre")||[]);

  const [sortBy,setSortBy]=useState(searchParams.get('sortBy')||'');


  const handleFilter = (e) => {
    //!  if the option is present in the category array,remove it
    //? else add it to the category array

    const option = e.target.value; // This  is for handling the event.

    let newCategory = [...category]; // this is connected with useState and spreading the data form there.

    if (newCategory.includes(option)) {
      //! remove it
      newCategory.splice(newCategory.indexOf(option), 1);
    } else {
      //* add it
      newCategory.push(option);
    }
    setCategory(newCategory)

    
  };
  console.log(category)

  const handleSortBy=(e)=>{
    setSortBy(e.target.value)
  }

  useEffect(() => {
    const params={};
    category && (params.genre=category) //if category is present add in params line 37
    sortBy && (params.sortBy=sortBy);//if sortBy is present add in params line 37

    setSearchParams(params)
  
  }, [category,setSearchParams,sortBy]);

  return (
    <div>
      <h2>Filter</h2>
      <div>
        <input type="checkbox" value="K-Pop" onChange={handleFilter} defaultChecked={category.includes('K-Pop')}/>
        <label>K-Pop</label>
      </div>
      <div>
        <input type="checkbox" value="Country" onChange={handleFilter} defaultChecked={category.includes('Country')}/>
        <label>Country</label>
      </div>
      <div>
        <input type="checkbox" value="Pop" onChange={handleFilter} defaultChecked={category.includes('Pop')}/>
        <label>Pop</label>
      </div>
      <div>
        <input type="checkbox" value="heavy metal" onChange={handleFilter} defaultChecked={category.includes('heavy metal')}/>
        <label>Heavy Metal</label>
      </div>
      
      <h2>Sort</h2>
      <div onChange={handleSortBy}>
        <div>
          <input type='radio' value='asc' name='sortBy' defaultChecked={sortBy === 'asc'} />
          <label>Ascending</label>
        </div>
        <div>
          <input type='radio' value='desc' name='sortBy' defaultChecked={sortBy === 'desc'} />
          <label>Descending</label>
        </div>
      </div>
    </div>
  );
};

export default FilterSort;
