import style from "./Weather.module.css"
const Weather = ({city})=>{
    return (
        <section>
            <h2>Weather in your cities</h2>
      <p>Your saved cities will appear here.</p>
       {city ? (
    <p>Selected city: {city}</p>
  ) : (
    <p>Your saved cities will appear here.</p>
  )}
        </section>
    )
}

export default Weather