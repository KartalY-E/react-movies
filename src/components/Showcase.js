import React from 'react'
import bg from "../images/cinema-seats.jpg"

const Showcase = ({ showcaseData, showcaseEpisodeImg, showcaseEpisodeCount, showcaseEpisodeTitle }) => {
    return (
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
    )
}

export default Showcase
