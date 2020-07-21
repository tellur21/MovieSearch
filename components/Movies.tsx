import React from 'react';
import MovieCard from './MovieCard';

const Movies = (props) => {
    const { movies } = props;    
    return (
        <div className='grid-container'>
            <div className='movies'>
                <h4>Movies</h4>
            </div>
            {movies.map((movie) => {
                return (
                    <div key={movie.imdbID}>
                        <div className='grid-item'>
                            <MovieCard movie={movie}/>
                        </div>                        
                    </div>
                );
            })}
        </div>
    );
};
export default Movies;