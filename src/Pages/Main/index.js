import React from 'react'
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa'
import { Container, Button, Form, List, DeleteButton } from './StyledMain'
import { useState, useCallback } from 'react'
import api from '../../Service/Api'
export default function Main() {
  const [newRepo, setNewRepo] = useState('')
  const [repositorys, setRepositorys] = useState([])
  const [loading, setLoading] = useState(false)

  function inputChange(e) {
    setNewRepo(e.target.value)
  }

  const handleSubmit = useCallback(
    e => {
      e.preventDefault()
      async function submit() {
        setLoading(true)
        try {
          const response = await api.get(`repos/${newRepo}`)
          // console.log(response.data)
          const data = {
            name: response.data.full_name
          }
          setRepositorys([...repositorys, data])
          setNewRepo('')
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
        }
      }
      submit()
    },
    [newRepo, repositorys]
  )

  const handleDelete = useCallback(
    repo => {
      const find = repositorys.filter(r => r.name !== repo)
      setRepositorys(find)
    },
    [repositorys]
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

        <Button Loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="white" size={15} />
          ) : (
            <FaPlus color="white" size={15} />
          )}
        </Button>
      </Form>

      <List>
        {repositorys.map(repo => (
          <li key={repo.name}>
            <DeleteButton onClick={() => handleDelete(repo.name)}>
              <FaTrash size={14} />
            </DeleteButton>
            <span>{repo.name}</span>
            <a href="">
              <FaBars size={20} />
            </a>
          </li>
        ))}
      </List>
    </Container>
  )
}
