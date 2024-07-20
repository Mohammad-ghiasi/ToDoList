'use client'

import { Box, Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, FormControl, FormLabel, Input, FormHelperText, useToast } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import { userStore } from '@/store/loginuser';

interface FormData {
    title: string;
}

export default function ModalBtn() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
    const { increaseTodoLength, setTodos } = userStore((state) => state.actions);

    const onSubmit = (data: FormData) => {
        axios.post('http://localhost:3000/api/posts/addpost', data)
            .then((res) => {
                toast({
                    title: res.data.message,
                    status: 'success',
                    position: 'top',
                    duration: 2000,
                    isClosable: true,
                });
                increaseTodoLength();
                // Fetch the updated todos and set them in the store
                axios.get('http://localhost:3000/api/posts/getposts')
                    .then((response) => {
                        setTodos(response.data.todos);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                reset();
                onClose();
            })
            .catch((err) => {
                console.log(err);
                toast({
                    title: err.response?.data?.message || 'An error occurred',
                    status: 'error',
                    position: 'top',
                    duration: 2000,
                    isClosable: true,
                });
            });
    };

    return (
        <>
            <Box className="hidden md:block">
                <Button className="hidden" onClick={onOpen} colorScheme="customColor">Add Task</Button>
            </Box>
            <Box className="block md:hidden">
                <IconButton
                    colorScheme="customColor"
                    aria-label='Add Task'
                    icon={<FaPlus size='23px' />}
                    onClick={onOpen}
                />
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="text-textcolor">Add Task</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl>
                                <FormLabel className='text-textcolor'>Enter new task</FormLabel>
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
                                    placeholder="Enter your task"
                                />
                                <FormHelperText color="red.500">{errors.title?.message}</FormHelperText>
                            </FormControl>
                            <Button mt={5} type="submit" rightIcon={<FaPlus />} colorScheme="customColor" width="100%">
                                Add
                            </Button>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
