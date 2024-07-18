"use client"
import Options from "@/components/Options";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export interface userData {
  id: number;
  name: string;
  email: string;
}

export default function Home() {
  const [data, setData] = useState<userData | null>(null);
  const toast = useToast();

  useEffect(() => {
    axios.get("http://localhost:3000/api/user")
      .then((res) => {
        setData(res.data.data)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
        window.location.reload();
      })
      .catch((err) => console.log(err)
      )
  }

  return (
    <Box>

      <main className="pt-5">
        <Options />
      </main>
      <Box>
        <Text>{data?.id}</Text>
        <Text>{data?.name}</Text>
        <Text>{data?.email}</Text>
      </Box>
      <Button onClick={() => handleLogout()}>logout</Button>
    </Box>
  );
};