import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Box, Text, Button, Spinner } from "@chakra-ui/react";
import NotFound from "./NotFound";
import "./RepositoryDetails.css";
import { useNavigate } from "react-router-dom";
import UpdateRepoModal from "./UpdateRepoModal";
import ErrorBoundary from "./ErrorBoundary";

const token =
  import.meta.env.VITE_GITHUB_TOKEN || process.env.VITE_GITHUB_TOKEN;
function RepositoryDetails() {
  const { id } = useParams();
  const [repository, setRepository] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://api.github.com/repositories/${id}`)
      .then((response) => {
        setRepository(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch repository details", error);
        setError(
          "Failed to fetch details. Please check the repository ID or your network connection."
        );
        setIsLoading(false);
      });
  }, [id]);

  const handleDelete = async (repoId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this repository? This action cannot be undone."
      )
    ) {
      if (localStorage.getItem(`repo-${repoId}`)) {
        try {
          const response = await axios.delete(`https://api.github.com/repos/Modred14/${repoId}`, {
            headers: { 'Authorization': `Bearer ${token}` } 
          });
          if (response.status === 204) {
            localStorage.removeItem(`repo-${repoId}`);
            alert("Repository deleted successfully.");
          }
        } catch (error) {
          console.error("Error deleting repository:", error);
          alert("Failed to delete repository. Please try again.");
        }
      } else {
        alert("You can only delete repositories created through this app.");
      }
    }
  };
  const handleUpdate = async (repoId, data) => {
    try {
      const response = await axios.patch(
        `https://api.github.com/repos/Modred14/${repository.name}`,
        data,
        {
          headers: {
            Authorization: `token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setRepository(response.data);
      console.log("Repository updated successfully:", response.data);
      alert(`Repository updated successfully.`);
    } catch (error) {
      console.error("Error updating repository:", error);
      alert(`Error updating repository.`);
    }
  };

  if (isLoading) {
    return (
      <Box className="details-container" textAlign="center">
        <Spinner size="xl" />
        <Text>Loading repository details...</Text>
      </Box>
    );
  }

  if (error) {
    return <NotFound />;
  }

  if (!repository) {
    return <NotFound />;
  }

  return (
    <ErrorBoundary>
      <Box className="details-container">
        <Text className="repository-name">{repository.name}</Text>
        <Text className="repository-description">{repository.description}</Text>
        <Box className="repository-details">
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
        <Button className="button-del" onClick={handleDelete}>
          Delete Repository
        </Button>
        <UpdateRepoModal repo={repository} onUpdate={handleUpdate} />
        {/* <Button  onClick={() => navigate('/UpdateRepo')} >Update Repository</Button> */}
        <Link to={"/"} className="go-home-link">
          HOME
        </Link>
      </Box>
    </ErrorBoundary>
  );
}

export default RepositoryDetails;
