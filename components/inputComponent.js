import planets from "../utils/planetArray";
import { useState } from "react";
export default function InputComponent({toDisplay, setToDisplay, setShowDownloadButton }) {
  //setting state which will return an array from the user's input
  const [toGenerate, setToGenerate] = useState([]);
  // on input change generated string will be converter to array by splitting by ','
  const handleChange = (e) => {
    e.preventDefault();
    const string = e.target.value;
    
    let arr = string.split(",");
    // if there is any falsy value it will be eliminated
    setToGenerate(arr.filter((e) => e));
  };
  const handleClick = (e) => {
    console.log(toGenerate);
   
    const toSearch = toGenerate.map((item, index) => {
      item = item.trim();
      return planets.filter((e) => e.name === item.toLowerCase());
      
    });
    //   console.log(toSearch);
    // if any input is not available in data, then toSearch array returns empty array element, that's why we filter only those arrays which are not empty
    setToDisplay(toSearch.filter((e) => e.length > 0));
    e.preventDefault();

  };
  return (
    <>
    <div className="flex items-start  justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ">
      <div className='block w-full px-3 py-0'>
      <input 
        type="text"
        name="planets"
        className="appearance-none rounded-none  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        onChange={handleChange}
      />
      {toDisplay.length ? null : (<span  className='text-gray-500'>Enter planets names ('comma(',') separated'). ex: Earth, Mercury, Mars, Venus, Saturn (Case Insensitive)</span>)} 
      </div>
      <button
        type="button"
        className="group  relative  max-w-lg mx-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={handleClick}
      >
        {" "}
        Generate{" "}
      </button>
     
    </div>
    
    </>
  );
}
