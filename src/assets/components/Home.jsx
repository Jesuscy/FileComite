import React, { useState } from 'react'
import { Header } from '../common/Header'
import { Link } from 'react-router-dom'

export const Home = () => {

    const serverPort = [3000]
    const [selectedServer, selectServer] = useState()



    const listMeetings = () => {
        return (
            <div className="row meeting-row">
                <div className="col-md-8 meeting-specs">{/*Nombre Reunion */}
                    <strong>FileCommite</strong>
                </div>
                <div className="col-md-4 meeting-specs">{/*Botones Conectar / Desconectar */}
                    <Link to='/meeting'><button>Go</button></Link>
                    <button>Delete</button>

                </div>
            </div>
        )

    }
    return (
        <>
            <Header />
            <div className="container meetings-section">
                <div className="col-md-6 meetings-container">
                    {listMeetings()}

                </div>
            </div>
        </>
    )
}
