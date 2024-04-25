import React, { useState } from 'react'
import { Header } from '../common/Header'
import { Link } from 'react-router-dom'

export const Home = () => {

    const serverPort = [3000]
    const [selectedServer, selectServer] = useState()



    const listMeetings = () => {
        return (
            <div className="col-md-12">
                <div className="row meeting-row">

                    <div className="col-md-9 col-sm-12 col-xs-12 meeting-specs-name">{/*Nombre Reunion */}
                        <Link to='/meeting'>
                            <strong>FileCommite</strong>
                        </Link>

                    </div>

                    <div className="col-md-3 col-sm-12 col-xs-12 meeting-specs-button">{/*Botones Conectar / Desconectar */}
                        <strong>X</strong>
                    </div>
                </div>
            </div>

        )

    }


    return (
        <>
            <Header />
            <div className="row meetings-section">
                <div className="col-md-2 meetings-info">
                    <div className="row recent-meetings"><p>Recent Meetings</p>
                        <div className="col-md-12 comp-list">
                            {listMeetings()}


                        </div>

                        <p>Recent Messages</p>

                        <div className="col-md-12 comp-list">
                            {listMeetings()}
                            {listMeetings()}
                            {listMeetings()}
                        </div>
                    </div>

                </div>
                <div className="col-md-10 meetings-creator">
                    HOLAS
                </div>
            </div>
        </>
    )
}
