"use client"
import { useForm } from 'react-hook-form';
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    FormHelperText,
    VStack,
    useToast,
    Text
} from '@chakra-ui/react';
import Heading from '@/components/Heading';
import Link from 'next/link';
import axios from 'axios';

export interface singup {
    email: string;
    password: string;
    name: string
}

export default function SingUpPage() {

    const { handleSubmit, register, reset, formState: { errors } } = useForm<singup>();

    const toast = useToast();

    const onSubmit = (data: singup) => {
        axios.post('http://localhost:3000/api/auth/sing-up', data)
            .then((res) => {
                console.log(res)
                toast({
                    title: 'Account created successfully',
                    status: 'success',
                    position: 'top',
                    duration: 2000,
                    isClosable: true,
                });
                reset()
                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);
            })
            .catch((err) => {
                console.log(err)
                toast({
                    title: err.response.data.message,
                    status: 'error',
                    position: 'top',
                    duration: 2000,
                    isClosable: true,
                });
            })
    };

    return (
        <>
            <header>
                <Heading text="Sing Up." route='/' />
            </header>
            <main>
                <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4} align="stretch" mb={5}>
                    <FormControl>
                        <FormLabel className='text-textcolor'>Your name</FormLabel>
                        <Input borderColor={errors.name?.message ? 'red' : 'inherit'}
                            type="text"
                            {...register('name', {
                                required: {
                                    value: true,
                                    message: 'name is required'
                                },
                                minLength: {
                                    value: 3,
                                    message: 'Name should be at least 3 characters'
                                }
                            })}
                            placeholder="Enter your name"
                        />
                        <FormHelperText color="red.500">{errors.name?.message}</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel className='text-textcolor'>Email address</FormLabel>
                        <Input borderColor={errors.email?.message ? 'red' : 'inherit'}
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                            placeholder="Enter your email"
                        />
                        <FormHelperText color="red.500">{errors.email?.message}</FormHelperText>
                    </FormControl>

                    <FormControl >
                        <FormLabel className='text-textcolor'>Password</FormLabel>
                        <Input borderColor={errors.password?.message ? 'red' : 'inherit'}
                            type="password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: { value: 8, message: 'Password should be at least 8 characters' }
                            })}
                            placeholder="Enter your password"
                        />
                        <FormHelperText color="red.500">{errors.password?.message}</FormHelperText>
                    </FormControl>

                    <Button type="submit" colorScheme="customColor" width="100%">
                        Sign Up
                    </Button>
                    <Text className='text-sm text-doneText'>Alredy have an account? <Link href='/login' className='text-md font-bold text-myblue underline'>login</Link></Text>
                </VStack>
                
            </main>
        </>
    )
}