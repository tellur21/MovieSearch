import React, { Component } from 'react';
import axios from 'axios';
import Movies from './Movies';

interface IState {
    dataType,
    allMovies,
    filteredMovies,
    year
}

class Search extends Component {
    state: IState;
    constructor(props) {
        super(props);
        this.state = {
            dataType: 'All',
            allMovies: [],
            filteredMovies: [],
            year: ''
        };
    }

    search = async title => {

        this.setState({ loading: true });

        var url = `http://localhost:1337/getMovieData?title=${title}`;

        const type = this.state.dataType;
        const year = this.state.year;

        if (type !== 'undefined' && type !== 'All') {
            url = url + `&type=${type}`;
        }

        if (year !== '') {
            url = url + `&y=${year}`;
        }

        axios.get(url)
            .then(response => response.data)
            .then(data => {
                console.log(data.Search);           

                this.setState({ allMovies: data.Search, filteredMovies: data.Search, loading: false });
            });
    };

    onChangeHandler = async e => {
        this.search(e.target.value);
        this.setState({ value: e.target.value });
    };

    typeChange = async e => {
        this.setState({ dataType: e.target.value }, this.filterMovies);
    };

    yearChange = async e => {        
        this.setState({ year: e.target.value }, this.filterMovies);
    };  

    filterMovies = () => {
        let filteredMovies = this.state.allMovies;
        const type = this.state.dataType;
        const year = this.state.year;
        if (type !== 'All') {
            filteredMovies = this.state.allMovies.filter(movie => movie['Type'] === type);
        }

        if (year !== '') {
            filteredMovies = filteredMovies.filter(movie => movie['Year'] === year);
        }

        this.setState({ filteredMovies: filteredMovies });
    }

    get renderMovies() {
        let movies = null;
        if (Array.isArray(this.state.filteredMovies) && this.state.filteredMovies.length) {
            movies = <Movies movies={this.state.filteredMovies} />
        }

        return movies;
    }

    render() {
        return (
            <div className='content'>
                <div className='grid-container'>
                    <div className='grid-item'>
                        <label htmlFor="title">Title:</label>
                        <input name="title"
                            onChange={e => this.onChangeHandler(e)}
                            placeholder="Type to search movie"
                        />
                    </div>
                    <div className='grid-item'>
                        <label htmlFor="types">Type:</label>
                        <select name="types" id="types" onChange={this.typeChange} value={this.state.dataType}>
                            <option value="all">All</option>
                            <option value="movie">Movie</option>
                            <option value="game">Game</option>
                            <option value="series">Series</option>
                            <option value="episode">Episode</option>
                        </select>
                    </div>
                    <div className='grid-item'>
                        <label htmlFor="year">Year:</label>
                        <input name="year" type='number' onChange={this.yearChange} value={this.state.year} placeholder="Type year to filter" />
                    </div>                    
                </div>
                {this.renderMovies}
            </div>
        );
    }
}

export default Search;