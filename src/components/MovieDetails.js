import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'


const MovieDetails = () => {
    const { id } = useParams()
    const apiBaseRoute = process.env.REACT_APP_API_URL
    const api_key_route = "?api_key=" + process.env.REACT_APP_API_KEY

    const [data, setData] = useState({})
    const [genres, setGenres] = useState([])

    // Get a list of the current popular movies /movie/popular
    async function fetchSerie(id) {

        const res = await fetch(apiBaseRoute + `/movie/` + id + api_key_route)
        const data = await res.json()
        return data
    }
    useEffect(() => {
        const getApiData = async () => {
            const dataFromServer = await fetchSerie(id)
            setData(dataFromServer)
            setGenres(dataFromServer.genres)
        }
        getApiData()
    }, [])

    return (
        <div className="movie-details" >
            <img src={"https://image.tmdb.org/t/p/w300/" + data.backdrop_path} alt="movie poster" />
            <h1>
                {typeof data.title !== 'undefined' ? data.title : data.name}
            </h1>
            <section>
                <div className='score my-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" /></svg>
                    &nbsp;{data.vote_average}
                </div>
                {genres.map((genre) => <div className='genre' key={genre.id}>{genre.name}</div>)}
            </section>
            <p className='p-1 font-semibold'>
                {data.overview}
            </p>
            <a href={data.homepage}>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z" /></svg>
                    <div>Watch now</div>
                </button>
            </a>
        </div>
    )
}

export default MovieDetails
