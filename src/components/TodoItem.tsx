import { Todo, userStore } from "@/store/loginuser";
import { Box, Checkbox, IconButton, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import EditModal from "./EditeModal";

interface TaskItemProps {
  id: number;
  title: string;
  timestamp: string;
  completed: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ id, title, timestamp, completed }) => {
  const { actions: { editestatuse, deleteTodo, decreaseTodoLength, setTodos } } = userStore((state) => state);
  const toast = useToast();

  const handleDelete = (id: number) => {
    axios.delete(`http://localhost:3000/api/posts/deleteItem/?id=${id}`, {
      withCredentials: true // Ensure cookies (token) are sent
    })
      .then((res) => {
        toast({
          title: res.data.message,
          status: 'success',
          position: 'top',
          duration: 2000,
          isClosable: true,
        });
        deleteTodo(id);
        decreaseTodoLength();
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: error.response?.data?.message || 'Error deleting todo',
          status: 'error',
          position: 'top',
          duration: 2000,
          isClosable: true,
        });
      });
  };

  const handleStats = async (id: number, currentStatus: boolean) => {
    try {
      await axios.put(`http://localhost:3000/api/posts/editpost/?id=${id}`, { completed: !currentStatus }, {
        withCredentials: true // Ensure cookies (token) are sent
      });

      editestatuse(id, !currentStatus);

      toast({
        title: 'Todo status updated successfully',
        status: 'success',
        position: 'top',
        duration: 2000,
        isClosable: true,
      });

    } catch (error) {
      console.error(error);
      toast({
        title: error.response?.data?.message || 'Error updating todo status',
        status: 'error',
        position: 'top',
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };


  return (
    <Box display="flex" alignItems="center" bg="gray.100" p={3} borderRadius="md" shadow="sm">
      <Checkbox
        mr={3}
        isChecked={completed}
        onChange={() => handleStats(id, completed)}
       size={'lg'}
      />
      <Box flex="1">
        <Text fontWeight="bold" fontSize='17px' className={completed ? 'line-through text-doneText' : ''}>{title}</Text>
        <Text fontSize="sm" color="gray.500">{formatTime(timestamp)}</Text>
      </Box>
      <EditModal text={title} id={id} initialTitle={title} />
      <IconButton
        aria-label="Delete task"
        icon={<FaTrash />}
        color="red"
        size="sm"
        onClick={() => handleDelete(id)}
      />
    </Box>
  );
};

export default TaskItem;
