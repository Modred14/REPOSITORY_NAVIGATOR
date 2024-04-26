import React, { useState } from 'react';
import { Box, Input, Button } from '@chakra-ui/react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './RepositoryDetails.css';

const CreateRepo = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
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
            alert('Repository created successfully!');
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Failed to create repository:', error);
            alert('Failed to create repository.');
        }
    };

    return (
        <Box className='details-contain'>
            <Input placeholder="Repository Name" className='Input' value={formData.name} onChange={handleChange} name="name" />
            <Input placeholder="Description" className='Input' value={formData.description} onChange={handleChange} name="description" />
            <Input placeholder="Language" className='Input' value={formData.language} onChange={handleChange} name="language" />
            <Input placeholder="Owner" className='Input' value={formData.owner} onChange={handleChange} name="owner" />
            <Input placeholder="Clone_url" className='Input' value={formData.clone_url} onChange={handleChange} name="clone_url" />
            <Input placeholder="Homepage" className='Input' value={formData.homepage} onChange={handleChange} name="homepage" />
            <Input placeholder="License" className='Input' value={formData.license} onChange={handleChange} name="license" />
            <Button className="createRepo" onClick={handleSave}>Create Repository</Button>
            <Link to={'/'} className="go-home-link">HOME</Link>
        </Box>
    );
};

export default CreateRepo;
