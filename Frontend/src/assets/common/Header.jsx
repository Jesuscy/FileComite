import React from 'react'
import logo from '../../../public/img/FileCoMMite-log.png'
import "bootstrap/dist/css/bootstrap.min.css";


export const Header = () => {
    return (
        <>
            <div className="row header">
                <div className="col-md-3">
                    <h2>FileComite</h2>
                </div>
                <div className="col-md-6 share-files">
                    SHARE FILES
                </div>
                <div className="col-md-3">
                    <h2>INFO</h2>
                </div>
            </div>
        </>
    );
};