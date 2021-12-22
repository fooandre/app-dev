import {Route, Routes} from 'react-router-dom';
import Main from './Client/Main';
import CreateProduct from './Admin/createProduct';

const App = () => {
  return (
      <Routes>
        <Route exact path="/" element={<Main/>} />
        <Route exact path="/addProduct" element={<CreateProduct/>} />
      </Routes>
  )
}

export default App