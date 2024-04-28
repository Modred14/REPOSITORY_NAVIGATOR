import React, { createContext, useContext, useState } from "react";

const RepositoriesContext = createContext();

export const RepositoriesProvider = ({ children }) => {
  const [repositories, setRepositories] = useState([]);

  const updateRepository = (updatedRepo) => {
    setRepositories((prevRepos) =>
      prevRepos.map((repo) => (repo.id === updatedRepo.id ? updatedRepo : repo))
    );
  };

  return (
    <RepositoriesContext.Provider value={{ repositories, updateRepository }}>
      {children}
    </RepositoriesContext.Provider>
  );
};

export const useRepositories = () => useContext(RepositoriesContext);
