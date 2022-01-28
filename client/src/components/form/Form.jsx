import './Form.scss'
import { useState } from 'react';
import axios from 'axios';
import Logo from '../../assets/check-in-icon-0.svg';
import CustomButton from '../customButton/CustomButton';

function Form() {

  // state for collecting values from the input
  const [data, setData] = useState({
    name: "",
    date: ""
  });

  // state for handling error to dusplay error message to the user
  const [hasError, setHasError] = useState(false);

  // show a historical event one date pick
  const [historicalEvent, setHistoricalEvent] = useState("");

  // I want to show a historical event happening on that date 
  const showHistoricalEvent = (e) => {
    e.preventDefault();

    const fullDate = new Date(e.target.value);
    const month = fullDate.getMonth() + 1;  
    const date = fullDate.getDate()

    axios.get(`https://byabbe.se/on-this-day/${month}/${date}/events.json`)
      .then(res => {

        // once we receive an array of events, we want to display a random event
        const eventsOnThatDate = res.data.events; 
        const randomNum = Math.floor(Math.random()*eventsOnThatDate.length,);

        const displayedFact = `In ${eventsOnThatDate[randomNum].year}, ${eventsOnThatDate[randomNum].description}`
        setHistoricalEvent(displayedFact);
      })
      .catch(error => {

        // will display the error to the console and notify the user
        console.log(error);
        setHasError(true);
      })
  }
  
  // state for displaying errors and success messages from the backend
  const [backendMessage, setBackendMessage] = useState([]);

  // collecting data from inputs
  const handleInput = (e) => {
    e.preventDefault();
    const newData = {...data};
    newData[e.target.id] = e.target.value;
    setData(newData);
  } 

  const handleSubmit = (e) => {
    e.preventDefault();

    // on submission we will post data to the backend
    axios.post("/api", {
      name: data.name,
      date: data.date
    })
    .then(res => {

      // we will display a response message from the backend depending on the validation results
      const responseFromBackend = res.data;

      if (responseFromBackend.errors) {
        setBackendMessage(responseFromBackend.errors)
      } else if (responseFromBackend.success) {
        setBackendMessage(responseFromBackend.success)
      }

    })
    .catch(error => {

      // will display error to the console and notify the user
      console.log(error);
      setHasError(true);
    })
  }

  return (
    <div className="container d-flex justify-content-center">
    
      <form className="user-form" onSubmit={handleSubmit}>

        <ul>
          {backendMessage.map((item, i) => (
              <li className="success-error-note" key={i}>{item.message}</li>  
          ))}
        </ul>
        
        <div>
            <label className="form-label" htmlFor="name"> Please enter your name:</label>
            <input 
              id="name" 
              type="text" 
              name="name" 
              className="form-control mb-3" 
              value={data.name}
              onChange={(e) => handleInput(e)} 
            />
        </div>
        <div>
            <label className="form-label" htmlFor="date">Please enter date:</label>
            <input 
              id="date" 
              type="date" 
              name="date" 
              className="form-control" 
              value={data.date}
              onChange={(e) => {
                handleInput(e);
                showHistoricalEvent(e);
              }}
            />
        </div>
        <div className="buttons-container d-flex justify-content-between">
            <button type="submit" id="check-in-button" className="btn btn-outline-secondary mt-4 ms-3 button">
              <img className="checkin-logo" src={Logo} alt="check-in icon" />
              Check-in
            </button>
            <CustomButton className="btn btn-outline-secondary mt-4 ms-3 button" href="/users">All users</CustomButton>
        </div>
        
        <p className="interesting-fact">{historicalEvent}</p>

        {hasError && (
          <p className="text-danger text-center">The server encountered an internal error or misconfiguration and was unable to complete your request. Please contact the server administrator.</p>)}
      </form>
      
    </div>
  )
}

export default Form
