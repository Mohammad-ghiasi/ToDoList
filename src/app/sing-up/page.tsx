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

interface singup {
    email: string;
    password: string;
}

export default function SingUpPage() {
    const { handleSubmit, register, reset, formState: { errors } } = useForm<singup>();

    const toast = useToast();

    const onSubmit = (data: singup) => {
        console.log(data); // Replace with your submission logic
        toast({
            title: 'Sign-up successfuly!',
            status: 'success',
            position: 'top',
            duration: 2000,
            isClosable: true,
        });
        setTimeout(() => {
            reset()
        }, 1500);
    };

    return (
        <>
            <header>
                <Heading text="Sing Up." route='/' />
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
                        Sign Up
                    </Button>
                    <Text className='text-sm text-doneText'>Alredy have an account? <Link href='/login' className='text-md font-bold text-myblue underline'>login</Link></Text>
                </VStack>
            </main>
        </>
    )
}