import React from 'react'
import {Title, Formulario, Repo} from './styles'
import logo from  '../../assets/logo.svg'
import {omdb} from '../../services/api'

import {Link} from 'react-router-dom'

export const Filme:React.FC = () => {
    // vamos criar interface (tipo de dado) contendo campos de 
    // interesse do repositório
    interface OmdbRepository {
        Title: string;
        Genre: string;
        Poster: string;
    }
    // criar um estado que representa um novo repositório e inicia com vazio
    const [novoRepo, setNovoRepo] = React.useState('')
    // criar um estado que representa o vetor de repositórios buscados
    // inicia com vazio - tipo do vetor é de IGithubRepository
    const [repos, setRepos] = React.useState<OmdbRepository[]>([])
    
    // o que for digitado no input vai para a variávei novoRepo
    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setNovoRepo(event.target.value)
    }
    
    // vai na api do github e traz as info do repo
    async function handleAddRepo(event: React.FormEvent<HTMLFormElement>, ): Promise<void>{
        // não atualiza a página
        event.preventDefault()
        // tenta chamar a api

       
        try {
            const resposta = await omdb.get<OmdbRepository>(`?t=${novoRepo}&apikey=1b54b586`)
            const aux = resposta.data // acessa os dados do resultado
            // adiciona o resultado no vetor repos
            setRepos([...repos, aux])
        }
        catch {
            console.log(`Filme não encontrado`)
        }
    }
    return (
        <> 
            <img src={logo} alt="Filmes"/>
            <Title> Catálogo de Filmes </Title>
            <Formulario onSubmit={handleAddRepo}>
                <input placeholder="username/nome_repo" onChange={handleInputChange}/>
                <button type="submit"> Buscar </button> 
            </Formulario>

            <Repo>
                { // percorrer o vetor repos
                repos.map((item, indice) => (
                    <Link 
                        to={`/filmes/${item.Title}`}
                        key={item.Title + indice}    >
                        <img src={item.Poster} />
                        <div>
                            <strong> {item.Title} </strong>
                            <p> {item.Genre} </p> 
                        </div>
                    </Link>
                )

                )

                }
            </Repo>    
        </>
    )
}

