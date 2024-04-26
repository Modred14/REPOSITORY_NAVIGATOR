import RepositoriesList from './RepositoriesList'
import ErrorBoundary  from './ErrorBoundary'
import { Routes, Route,  } from 'react-router-dom'
import RepositoryDetails from './RepositoryDetails'
import NotFound from './NotFound'
import Fallback from './Fallback'
import CreateRepo from './CreateRepo'
import UpdateRepo from './UpdateRepo'

function App(){
return(
  <ErrorBoundary fallback={Fallback} onReset={()=>{}}>
    <Routes>
        <Route exact path="/" element={ <RepositoriesList/>} />
        <Route path="/repository/:id" element={<RepositoryDetails/>} />
        {/* <Route path="/repository/*" element={<NotFound/>} /> */}
        <Route path ="*" element={<NotFound/>}/>
        <Route path ="/CreateRepo" element={<CreateRepo/>}/>
        <Route path ="/UpdateRepo" element={<UpdateRepo/>}/>
        <Route path="/d" element={<RepositoryDetails/>} />
        

    </Routes>
  </ErrorBoundary>
)
}

export default App
