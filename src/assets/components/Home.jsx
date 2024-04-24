import React, { useState } from 'react'
import { Header } from '../common/Header'
import { Link } from 'react-router-dom'

export const Home = () => {

    const serverPort = [3000]
    const [selectedServer, selectServer] = useState()



    const listMeetings = () => {
        return (

            <div className="row meeting-row">

                <div className="col-md-8 col-sm-12 col-xs-12 meeting-specs-name">{/*Nombre Reunion */}
                    <Link to='/meeting'>
                        <strong>FileCommite</strong>
                    </Link>

                </div>

                <div className="col-md-4 col-sm-12 col-xs-12 meeting-specs-button">{/*Botones Conectar / Desconectar */}
                    <strong>X</strong>
                </div>
            </div>

        )

    }


    return (
        <>
            <Header />

            <body>
                <div className="meetings-section">
                    <div className="col-md-2 col-sm-4 col-xs-4 meetings-info">
                        <div className="row meetings-info-header">
                            <p>Recent Meetings</p>
                        </div>
                        {listMeetings()}

                        <div className="row meetings-info-header">
                            <p>Messages</p>
                        </div>

                    </div>
                    <div className="col-md-8 col-sm-8 col-xs-8 meetings-container">

                    </div>

                </div>
            </body>
        </>
    )
}
