import Header from './pages/header';
import AddModal from './components/modal/addmodal';
import Dashboard from './pages/dashboard';
import RightBar from './pages/dashboard/rightbar';

function App() {
  return (
    
    <div className="">
      <Header />
      <div className='flex'>
        <Dashboard />
        <RightBar />
      </div>
      <AddModal />
    </div>
  );
}

export default App;
