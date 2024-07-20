"use client"
import { useGetData } from "@/hooks/getdata"
import { userStore } from "@/store/loginuser";
import { Box, Button, Divider, Text, useToast, Wrap, WrapItem } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react";
import { userData } from "../page";
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import Heading from "@/components/Heading";



export default function AccountPage() {
    const toast = useToast();
    const [data, setData] = useState<any>(null);
    const isLoggedIn: boolean = userStore((state) => state.isLoggedIn);
    const todoLength: number = userStore((state) => state.todoLength);
    const { loginUser, logoutUser } = userStore((state) => state.actions);
    useEffect(() => {
        axios.get("http://localhost:3000/api/user")
            .then((res) => {
                setData(res.data.data);
                loginUser();
            })
            .catch((error) => {
                console.error(error);
            });

    }, [])
    const handleLogout = (): any => {
        axios.get('http://localhost:3000/api/logout')
            .then((res) => {
                toast({
                    title: res.data.message,
                    status: 'success',
                    position: 'top',
                    duration: 2000,
                    isClosable: true,
                });
                logoutUser();
                window.location.href = '/';
            })
            .catch((err) => console.log(err));
    };
    return (
        <Box>
            <Heading text="My account" route="/" />
            <Box className="flex flex-col items-center justify-center">
                <Box className="">
                    <Avatar name={data?.name} size='2xl' className="shadow-lg" />
                </Box>
                <Text className="text-textcolor mt-5 text-lg">{data?.name}</Text>
            </Box>
            <Box className="mt-5">
                <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Text className="text-doneText text-lg text-center ">User ID: <span className="text-textcolor font-bold">{data?.id}</span></Text>
                    <Text className="text-doneText text-lg text-center ">User Name: <span className="text-textcolor font-bold">{data?.name}</span></Text>
                    <Text className="text-doneText text-lg text-center ">Tasks: <span className="text-textcolor font-bold">{todoLength}</span></Text>
                    <Text className="text-doneText text-lg text-center ">User Email: <span className="text-textcolor font-bold">{data?.email}</span></Text>
                </Box>
                <Box className="flex justify-center mt-10">
                    <Button colorScheme="red" onClick={() => handleLogout()}>Logout</Button>
                </Box>
            </Box>
        </Box>
    )
};