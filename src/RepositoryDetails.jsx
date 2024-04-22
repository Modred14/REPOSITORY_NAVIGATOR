import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Text, Button } from '@chakra-ui/react'; 
import NotFound from './NotFound';
import './RepositoryDetails.css';

function RepositoryDetails() {
  const { id } = useParams();
  const [repository, setRepository] = useState(null);
  const [error, setError] = useState(null);

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

  if (error) {
    return <NotFound />;
  }

  return (
    <Box className='details-container'>
      {repository && (
        <>
          <Text className='repository-name'>{repository.name}</Text>
          <Text className='repository-description'>{repository.description}</Text>
          <Box className='repository-details'>
            <Text>Stars: {repository.stargazers_count}</Text>
            <Text>Language: {repository.language}</Text>
            <Text>Forks: {repository.forks_count}</Text>
            <Text>Owner: {repository.owner.login}</Text>
            <Text>ID: {repository.id}</Text>
            <Text>Size: {repository.size}</Text>
            <Text>Description: {repository.description}</Text>
            <Text>Clone Url: {repository.clone_url}</Text>
            <Text>Website: {repository.homepage}</Text>
            <Text>License: {repository.license}</Text>        
          </Box>
          <Link to={'/'} className="go-home-link">GO HOME</Link>
        </>
      )}
    </Box>
  );
}

export default RepositoryDetails;
