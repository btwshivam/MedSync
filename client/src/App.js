import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { UserProvider } from './store/userContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';

function App() {
  return (
    <>
      {/*--google-site-verification: google702f0a7aa8f19d22.html--*/}
      <div className="App">
        <Router>
          <UserProvider>
            <Layout />
          </UserProvider>
        </Router>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
