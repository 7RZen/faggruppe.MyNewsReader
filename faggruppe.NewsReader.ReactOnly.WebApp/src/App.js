import './App.css';
import Header from './components/header/Header';
import NewsReader from './domain/news-reader/NewsReader';

function App() {
  return (
    <div className="App container">
      <Header/>
      <NewsReader/>
    </div>
  );
}

export default App;