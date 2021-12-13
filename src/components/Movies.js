import React from 'react';
import MovieCard from './MovieCard';

const Movies = ({ movies ,count }) => {
    return (
        <>
            {movies.slice(0, count).map((movie, index) => (
                <MovieCard key={index} movie={movie} />
            ))}
        </>
    )
}

export default Movies