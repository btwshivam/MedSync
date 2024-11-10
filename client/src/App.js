import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          MedSync
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
         A cutting-edge healthcare solution designed to streamline hospital operations through real-time bed tracking, intelligent patient queuing, and automated admissions. MedSync seamlessly integrates with city-wide networks for optimized resource management and enhanced patient care.
        </a>
      </header>
    </div>
  );
}

export default App;
