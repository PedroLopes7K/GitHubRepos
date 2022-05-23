import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './Pages/Main'
import Repos from './Pages/Repos'

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/repos/:repository" element={<Repos />} />
      </Routes>
    </BrowserRouter>
  )
}
