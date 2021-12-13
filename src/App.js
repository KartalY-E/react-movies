import Header from "./components/Header"
import Movies from "./components/Movies"
import bg from "./images/cinema-seats.jpg"
import MovieDetails from "./components/MovieDetails"
import SerieDetails from "./components/SerieDetails"
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'

const App = () => {
  const apiBaseRoute = process.env.REACT_APP_API_URL
  const api_key_route = `?api_key=${process.env.REACT_APP_API_KEY}`

  const [movies, setMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [topRatedSeries, setTopRatedSeries] = useState([])
  const [showcaseData, setShowcaseData] = useState({})
  const [showcaseEpisodeImg, setShowcaseEpisodeImg] = useState()
  const [showcaseEpisodeCount, setShowcaseEpisodeCount] = useState()
  const [showcaseEpisodeTitle, setShowcaseEpisodeTitle] = useState()
  const [trending, setTrending] = useState([])

  // Get a list of the current popular movies /movie/popular
  const fetchTrending = async (media_type, time_window) => {
    const res = await fetch(apiBaseRoute + `/trending/` + media_type + '/' + time_window + api_key_route)
    const data = await res.json()
    return data.results
  }
  // Get a list of the current popular movies /movie/popular
  const fetchMovies = async () => {
    const res = await fetch(apiBaseRoute + `/movie/popular` + api_key_route + `&language=en-US&page=1`)
    const data = await res.json()
    return data.results
  }

  // Get the top rated movies /movie/top_rated 
  const fetchTopRatedMovies = async () => {
    const res = await fetch(apiBaseRoute + `/movie/top_rated` + api_key_route + `&language=en-US&page=1`)
    const data = await res.json()
    return data.results
  }

  // Get the top rated tv series /tv/top_rated 
  const fetchTopRatedSeries = async () => {
    const res = await fetch(apiBaseRoute + `/tv/top_rated` + api_key_route + `&language=en-US&page=1`)
    const data = await res.json()
    return data.results
  }

  // Get a list of the current popular movies /movie/popular
  const fetchSerie = async (id) => {
    const res = await fetch(apiBaseRoute + `/tv/` + id + api_key_route)
    const data = await res.json()
    setShowcaseEpisodeImg(data.last_episode_to_air.still_path)
    setShowcaseEpisodeTitle(data.last_episode_to_air.name)
    setShowcaseEpisodeCount(data.number_of_episodes)
    return data
  }

  useEffect(() => {
    const getApiData = async () => {
      const moviesFromServer = await fetchMovies()
      setMovies(moviesFromServer)

      const topRatedMoviesFromServer = await fetchTopRatedMovies()
      setTopRatedMovies(topRatedMoviesFromServer)

      const topRatedSeriesFromServer = await fetchTopRatedSeries()
      setTopRatedSeries(topRatedSeriesFromServer)

      const showcaseData = await fetchSerie(130392)
      setShowcaseData(showcaseData)

      const trendingData = await fetchTrending("all", "week")
      setTrending(trendingData)
    }
    getApiData()
  }, [])

  return (
    <div className="container md:container md:mx-auto my-10">
      <Router>
        <Header />
        <Routes>
          <Route path="/"
            element={
              <main>
                <div className="popular">
                  <div className="showcase-movie">
                    <img src={bg} alt="cinema seats background" id="showcase-bg-img" />
                    <img src={"https://image.tmdb.org/t/p/w300/" + showcaseData.poster_path} alt="img of best series" id="showcase-img" />
                    <div id="showcase-info">
                      <h2>
                        {showcaseData.name}

                      </h2>
                      <p>
                        Season: {showcaseData.number_of_seasons}
                      </p>
                    </div>
                    <a href={showcaseData.homepage} id="showcase-button">
                      <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z" /></svg>
                        <div>Watch now</div>
                      </button>
                    </a>
                    <div id="showcase-episodes">
                      <a href={showcaseData.homepage} id="showcase-button">
                        <img src={"https://image.tmdb.org/t/p/w300/" + showcaseEpisodeImg} alt="img of last episode" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z" /></svg>
                        <div className="text">
                          <div>
                            &nbsp;{showcaseEpisodeCount}.&nbsp;{showcaseEpisodeTitle}
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>

                  <h1>Popular on IMDB</h1>

                  <div className="movies">
                    <Movies movies={movies} count={4} />
                  </div>

                </div>

                <div className="trending">
                  <h2>Trending</h2>
                  <div className="trending-cards">
                    <Movies movies={trending} count={8} />
                  </div>
                </div>

              </main>
            } />
          <Route path="/top-movies"
            element={
              <>
                <h1>Top rated movies</h1>
                <div className="top_rated_movies">
                  <Movies movies={topRatedMovies} count={20} />
                </div>
              </>
            } />
          <Route path="/top-tv-series"
            element={
              <>
                <h1>Top rated TV Series</h1>
                <div className="top_rated_movies">
                  <Movies movies={topRatedSeries} count={20} />
                </div>
              </>
            } />
          <Route path='/movie/:id' element={<MovieDetails />} />
          <Route path='/tv/:id' element={<SerieDetails />} />
        </Routes>
      </Router>
    </div>
  )
}
export default App