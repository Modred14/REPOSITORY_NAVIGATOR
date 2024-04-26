import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Paginate from './Pagination';
import './RepositoriesList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';



const token = import.meta.env.VITE_GITHUB_TOKEN || process.env.VITE_GITHUB_TOKEN;

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


const fetchRepositories = async () => {
  try {
    const response = await axios.get('https://api.github.com/users/Modred14/repos', {
      headers: {
        Authorization: `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 || ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch repositories:', error);
    throw new Error('Failed to fetch repositories');
  }
};

const fetchRepositoryCount = async () => {
  try {
    const response = await axios.get('https://api.github.com/users/Modred14', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.public_repos;
  } catch (error) {
    console.error('Failed to fetch repository count:', error);
    throw new Error('Failed to fetch repository count');
  }
};

function RepositoriesList () {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(2);
  const [searchQuery, setSearchQuery] = useState('');
  const [userProfile, setUserProfile] = useState(true);
  const [repositoryCount, setRepositoryCount] = useState(0);
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, repoData, countData] = await Promise.all([
          fetchUserProfile(),
          fetchRepositories(),
          fetchRepositoryCount()
        ]);
        setUserProfile(userData);
        setRepositoryCount(countData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
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
      <div>
          <div className="avatar-container">
            <img src={`./src/assets/image.jpg`}/>
          </div>
        {userProfile && (
         
            <div className="user-details">
              <h1>{userProfile.name}</h1>
              <p>{userProfile.bio}</p>
              <div className="followers-following">
                <p><FontAwesomeIcon icon={faUserFriends} />Followers: {userProfile.followers}</p>
                <p><FontAwesomeIcon icon={faUserFriends} />Following: {userProfile.following}</p>
                <p>🗂️Total Repositories: {repositoryCount}</p>
              </div>
              <p>GitHub Profile: <a href={userProfile.html_url} target="_blank" rel="noopener noreferrer">{userProfile.html_url}</a></p>
            </div>
        
        )} 
        </div>
      </section>
      
      <section>
        <h1 className='header-desktop'>MY PORTFOLIO</h1>
        <section className='RepositoriesList'>
          <h2>My Repositories</h2>
          <input
            type="text"
            placeholder="Search repositories..."
            className="search-repo"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
          {/* {showNotFound && <NotFound />}
          {!showNotFound && (
           
          )}*/}

          {/* test 404 page? */}
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
          <div className='grid-box'>
           <Paginate
              currentPage={currentPage}
             totalPages={totalPages}
             onPageChange={setCurrentPage}
           />
      
            <div>
              <Button className="createRepo" onClick={() => navigate('/CreateRepo')}>Create repo</Button>
            </div>
         </div>
        </section>
      </section> 
                
    </div>  
  );
}

export default RepositoriesList;
