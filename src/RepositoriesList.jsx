import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import axios from "axios";
import Paginate from "./Pagination";
import "./RepositoriesList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Button, useDisclosure } from "@chakra-ui/react";
import image from "./assets/image.jpg";
import ErrorBoundary from "./ErrorBoundary";
import ErrorThrower from "./Errorthrower";
import CreateRepo from "./CreateRepo";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const token = import.meta.env.VITE_GITHUB_TOKEN || process.env.VITE_GITHUB_TOKEN;

const fetchUserProfile = async () => {
  try {
    const response = await axios.get("https://api.github.com/users/Modred14", {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    throw new Error("Failed to fetch user profile");
  }
};

const fetchRepositories = async () => {
  try {
    const response = await axios.get(
      "https://api.github.com/users/Modred14/repos",
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch repositories:", error);
    throw new Error("Failed to fetch repositories");
  }
};

const fetchRepositoryCount = async () => {
  try {
    const response = await axios.get("https://api.github.com/users/Modred14", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.public_repos;
  } catch (error) {
    console.error("Failed to fetch repository count:", error);
    throw new Error("Failed to fetch repository count");
  }
};

function RepositoriesList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(2);
  const [searchQuery, setSearchQuery] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [repositoryCount, setRepositoryCount] = useState(0);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, repoData, countData] = await Promise.all([
          fetchUserProfile(),
          fetchRepositories(),
          fetchRepositoryCount(),
        ]);
        setUserProfile(userData);
        setRepositoryCount(countData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const { isLoading, isError, data } = useQuery(
    ["repositories"],
    fetchRepositories
  );
  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;

  if (isLoading) {
    return (
      <div className="header">
        <section className="GitHubProfile">
          <div>
            <div className="avatar-container">
              <Skeleton circle height={300} width={300} />
            </div>
            <div className="user-details">
            <Skeleton width={500} height={300} />
              <h1>
                <Skeleton width={200} />
              </h1>
              <p>
                <Skeleton count={4} />
              </p>
              <div className="followers-following">
                <p>
                  <FontAwesomeIcon icon={faUserFriends} /> Followers:{" "}
                  <Skeleton width={50} />
                </p>
                <p>
                  <FontAwesomeIcon icon={faUserFriends} /> Following:{" "}
                  <Skeleton width={50} />
                </p>
                <p>
                  🗂️ Total Repositories: <Skeleton width={50} />
                </p>
              </div>
              <p>
                GitHub Profile: <Skeleton width={200} />
              </p>
            </div>
          </div>
        </section>

        <section>
          <h1 className="header-desktop">MY PORTFOLIO</h1>
          <section className="RepositoriesList">
            <h2>My Repositories</h2>
            <Skeleton max-width={600} height={40} />
            <input
              type="text"
              placeholder="Search repositories..."
              className="search-repo"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <ul>
              {[...Array(2)].map((_, index) => (
                <li key={index}>
                  <Skeleton max-width={600} height={30} />
                </li>
              ))}
            </ul>
          </section>
        </section>
      </div>
    );
  }

  if (isError) return <div>Error fetching repositories</div>;

  const filteredRepositories = data.filter((repo) =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalItems = filteredRepositories.length;
  const totalPages = Math.ceil(totalItems / perPage);

  const currentItems = filteredRepositories.slice(firstIndex, lastIndex);

  return (
    <ErrorBoundary>
      <div className="header">
        <section className="GitHubProfile">
          <div>
            <div className="avatar-container">
              <img src={image} alt="User avatar" />
            </div>
            {userProfile && (
              <div className="user-details">
                <h1>{userProfile.name}</h1>
                <p>{userProfile.bio}</p>
                <div className="followers-following">
                  <p>
                    <FontAwesomeIcon icon={faUserFriends} />
                    Followers: {userProfile.followers}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faUserFriends} />
                    Following: {userProfile.following}
                  </p>
                  <p>🗂️Total Repositories: {repositoryCount}</p>
                </div>
                <p>
                  GitHub Profile:{" "}
                  <a
                    href={userProfile.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {userProfile.html_url}
                  </a>
                </p>
              </div>
            )}
          </div>
        </section>

        <section>
          <h1 className="header-desktop">MY PORTFOLIO</h1>
          <section className="RepositoriesList">
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
                  <span className="span-name">{repo.name.toUpperCase()}</span>
                  <button className="infoBTN">
                    <Link className="link" to={`/repository/${repo.id}`}>
                      DETAILS
                    </Link>
                  </button>
                </li>
              ))}
            </ul>
            <div className="grid-box">
              <Paginate
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />

              <div className="Test">
                <Button
                  className="T404"
                  onClick={() => navigate("/Invalid_url")}
                >
                  Test 404 page
                </Button>
                <ErrorThrower />
                <Button className="createRepo" onClick={onOpen} size="sm" m={4}>
                  Create repo
                </Button>
                <CreateRepo isOpen={isOpen} onClose={onClose} />
              </div>
            </div>
          </section>
        </section>
      </div>
    </ErrorBoundary>
  );
}

export default RepositoriesList;
