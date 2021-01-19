import React, { useState, useEffect}  from "react";
import api from "./services/api"
import "./styles.css";

function App() {
  const [repos, setRepos] = useState([])

  useEffect(() => {
    api.get("repositories").then(resp => {
      setRepos([...resp.data])
    })
  }, [])

  async function handleAddRepository() {
    const newRepo = {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    }

    const resp = await api.post("repositories", newRepo)

    setRepos([...repos, resp.data])
    
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    const newRepo = repos.filter(repo => repo.id !== id)

    setRepos([...newRepo])
  }

  return (
    <div>
       <ul data-testid="repository-list">
      {
        repos.map(({title, id}) => {
          return (
            <li key={id}>
              {title}
              <button onClick={() => handleRemoveRepository(id)}>
                Remover
              </button>
            </li>
          )
        })
      }
      </ul>
      

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
