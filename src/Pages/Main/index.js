import React from 'react'
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa'
import { Container, Button, Form, List, DeleteButton } from './StyledMain'
import { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../Service/Api'
export default function Main() {
  const [newRepo, setNewRepo] = useState('')
  const [repositorys, setRepositorys] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(false)

  // SEARCH
  useEffect(() => {
    const resposStorage = localStorage.getItem('Repos')
    if (resposStorage) {
      setRepositorys(JSON.parse(resposStorage))
    }
  }, [])

  // SAVE CHANGES
  useEffect(() => {
    localStorage.setItem('Repos', JSON.stringify(repositorys))
  }, [repositorys])

  function inputChange(e) {
    setNewRepo(e.target.value)
    setAlert(false)
  }

  const handleSubmit = useCallback(
    e => {
      e.preventDefault()
      // let hasRepo = newRepo

      async function submit() {
        setLoading(true)
        setAlert(false)
        try {
          if (newRepo === '') {
            throw new Error('Input Empty!')
          }
          // if (repositorys.includes(newRepo)) {
          //   alert('Repository already exists!')
          // }
          const response = await api.get(`repos/${newRepo}`)
          const hasRepo = repositorys.find(repo => repo.name === newRepo)

          if (hasRepo) {
            // alert('Repository already exists!')
            throw new Error('Repository already exists!')
          }
          // console.log(response.data)
          const data = {
            name: response.data.full_name
          }
          setRepositorys([...repositorys, data])
          setNewRepo('')
        } catch (error) {
          setAlert(true)

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
      <Form onSubmit={handleSubmit} error={alert}>
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
            <Link to={`/repos/${encodeURIComponent(repo.name)}`}>
              <FaBars size={20} />
            </Link>
          </li>
        ))}
      </List>
    </Container>
  )
}
