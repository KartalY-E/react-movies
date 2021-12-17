import Header from "./components/Header"
import Movies from "./components/Movies"
import Showcase from "./components/Showcase"
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
                  <Showcase
                    showcaseData={showcaseData}
                    showcaseEpisodeImg={showcaseEpisodeImg}
                    showcaseEpisodeCount={showcaseEpisodeCount}
                    showcaseEpisodeTitle={showcaseEpisodeTitle} />


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