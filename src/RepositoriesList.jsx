import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Paginate from './Pagination';
import './RepositoriesList.css'

const token = import.meta.env.VITE_GITHUB_TOKEN || process.env.VITE_GITHUB_TOKEN;
console.log(token);

const fetchRepositories = async () => {
  try {
    const response = await axios.get('https://api.github.com/users/Modred14/repos', {
      headers: {
        Authorization: `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 || ${token}`
      }
    });
    console.log(response.data) 
    return response.data;

  } catch (error) {
    console.error('Failed to fetch repositories:', error);
    throw new Error('Failed to fetch repositories');
  }
};

const fetchUserProfile = async () => {
  try {
    const response = await axios.get('https://api.github.com/users/Modred14', {
      headers: {
        Authorization: `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 || ${token}` 
      }
    });
    return response.data;

  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    throw new Error('Failed to fetch user profile');
  }
};


function RepositoriesList () {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(2);
  const [searchQuery, setSearchQuery] = useState('');
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfileData = async () => {
      try {
        const userData = await fetchUserProfile();
        setUserProfile(userData);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    fetchUserProfileData();
  }, []);

  const { isLoading, isError, data } = useQuery(['repositories'], fetchRepositories);
  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching repositories</div>;

  const filteredRepositories = data.filter(repo =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalItems = filteredRepositories.length;
  const totalPages = Math.ceil(totalItems / perPage);

  const currentItems = filteredRepositories.slice(firstIndex, lastIndex);

  return (
    <div className="header">
      <section className='GitHubProfile'>
        {userProfile && (
          <div>
            <h1>{userProfile.name}</h1>
            <p>{userProfile.bio}</p>
            <p>Followers: {userProfile.followers}</p>
            <p>Following: {userProfile.following}</p>
            {/* Add more profile information as needed */}
          </div>
        )}
      </section>
      <h1>MY PORTFOLIO</h1>
      <section className='RepositoriesList'>
        <h2>My Repositories</h2>
        <input
            type="text"
            placeholder="Search repositories..."
            className="search-repo"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} v 
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
         <Paginate
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </section>
    </div>  
  );
}

export default RepositoriesList;
