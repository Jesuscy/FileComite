import React from 'react'
import { Header } from '../common/Header'

export const Home = () => {

    const listMeetings = () => {
        return (
            <div className="row meeting-row">
                <div className="col-md-8 meeting-specs">{/*Nombre Reunion */}
                    <strong>FileCommite</strong>
                </div>
                <div className="col-md-4 meeting-specs">{/*Botones Conectar / Desconectar */}
                    <button>Go</button>
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
