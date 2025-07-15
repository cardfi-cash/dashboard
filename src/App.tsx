import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Farming from './pages/Farming';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* <Route path="/" element={<Landing />} /> */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/farming" element={<Farming />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;