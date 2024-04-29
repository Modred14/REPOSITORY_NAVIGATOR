import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import "./create.css";

const token =
  "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" ||
  import.meta.env.VITE_GITHUB_TOKEN ||
  process.env.VITE_GITHUB_TOKEN;
function CreateRepo({ isOpen, onClose }) {
  const [repoDetails, setRepoDetails] = useState({
    name: "",
    description: "",
    private: false,
    language: "",
    customLanguage: "",
    homepage: "",
    license: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRepoDetails((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    const data = {
      name: repoDetails.name,
      description: repoDetails.description,
      language:
        repoDetails.language !== "Other" ? repoDetails.language : undefined,
      customLanguage:
        repoDetails.language === "Other"
          ? repoDetails.customLanguage
          : undefined,
      private: repoDetails.private,
      homepage: repoDetails.homepage,
    };

    const response = await fetch("https://api.github.com/user/repos", {
      method: "POST",
      headers: {
        Authorization: `Bearer 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`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (response.ok) {
      alert("Respository has been created successfully");
      onClose();
      localStorage.setItem(`repo-${responseData.id}`, true);
      return responseData;
    } else {
      alert("Failed to create repository");
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <div className="details-contain8">
          <div className="details-contain7">
            <ModalHeader className="text6">Create New Repository</ModalHeader>
            {/* <ModalCloseButton /> */}
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel className="texth">Repository Name</FormLabel>
                <Input
                  className="Input"
                  placeholder="Enter repository name"
                  value={repoDetails.name}
                  onChange={handleChange}
                  name="name"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel className="texth">Description</FormLabel>
                <Input
                  className="Input"
                  placeholder="Enter description"
                  value={repoDetails.description}
                  onChange={handleChange}
                  name="description"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel className="texth">Language</FormLabel>
                <Select
                  className="Input"
                  placeholder="Select Language"
                  value={repoDetails.language}
                  onChange={handleChange}
                  name="language"
                >
                  <option value="HTML">HTML</option>
                  <option value="CSS">CSS</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="C#">C#</option>
                  <option value="C++">C++</option>
                  <option value="PHP">PHP</option>
                  <option value="Ruby">Ruby</option>
                  <option value="Go">Go</option>
                  <option value="Swift">Swift</option>
                  <option value="Kotlin">Kotlin</option>
                  <option value="TypeScript">TypeScript</option>
                  <option value="Scala">Scala</option>
                  <option value="Objective-C">Objective-C</option>
                  <option value="R">R</option>
                  <option value="Elixir">Elixir</option>
                  <option value="Rust">Rust</option>
                  <option value="Perl">Perl</option>
                  <option value="Dart">Dart</option>
                  <option value="Lua">Lua</option>
                  <option value="Haskell">Haskell</option>
                  <option value="Julia">Julia</option>
                  <option value="Clojure">Clojure</option>
                  <option value="Groovy">Groovy</option>
                  <option value="Shell">Shell</option>
                  <option value="Assembly">Assembly</option>
                  <option value="CoffeeScript">CoffeeScript</option>
                  <option value="MATLAB">MATLAB</option>
                  <option value="Bash">Bash</option>
                  <option value="VBA">VBA</option>
                  <option value="F#">F#</option>
                  <option value="Pascal">Pascal</option>
                  <option value="Delphi">Delphi</option>
                  <option value="Erlang">Erlang</option>
                  <option value="Fortran">Fortran</option>
                  <option value="Other">Other</option>
                </Select>
                {repoDetails.language === "Other" && (
                  <Input
                    placeholder="Specify Language"
                    className="Input"
                    value={repoDetails.customLanguage}
                    onChange={handleChange}
                    name="customLanguage"
                  />
                )}
              </FormControl>
              <FormControl mt={4}>
                <FormLabel className="texth">Homepage URL</FormLabel>
                <Input
                  className="Input"
                  placeholder="https://example.com"
                  value={repoDetails.homepage}
                  onChange={handleChange}
                  name="homepage"
                />
              </FormControl>
              <FormControl mt={4}>
                <Checkbox
                  className="private"
                  isChecked={repoDetails.private}
                  onChange={handleChange}
                  name="private"
                >
                  Private Repository
                </Checkbox>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                className="save1"
                colorScheme="blue"
                mr={3}
                onClick={handleSubmit}
              >
                Create Repo
              </Button>
              <Button className="cancel1" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}

export default CreateRepo;
