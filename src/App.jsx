import { useState } from "react";
import "./App.css";

/**
 * Note: this was made with help from ChatGPT.
 * Here are some of the conversations:
 * https://chatgpt.com/share/676185c3-51ec-800a-ac04-3a28ea733152
 * - help setting up categories.
 */

const App = () => {

  // Note: this function runs once when the App starts up
  // and then again any piece of state 
  // changes!

  // help w/ category index from GPT
  const categories = ["Names", "Jobs", "# of children", "Cars"]; // List of categories
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  const category = categories[currentCategoryIndex];
  const [categoryInputs,setCategoryInputs] = useState(["","","",""]);
  const [allInputs,setAllInputs] = useState([]);
  const [page,setPage] = useState(1);

  // The console.log statement below will show you each time
  // the App renders.
  console.log('Rendering app!','page is',page);

  // actions  
  const onNextCategory = () => {
    // save the current category
    let newInputData = [...allInputs, categoryInputs];
    setAllInputs(newInputData); // adding our input data!
    setCategoryInputs(["","","",""]); // clear out the category inputs
    // move to the next category
    setCurrentCategoryIndex(currentCategoryIndex + 1);
    if (currentCategoryIndex >= categories.length - 1) {
      // move onto next page!
      setPage(2);
    }
  }
  const onCategoryItemInputChange = (e, index) => {
    const newInputs = [...categoryInputs]; // Copy the current inputs array
    newInputs[index] = e.target.value;     // Update the value at the specific index
    setCategoryInputs(newInputs);          // Set the updated state
  };

  // render parts of our output...
  const renderCategoryChooser = () => {
    if (page === 1) {
      // render the first page...
      return (<>
        <h1>Enter {category}!</h1>
        {/* Help from ChatGPT*/}
        {/* Render inputs for categoryInputs */}
        <div>
          {categoryInputs.map((value, index) => {
            return (
              <div key={index}>
                <label>
                  {index + 1}:{" "}
                  <input
                    type="text"
                    value={value} // controlled input
                    onChange={(e) => onCategoryItemInputChange(e, index)} // handle input changes
                  />
                </label>
              </div>
            );
          })}
        </div>

        <button onClick={onNextCategory}>Next</button>        
      </>)
    } else {
      return renderMagicNumberPage();
    }
  }

  const renderMagicNumberPage = () => {
    if (page === 2) {
      return (
      <>
        <h1>Enter a magic number!</h1>
        <button onClick={()=>setPage(3)}>Next</button>
      </>)
    } else {
      return (<p>?</p>)
    }
  }

  const renderDebugInfo = () => {
    return (
      <div>
            <h2>DEBUG</h2>
            <p>Current Category: {category}</p>
            <p>Current Category Inputs: {categoryInputs.join(", ")}</p>
            <div>
              <h3>All Inputs:</h3>
              <ul>
                {allInputs.map((inputs, idx) => (
                  <li key={idx}>
                    <strong>{categories[idx]}:</strong> {inputs.join(", ")}
                  </li>
                ))}
              </ul>
            </div>
          </div>)
  }

  return (
  <main>
    <h1>MASH Game</h1>
    <div className="col">
      {renderCategoryChooser()}
    </div>    
    {renderDebugInfo()}

  </main>
  );
};

export default App;