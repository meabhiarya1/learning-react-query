import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'

const Form = () => {
  const [text, setText] = useState('')

  // Define createTodo function before using it
  const createTodo = async (text) => {
    console.log(text)
    try {
      const response = await fetch('http://localhost:8000/todo/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: text }),
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      console.log('Todo created successfully')
      // refetch the data after mutation
      mutation.reset()
    } catch (error) {
      console.error('Error creating todo:', error.message)
      throw new Error('Failed to create todo')
    }
  }

  const mutation = useMutation(createTodo)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (text.trim() !== '') {
      try {
        await mutation.mutate(text)
        setText('')
      } catch (error) {
        console.error('Error:', error.message)
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default Form
