import React, { useState } from 'react'
import { Header } from '../common/Header'
import { Link } from 'react-router-dom'
import { NewMeeting } from '../common/NewMeeting'

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
                <div className="col-md-2 col-sm-12 col-xs-12 meetings-info">
                    <div className="row recent-meetings">
                        <div className="col-md-12">
                            <p>Recent Meetings</p>
                            {listMeetings()}

                        </div>


                        <div className="col-md-12">
                            <p>Recent Messages</p>

                            {listMeetings()}
                            {listMeetings()}
                            {listMeetings()}
                        </div>
                    </div>

                </div>
                <div className="col-md-10 col-sm-12 col-xs-12">

                    <div className="container">
                        <div className="meetings-creator">
                            <div className="col-md-3 meetings-options">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="meeting-option">
                                            Create a new Meeting
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="meeting-option">
                                            Shearch Meeting
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="meeting-option">
                                            Info and tutorials.
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <div className="col-md-9">{<NewMeeting />}</div>



                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
