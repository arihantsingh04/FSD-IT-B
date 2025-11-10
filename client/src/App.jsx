import { Router } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>Home Page</h1>} />
        <Route path='/' element={<h1>About Page</h1>} />
        <Route path='/' element={<h1>Contact Page</h1>} />
        <Route path='/' element={<h1>Dashboard Page</h1>} />
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
