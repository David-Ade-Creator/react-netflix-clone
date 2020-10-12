import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer'

const base_url = "https://image.tmdb.org/t/p/original";

function Row({title,fetchUrl,isLargeRow}) {
    const [movies,setMovies] = useState([]);
    const [trailerurl,setTrailerUrl] = useState('');
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
      async function fetchData() {
          setLoading(true)
          const request = await axios.get(fetchUrl)
          setMovies(request.data.results);
          setLoading(false);
      }
      fetchData();
    },[fetchUrl]);

    const opts = {
        height: '390',
        width:'100%',
        playerVars:{
            autoplay:1,
        }
    };

    const handleClick = (movie) => {
        if(trailerurl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.title || movie?.name || movie?.original_name || " ")
            .then(url => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            }).catch((error)=>console.log(error));
        }
    }

    return loading ? <div>loading...</div> : ( 
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {
                    movies.map(movie => (
                        <img
                        onClick={()=>handleClick(movie)}
                        key={movie.id} 
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path:movie.backdrop_path}`} alt={movie.name}/>
                    ))
                }q
            </div>
            {trailerurl && <YouTube videoId={trailerurl} opts={opts} /> }
        </div>
    )
}

export default Row
