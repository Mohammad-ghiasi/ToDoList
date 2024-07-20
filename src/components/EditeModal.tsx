'use client'

import { Box, Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, FormControl, FormLabel, Input, FormHelperText, useToast } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import { userStore } from '@/store/loginuser';
import { MdModeEditOutline } from "react-icons/md";


interface FormData {
    title: string;
}

interface ModalBtnProps {
    text: string;
    id: number;
    initialTitle: string;
}

export default function EditModal({ text, id, initialTitle }: ModalBtnProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
    const { setTodos } = userStore((state) => state.actions);

    const onSubmit = async (data: FormData) => {
        try {
            const response = await axios.put(`http://localhost:3000/api/posts/editpost/?id=${id}`, data, { withCredentials: true });
            toast({
                title: response.data.message,
                status: 'success',
                position: 'top',
                duration: 2000,
                isClosable: true,
            });

            const todosResponse = await axios.get('http://localhost:3000/api/posts/getposts');
            setTodos(todosResponse.data.todos);
            reset();
            onClose();
        } catch (error) {
            console.error("Error updating todo item:", error);
            toast({
                title: 'Face an error' || 'An error occurred',
                status: 'error',
                position: 'top',
                duration: 2000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <Box>
                <IconButton
                    aria-label='Edit Task'
                    icon={<MdModeEditOutline size='18px' className="text-myblue" />}
                    onClick={onOpen}
                />
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="text-textcolor">Edit Task</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl>
                                <FormLabel className='text-textcolor'>Edit task</FormLabel>
                                <Input
                                    borderColor={errors.title?.message ? 'red' : 'inherit'}
                                    type="text"
                                    {...register('title', {
                                        required: {
                                            value: true,
                                            message: 'Task is required'
                                        },
                                        minLength: {
                                            value: 5,
                                            message: 'Task should be at least 5 characters'
                                        }
                                    })}
                                    placeholder={text}
                                />
                                <FormHelperText color="red.500">{errors.title?.message}</FormHelperText>
                            </FormControl>
                            <Button mt={5} type="submit" rightIcon={<MdModeEditOutline />} colorScheme="customColor" width="100%">
                                Edit
                            </Button>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
