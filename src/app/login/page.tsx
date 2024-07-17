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

interface singup {
    password: string;
}

export default function Loginpage() {
    const { handleSubmit, register, reset, formState: { errors } } = useForm<singup>();

    const toast = useToast();

    const onSubmit = (data: singup) => {
        console.log(data); // Replace with your submission logic
        toast({
            title: 'Login successfuly!',
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
                <Heading text="Login." route='/sing-up' />
            </header>
            <main>
                <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4} align="stretch">

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
