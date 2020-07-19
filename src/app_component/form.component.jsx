import React from 'react'
import './form.style.css'


const Form = (props) => {
    return(
        <div className="container">
            <div> {props.error ? error() : null} </div>
            <form onSubmit={props.loadWeather}>
            <div className="row">
                <div className="col-md-3 offset-md-2">
                   <input name="city" placeholder="City" type="text" className="form-control" autoComplete="off" /> 
                </div>
                <div className="col-md-3">
                <input name="country" placeholder="Country" type="text" className="form-control" autoComplete="off" /> 
                </div>
                <div className="col-md-3 mt-md-0 py-2 text-md-left ">
                    <button className="btn btn-warning">Get Weather</button>
                </div>
            </div>
            </form>
        </div>
    )
}

function error(){
    return(
        <div className="alert alert-danger mx-5" role="alert">
            Please Enter City And Country
        </div>
    )
}


export default Form;