import React from 'react'
import { useEffect, useState } from 'react'
import { Container } from './StyledRepos'
import api from '../../Service/Api'
import { useParams } from 'react-router-dom'
export default function Repos() {
  const { repository } = useParams()
  const [repo, setRepo] = useState({})
  const [issues, setIssues] = useState([])
  const [loadind, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      // const nameRepo = decodeURIComponent(match.params.repository)
      const [repositorysData, issuesData] = await Promise.all([
        api.get(`/repos/${repository}`),
        api.get(`/repos/${repository}/issues`, {
          params: {
            state: 'open',
            per_page: 5
          }
        })
      ])
      // console.log(repositorysData.data)
      // console.log(issuesData.data)
      setRepo(repositorysData.data)
      setIssues(issuesData.data)
      setLoading(false)
    }

    load()
  })

  return (
    <Container>
      <h1>{repository}</h1>
    </Container>
  )
}
