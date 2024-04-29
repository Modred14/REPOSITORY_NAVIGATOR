import React, { useState } from "react";
import "./update.css";
import "./RepositoryDetails.css";
import "./RepositoriesList.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";

const UpdateRepoModal = ({ repo, onUpdate }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("" || repo.name);
  const [description, setDescription] = useState(repo.description || "");

  const handleSubmit = () => {
    onUpdate(repo.id, {
      name: name,
      description: description,
    });
    onClose();
  };

  return (
    <>
      <Button className="button-up" onClick={onOpen}>
        Update Repository
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <div className="details-contain10">
            <div className="details-contain6">
              <ModalHeader className="text1">Update Repository</ModalHeader>
              {/* <ModalCloseButton /> */}
              <ModalBody>
                <FormControl>
                  <FormLabel className="text">Name</FormLabel>
                  <Input
                    placeholder="Update Repository Name"
                    className="Input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel className="text2">Description</FormLabel>
                  <Input
                    placeholder="Update Repository Name"
                    className="Input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  className="save"
                  mr={3}
                  onClick={handleSubmit}
                >
                  Save
                </Button>
                <Button className="cancel" onClick={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateRepoModal;
