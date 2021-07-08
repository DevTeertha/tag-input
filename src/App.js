import './App.css';
import TagInput from './components/TagInput';

function App() {
  const database = [
    "html", "css", "javascript",
    "react-js", "node-js", "express-js"
  ]

  const postToDatabaseHandler = (newSuggest) => {
    database.push(newSuggest)
  }

  return (
    <div className="App">
      <TagInput postToDatabaseHandler={postToDatabaseHandler} get={database}></TagInput>
    </div>
  );
}

export default App;
