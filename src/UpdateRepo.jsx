import React, { useState } from 'react';
import { Box, Input, Button } from '@chakra-ui/react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './RepositoryDetails.css';
import { useNavigate } from 'react-router-dom';

const UpdateRepo = () => {
  const navigate = useNavigate();;
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    stargazers_count: 0,
    language: '',
    forks_count: 0,
    owner: '',
    size: 0,
    clone_url: '',
    homepage: '',
    license: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.post('https://api.github.com/users/Modred14/repos', formData, {
        headers: {
          Authorization: `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`
        }
      });
      alert('Repository updated successfully!');
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Failed to update repository:', error);
      alert('Failed to update repository.');
    }
  };

  return (
    <Box className='details-contain1'>
      <div className='details-contain2' >
      <Input placeholder="Update Repository Name" className='Input' value={formData.name} onChange={handleChange} name="name" />
      <Input placeholder="Update Description" className='Input' value={formData.description} onChange={handleChange} name="description" />
      <Input placeholder="Update Language" className='Input' value={formData.language} onChange={handleChange} name="language" />
      <Input placeholder="Update Owner" className='Input' value={formData.owner} onChange={handleChange} name="owner" />
      <Input placeholder="Update Clone_url" className='Input' value={formData.clone_url} onChange={handleChange} name="clone_url" />
      <Input placeholder="Update Homepage" className='Input' value={formData.homepage} onChange={handleChange} name="homepage" />
      <Input placeholder="Update License" className='Input' value={formData.license} onChange={handleChange} name="license" />
      </div>
      <div className='details-contain3' >
      <Button className='button-up1' onClick={handleSave}>Save Changes</Button>
      <Link to={'/'} className="go-home-link">HOME</Link>
      </div>
    </Box>
  );
}

export default UpdateRepo;
