'use client';

import { Box, Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import { userStore } from "@/store/loginuser";
import { useEffect } from "react";
import TaskItem from "@/components/TodoItem";
import Options from "@/components/Options";

export interface userData {
  id: number;
  name: string;
  email: string;
}

export interface posts {
  title: string;
  completed: boolean;
  data: string;
  id: number;
}

export default function Home() {
  const { isLoggedIn, todos, actions: { loginUser,decreaseTodoLength, setTodoLength, setTodos, deleteTodo } } = userStore((state) => state);
  const toast = useToast();

  useEffect(() => {
    axios.get("http://localhost:3000/api/user")
      .then((res) => {
        loginUser();
      })
      .catch((error) => {
        console.error(error);
      });

    axios.get("http://localhost:3000/api/posts/getposts")
      .then((res) => {
        setTodos(res.data.todos);
        setTodoLength(res.data.todos.length);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setTodoLength, setTodos, loginUser]);

  
  return (
    <Box>
      <main className="pt-5">
        <Options />
      </main>
      <Box className="flex flex-col space-y-5 mt-10">
        {todos?.map((item: posts) => (
          <TaskItem
            key={item.id}
            id={item.id}
            title={item.title}
            timestamp={item.data}
            completed={item.completed}
          />
        ))}
      </Box>
    </Box>
  );
}
