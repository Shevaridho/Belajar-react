
import './App.css';
import Home from './pages/Home';
import Articles from './pages/Articles';
import Categories from './pages/Categories';
import "./stayle/landing.css";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
const router=createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/Articles",
    element:<Articles/>
  },
  {
    path:"/Categories",
    element:<Categories/>
  }
])
function App() {
  return (
    <div className='background'>    
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
