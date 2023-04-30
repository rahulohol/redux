import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Filter = () => {
  const [searchparams,setSearchparams] = useSearchParams()
  const [category,setCategory]=useState(searchparams.getAll("category") || [])

  const handleFilter=(e)=>{
    let filter = e.target.value

    let naya = [...category];

    if (category.includes(filter)){
    naya.splice(naya.indexOf(filter),1)
    } else {
      naya.push(filter)
    }
    setCategory(naya)
  }


  useEffect(()=>{

    const param={};
    category && (param.category=category)
    setSearchparams(param);

  },[category,setSearchparams])

  // DO NOT CHANGE THE ORDER of the category filters: ie. Analog, Digital, Chronograph in the UI
  return (
    <div>
      <h3>Filters</h3>
      <div>Category</div>
      <div data-testid="filter-category">
        <div>
          <input type="checkbox" value="Analog" defaultChecked={category.includes("Analog")} onChange={handleFilter}/>
          <label>Analog</label>
        </div>
        <div>
          <input type="checkbox" value="Digital" defaultChecked={category.includes("Digital")} onChange={handleFilter}/>
          <label>Digital</label>
        </div>
        <div>
          <input type="checkbox" value="Chronograph" defaultChecked={category.includes("Chronograph")} onChange={handleFilter}/>
          <label>Chronograph</label>
        </div>
      </div>
    </div>
  );
};

export default Filter;
