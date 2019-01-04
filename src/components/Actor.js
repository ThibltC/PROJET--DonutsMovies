import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListMovies from '../components/ListMovies';
import Loader from 'react-loader-spinner';

import './Actor.css';


class Actor extends Component {

    state = {
        actorFilmo: undefined,
        isLoading: false,
        idMovie: undefined,
        actorDetails: undefined,
    }

    componentWillMount = async () => {
        const api_key = "91fe0a0af86fd4b9a59892545496d3b4"
        const { id } =  this.props.match.params
        await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${api_key}&language=fr-FR`)
            .then(data => data.json())
            .then(data => {
                this.setState({
                    actorDetails: data,
                })
            })
        fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${api_key}&language=fr-FR`)
            .then(data => data.json())
            .then(data => {
                this.setState({
                    actorFilmo: data,
                    isLoading: true,
                })
            })
    }

    getIdMovie = (idMovie) => {
        this.setState({
            idMovie: idMovie,
        })
    }


    render() {

        if (!this.state.isLoading) return (
            <div className='loading'>
                <Loader
                    type="TailSpin"
                    color="grey"
                    height="200"
                    width="200"
                />
            </div>
        )

        return (
            <div className='Actor'>
                <h2>{this.state.actorDetails.name}</h2>
                <img className='mainImage' src={`https://image.tmdb.org/t/p/w300${this.state.actorDetails.profile_path}`} alt="poster_path" />

                {this.state.actorDetails.birthday &&
                    <p>Anniversaire : {this.state.actorDetails.birthday.split('-').reverse().join('.')}</p>
                }
                <Link to='/'>
                    <button>Accueil</button>
                </Link>
                <div className='listResults filmographie'>
                    {this.state.actorFilmo.cast
                        .sort((a, b) => b.popularity - a.popularity)
                        .map((element, i) =>
                            <Link to={`/movie${this.state.actorFilmo.cast[i].id}`} key={`movie-${i}`}>
                                <ListMovies
                                    movieDetails={element}
                                    getIdMovie={this.getIdMovie}
                                />
                            </Link>
                        )}
                </div>
            </div>
        )
    }
}

export default Actor;