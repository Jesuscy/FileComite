import React from 'react'
import logo from '../../../public/img/FileCoMMite-log.png'
import "bootstrap/dist/css/bootstrap.min.css";

export const Header = () => {
    return (
        <>
            <div className="row header">
                <div className="col-md-3"><img src={logo} /></div>
                <div className="col-md-6"><h1>SHARE FILES</h1></div>
                <div className="col-md-3"><h3>INFO</h3></div>
            </div>
        </>
    )
}
