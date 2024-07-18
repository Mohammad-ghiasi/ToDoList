"use client"
import Heading from '@/components/Heading'
import { useForm } from 'react-hook-form';
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    FormHelperText,
    VStack,
    useToast,
} from '@chakra-ui/react';
import axios from 'axios';

interface singup {
    email: string
    password: string;
}

export default function Loginpage() {
    const { handleSubmit, register, reset, formState: { errors } } = useForm<singup>();

    const toast = useToast();

    const onSubmit = (data: singup) => {
        axios.post('http://localhost:3000/api/auth/login', data)
            .then((res) => {
                console.log(res)
                toast({
                    title: res.data.message,
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
                <Heading text="Login." route='/sing-up' />
            </header>
            <main>
                <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4} align="stretch">
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
                        login
                    </Button>
                </VStack>
            </main>
        </>
    )
}
