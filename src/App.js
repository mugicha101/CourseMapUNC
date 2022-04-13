import './App.css';
import {Flow} from "./Flow";
import addData from "./AddData";

const showAddDataButton = false;

function App() {
    return (
        <div className="App">
            <Flow department="unc/comp"/>
            {showAddDataButton? <button onClick={(e) => {
                e.preventDefault();
                addData();
            }}>addData</button> : null}
        </div>
    );
}

export default App;
