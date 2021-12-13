import React from 'react'
import { Link } from 'react-router-dom'

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: 'Search a movie' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault()
    }
    render() {
        return (
            <nav className="flex">
                <div className="w-1/3 flex">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23 5.999v10l-6-3v-4l6-3zm-6-2.499c0 1.933-1.567 3.5-3.5 3.5s-3.5-1.567-3.5-3.5 1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5zm-12.5-3.5c-1.933 0-3.5 1.567-3.5 3.5s1.567 3.5 3.5 3.5 3.5-1.567 3.5-3.5-1.567-3.5-3.5-3.5zm9 9c-1.858 0-3.504-.926-4.5-2.341-.996 1.415-2.642 2.341-4.5 2.341-.521 0-1.022-.078-1.5-.213v4.713c0 .829.672 1.5 1.5 1.5h9c.828 0 1.5-.671 1.5-1.5v-4.713c-.478.135-.979.213-1.5.213zm-3.117 8h-2.766l-5.588 5.586 1.414 1.414 4.557-4.556v4.553h2v-4.553l4.557 4.556 1.414-1.414-5.588-5.586z" /></svg>
                    KINO
                </div>
                <section>
                    <Link to='/'>Home</Link>&nbsp;
                    <Link to='/top-movies'>Movies</Link>&nbsp;
                    <Link to='/top-tv-series'>Series</Link>&nbsp;
                </section>
            </nav>
        )
    }
}

export default Header