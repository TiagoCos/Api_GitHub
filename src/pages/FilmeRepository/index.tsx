import React from 'react'
import {useRouteMatch} from 'react-router-dom'
import {omdb} from '../../services/api'
import logo from '../../assets/logo.svg'
import {Header, RepoInfo} from './styles'
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi'
import {Link} from 'react-router-dom'

// crias três interfaces - que na verdade são tipos de dados
interface RepositoryParams {
    repositoryFilme: string;
}

interface FilmeRepository {
    Title: string;
    Year: number;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director:string;
    Writer:string;
    Actors:string;
    Plot: string;
    Language:string;
    Country:string;
    Awards:string;
    Poster:string;
    Ratings:string;
    Metascore:number;
    imdbRating:number;
    imdbVotes:string;
    imdbID:string;
    Type:string;
    DVD:string;
    BoxOffice:string;
    Production:string;
    Website:string;
    Response:boolean;
    
}


export const FilmeRepo:React.FC = () => {

    const [Filmerepository, setFilmeRepository] = React.useState<FilmeRepository | null>(null);
    const {params} = useRouteMatch<RepositoryParams>()
    React.useEffect( () => {
        
        
    
        
        // executado quando o repositório for alterado
        // consulta api do github para obter dados do repositório de interesse
       // omdb.get<OmdbRepository>(`?t=${novoRepo}&apikey=1b54b586`)
        omdb
            .get<FilmeRepository>(`?t=${params.repositoryFilme}&apikey=1b54b586`)
            .then(response => setFilmeRepository(response.data))
        // consulta api do github para obter dados das issues do repositório de interesse
    
        
    }, [params.repositoryFilme])
    
    return (
        <>
            <Header>
                <img src={logo} alt="GitCollection"/>
                <Link to="/"> 
                    <FiChevronLeft /> Voltar
                </Link>
            </Header>

            {Filmerepository && (
                <RepoInfo>
                    <header>
                        <img src={Filmerepository.Poster} />
                        <div>
                            <strong> {Filmerepository.Title} </strong>
                            <p> {Filmerepository.Released}  </p>
                            <p>{Filmerepository.Language}</p>
                        </div>
                    </header>
                    <ul>
                        <li> 
                            <strong> {Filmerepository.Runtime} </strong> 
                        </li>
                        <li>
                            <strong> {Filmerepository.Genre} </strong> 
                        </li>
                        <li> 
                            <strong> {Filmerepository.Writer} </strong> 
                        </li>
                        
                        <li> 
                            <strong> {Filmerepository.Actors} </strong> 
                        </li>
                        <li> 
                            <strong> {Filmerepository.Plot} </strong> 
                        </li>
                        <li> 
                            <strong> {Filmerepository.Director} </strong> 
                        </li>
                        <li>
                            <p>irmão</p>
                            <h1>irmão Gordo</h1>
                        </li>
                    </ul>
                </RepoInfo>
            )}

        </>
    )}