"use client";

import { Box, Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react';
import { FaFlagCheckered } from 'react-icons/fa';
import axios from 'axios';
import { userStore } from '@/store/loginuser';

export default function FinishModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const { setTodos } = userStore((state) => state.actions);
    const handleFinish = async () => {
        try {
            const response = await axios.delete('http://localhost:3000/api/posts/deleteAll', {
                withCredentials: true // Ensure cookies (token) are sent
            });

            toast({
                title: response.data.message,
                status: 'success',
                position: 'top',
                duration: 2000,
                isClosable: true,
            });
            setTodos([]);
            // Optionally: refresh the list of todos or update local state
            // For example, if you have a function to fetch todos:
            // fetchTodos();

        } catch (error) {
            console.error(error);
            toast({
                title: 'face an error' || 'Error clearing todos',
                status: 'error',
                position: 'top',
                duration: 2000,
                isClosable: true,
            });
        } finally {
            onClose(); // Close the modal regardless of success or error
        }
    };

    return (
        <>
            <IconButton
                colorScheme="customColor"
                aria-label="Finish Day"
                icon={<FaFlagCheckered size="20px" />}
                onClick={onOpen}
            />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="text-textcolor">Finish Day?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box className="flex flex-row justify-around">
                            <Button onClick={handleFinish} className="w-[40%]" colorScheme="customColor">
                                Yes
                            </Button>
                            <Button onClick={onClose} className="w-[40%]">
                                No
                            </Button>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
