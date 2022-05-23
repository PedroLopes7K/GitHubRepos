import React from 'react'
import { FaGithub, FaPlus } from 'react-icons/fa'
import { Container, Button, Form } from './StyledMain'
import { useState, useCallback } from 'react'
import api from '../../Service/Api'
export default function Main() {
  const [newRepo, setNewRepo] = useState('')
  const [repositorys, setRepositorys] = useState([])

  function inputChange(e) {
    setNewRepo(e.target.value)
  }

  const handleSubmit = useCallback(
    e => {
      e.preventDefault()
      async function submit() {
        const response = await api.get(`repos/${newRepo}`)
        // console.log(response.data)
        const data = {
          name: response.data.full_name
        }
        setRepositorys([...repositorys, data])
        setNewRepo('')
      }
      submit()
    },
    [newRepo, repositorys]
  )

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        My Repositorys
      </h1>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add Repository"
          value={newRepo}
          onChange={inputChange}
        />

        <Button>
          <FaPlus color="white" size={15} />
        </Button>
      </Form>
    </Container>
  )
}
