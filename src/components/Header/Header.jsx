import "./Header.css"

const Header = () => {
     return (
        <header>
            <h1>Weather app</h1>

            <nav>
                <a href="#weather">Weather</a>
                <a href="#news">News</a>
                <a href="#gallery">Gallery</a>
            </nav>
        </header>
     )
}

export default Header