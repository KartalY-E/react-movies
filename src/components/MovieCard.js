import React from 'react'
import { Link } from 'react-router-dom'

const Movie = ({ movie }) => {
    return (
        <Link to={typeof movie.title !== 'undefined' ? `/movie/${movie.id}` : `/tv/${movie.id}`}>
            <div className="single-movie" >
                <img src={"https://image.tmdb.org/t/p/w300/" + movie.poster_path} alt="movie poster" />
                <div className='p-1 font-semibold'>
                    <div className='score my-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" /></svg>
                        &nbsp;{movie.vote_average}
                    </div>
                    {typeof movie.title !== 'undefined' ? movie.title : movie.name}
                </div>
            </div>
        </Link>
    )
}

export default Movie
