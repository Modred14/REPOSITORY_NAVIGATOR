import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Text, Button } from '@chakra-ui/react';
import NotFound from './NotFound';
import './RepositoryDetails.css';
import { useNavigate } from 'react-router-dom';


function RepositoryDetails() {
  const { id } = useParams();
  const [repository, setRepository] = useState(null);
  const [error, setError] = useState(null)
  const navigate = useNavigate();;

  useEffect(() => {
    axios.get(`https://api.github.com/repositories/${id}`)
      .then(response => {
        setRepository(response.data);
      })
      
      .catch(error => {
        console.error('Failed to fetch repository details', error);
        setError('Failed to fetch details. Please check the repository ID or your network connection.');
      });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this repository? This action cannot be undone.')) {
      setRepository(null);
    }
  };  

  

  if (error) {
    return <NotFound />;
  }

  if (!repository) {
    return <NotFound />
  }

  return (
    <Box className='details-container'>
      <Text className='repository-name'>{repository.name}</Text>
      <Text className='repository-description'>{repository.description}</Text>
      <Box className='repository-details'>
        <Text>Stars: {repository.stargazers_count}</Text>
        <Text>Language: {repository.language}</Text>
        <Text>Forks: {repository.forks_count}</Text>
        <Text>Owner: {repository.owner.login}</Text>
        <Text>ID: {repository.id}</Text>
        <Text>Size: {repository.size}</Text>
        <Text>Clone Url: {repository.clone_url}</Text>
        <Text>Website: {repository.homepage}</Text>
        <Text>License: {repository.license && repository.license.name}</Text>
      </Box>
      <Button className='button-del' onClick={handleDelete}>Delete Repository</Button>
      <Button className='button-up' onClick={() => navigate('/UpdateRepo')} >Update Repository</Button>
      <Link to={'/'} className="go-home-link">HOME</Link>
    </Box>
  );
}

export default RepositoryDetails;
