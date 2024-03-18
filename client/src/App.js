import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

const Form = () => {
  const [text, setText] = useState('');

  // Define createTodo function
  const createTodo = async (text) => {
    console.log(text); // Log the text variable to check its value
    try {
      const response = await fetch('http://localhost:8000/todo/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: text }), // Ensure the body is sent with the correct field name
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Todo created successfully');
      // Reset mutation to trigger refetching of data
      mutation.reset();
    } catch (error) {
      console.error('Error creating todo:', error.message);
      throw new Error('Failed to create todo');
    }
  };

  // Use useMutation hook to handle the mutation
  const mutation = useMutation(createTodo);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim() !== '') {
      try {
        // Call the mutation function with the text parameter
        await mutation.mutate(text);
        setText(''); // Clear the input field after successful submission
      } catch (error) {
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter todo"
          value={text}
          onChange={(e) => setText(e.target.value)} // Update text state on input change
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default Form;
