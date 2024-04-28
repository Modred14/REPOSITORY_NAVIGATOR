import RepositoriesList from "./RepositoriesList";
import ErrorBoundary from "./ErrorBoundary";
import { Routes, Route } from "react-router-dom";
import RepositoryDetails from "./RepositoryDetails";
import NotFound from "./NotFound";
import Fallback from "./Fallback";
import CreateRepo from "./CreateRepo";
import { RepositoriesProvider } from "./RepositoriesContext";

function App() {
  return (
    <RepositoriesProvider>
      <ErrorBoundary fallback={Fallback} onReset={() => {}}>
        <Routes>
          <Route exact path="/" element={<RepositoriesList />} />
          <Route path="/repository/:id" element={<RepositoryDetails />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/CreateRepo" element={<CreateRepo />} />
          <Route path="/d" element={<RepositoryDetails />} />
        </Routes>
      </ErrorBoundary>
    </RepositoriesProvider>
  );
}

export default App;
