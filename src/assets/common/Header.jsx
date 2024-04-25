import React from 'react'
import logo from '../../../public/img/FileCoMMite-log.png'
import "bootstrap/dist/css/bootstrap.min.css";


export const Header = () => {
    return (
        <>
            <div className="row header">
                <div className="col-md-3">
                    <h4>FileComite</h4>
                </div>
                <div className="col-md-6 share-files">
                    SHARE FILES
                </div>
                <div className="col-md-3">
                    <h4>INFO</h4>
                </div>
            </div>
        </>
    );
};