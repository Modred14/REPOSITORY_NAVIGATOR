import RepositoriesList from './RepositoriesList'
import ErrorBoundary  from './ErrorBoundary'
import { Routes, Route,  } from 'react-router-dom'
import RepositoryDetails from './RepositoryDetails'
import NotFound from './NotFound'
import Fallback from './Fallback'
function App(){
return(
  <ErrorBoundary fallback={Fallback} onReset={()=>{}}>
    <Routes>
        <Route exact path="/" element={ <RepositoriesList/>} />
        <Route path="/repository/:id" element={<RepositoryDetails/>} />
        <Route path="/repository/*" element={<NotFound/>} />
        <Route path ='*' element={<NotFound/>}/>
    </Routes>
  </ErrorBoundary>
)
}

export default App
