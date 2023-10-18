import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTodo } from '../features/todos/todosSlice'; // Adjust the path to your todos slice file
import { useToast } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';


export default function AddTaskModal() {
  const [task, setTask] = useState('');
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task.trim()) {
      toast({
        title: "Task error.",
        description: "Task can't be empty.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    try {
      const action = await dispatch(createTodo({ text: task }));

      if (createTodo.fulfilled.match(action)) {
        toast({
          title: "Task added successfully.",
          description: "Your task has been saved.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setTask(''); // Reset the task field
        navigate('/todo');

      }
    } catch (error) {
      if (error.message === 'Unauthorized') {
        navigate('/login');
      }
      toast({
        title: "Task error.",
        description: error.message || "There was an error adding your task.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="p-6 bg-white shadow-md rounded-md w-96">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Enter a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full mb-4"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 active:bg-blue-800"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}