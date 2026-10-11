
import Hero from "../../Hero/Hero";
import Weather from "../../Weather/Weather";
import News from "../../News/News";
import Gallery from "../../Gallery/Gallery";
import { useState } from "react";

const Main = () => {
  const [city, setCity] = useState('');
  return (
    <main>
      <Hero onSearch={setCity}/>
      <Weather city={city}/>
      <News/>
      <Gallery/>
    </main>
  );
};

export default Main;