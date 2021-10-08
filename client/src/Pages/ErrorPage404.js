import React from 'react'
import errorImage from "../Images/errorImage.png"


export default function ErrorPage404() {
    return (
        <div className="error-page">  
        <h1 className="errorText">Error 404</h1>
        <img src={errorImage} alt="404" className="errorImage2"/>
        </div>
    )
}
