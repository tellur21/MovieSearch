import React from 'react';

const Movie = (props) => {
    const { movie } = props;

    let Title = movie.Title;
    let Year = movie.Year;
    let Type = movie.Type;

    return (
        <div>
            <div>                
                <h3>{Title}</h3>                
                <h4>Year: {Year}</h4>                
                <h4>Type: {Type}</h4>                
            </div>
        </div>
    );
}

export default Movie;
