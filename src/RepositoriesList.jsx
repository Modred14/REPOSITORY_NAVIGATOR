import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import Paginate from './pagination';
import './repoList.css'
const token = import.meta.env.VITE_ACCESS_TOKEN || process.env.VITE_ACCESS_TOKEN;
console.log(token)
const fetchRepositories = async () => {
  try {
    const response = await axios.get('https://api.github.com/users/Modred14', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data; 
  } catch (error) {
    console.error('Failed to fetch repositories:', error);
    throw new Error('Failed to fetch repositories');
  }
};

function RepositoriesList () {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(2);
  const [searchQuery, setSearchQuery] = useState('');
  const { isLoading, isError, data } = useQuery(['repositories'],() => fetchRepositories());
  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching repositories</div>;
  const filteredRepositories = data.filter(repo =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentItems = filteredRepositories.slice(firstIndex, lastIndex)

  return (
  <div className="header">
    <h1>MY PORTFOLIO</h1>
    <section className='repoList'>
      <h2>My Repositories</h2>
      <input
          type="text"
          placeholder="Search repositories..."
          className="search-repo"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      <ul>
        {currentItems.map((repo, index) => (
          <li key={index}>
            <span>{repo.name.toUpperCase()}</span>
            <button className='infoBTN'>
              <Link className='link' to={`/repository/${repo.id}`}>DETAILS</Link>
            </button>
          </li>
        ))}
      </ul>
      <Paginate totalItems={filteredRepositories.length} perPage={perPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
    </section>
  </div>  
  );
}


export default RepositoriesList;
