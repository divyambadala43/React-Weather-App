import React from 'react'
import Weather from './app_component/weather.component'
import './App.css';
import 'weather-icons/css/weather-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from './app_component/form.component'


const API_KEY = "75f2b1fbb7ed69eb668ac2124877ba98"
class App extends React.Component{
  constructor(){
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false
    }

    //defining className for weather
    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"

    }
  }
  //Function to get different weather icons depending in the id of the icon
  getWeatherIcon(icon, rangeOfId){
    switch(true){
      case rangeOfId >= 200 && rangeOfId <= 232 :
      this.setState({
        icon: this.weatherIcon.Thunderstorm
      })
      break;

      case rangeOfId >= 300 && rangeOfId <= 321 :
        this.setState({
          icon: this.weatherIcon.Drizzle
        })
        break;

        case rangeOfId >= 500 && rangeOfId <= 531 :
          this.setState({
            icon: this.weatherIcon.Rain
          })
          break;

          case rangeOfId >= 600 && rangeOfId <= 622 :
            this.setState({
              icon: this.weatherIcon.Snow
            })
            break;

            case rangeOfId >= 701 && rangeOfId <= 781 :
              this.setState({
                icon: this.weatherIcon.Atmosphere
              })
              break;

              case rangeOfId = 800 :
                this.setState({
                  icon: this.weatherIcon.Clear
                })
                break;

                case rangeOfId >= 801 && rangeOfId <= 804 :
                  this.setState({
                    icon: this.weatherIcon.Clouds
                  })
                  break;
                  default: 
                  this.setState({icon: this.weatherIcon.Clouds})

    }
  }

  // Converting Temp to deg. Celsius
  CalCelsius(temp) {
    let Celsius = Math.floor(temp - 275.15)
    return Celsius
  }

  // Fetching data from API
  getWeather = async (e) => {
    e.preventDefault()

    //value of input with name="city" in form.component.jsx file
    const city = e.target.elements.city.value

    //value of input with name="country" in form.component.jsx file
    const country = e.target.elements.country.value

    if(city && country)
    {
      const API_CALL = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`)

    const response = await API_CALL.json();
    console.log(response)

    
    this.setState({
      city: `${response.name}, ${response.sys.country}`,
      celsius: this.CalCelsius(response.main.temp),
      temp_min: this.CalCelsius(response.main.temp_min),
      temp_max: this.CalCelsius(response.main.temp_max),
      description: response.weather[0].description,
      error: false
    })
    
    
    this.getWeatherIcon(this.weatherIcon, response.weather[0].id)
    }
    else
    {
      this.setState({error: true})
    }

  }


  render(){

    return(
    <div className="App">
      <Form 
      loadWeather = {this.getWeather}
      error = {this.state.error}
      />
      <Weather
      //props for weather data
        city = {this.state.city}
        country = {this.state.country}
        temp_celsius = {this.state.celsius}
        temp_min = {this.state.temp_min}
        temp_max = {this.state.temp_max}
        description = {this.state.description}
        weatherIcon = {this.state.icon}
        
      />

    </div>

  )}
}

export default App;