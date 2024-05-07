import React from 'react'

export const NewMeeting = () => {

    const currentStepIndex = 1
    const totalSteps = document.getElementsByClassName('step')
    const nextStep = (steps, currentStepIndex) =>{
        if(currentStepIndex > totalSteps.length){
        const currentStep = document.getElementById(`step${currentStepIndex}`)
        currentStep.classList.add('step-hidden')
        const nextngoStep = document.getElementById(`step${currentStepIndex+1}`)
        }
    }
    const backStep = (steps, currentStepIndex)=>{

    }
  

    return (

        <div className="container create-meeting-form">
            <div className="row">
            <div className="col-md-12 create-meeting-step" >
                <div className='step' id="step1">
                <div><label>Server Name</label></div>
                <div><input></input></div>
                </div>
                <div className='step' id="step2">
                <div><label>Server Password</label></div>
                <div><input></input></div>
                </div>   
                <div className='step' id="step3">
                <div><label>Server Roles</label></div>
                <div><input></input></div>
                <button>ADD</button>
                </div>
            </div>
        
            <div className="col-md-12 create-meeting-change-step">
                <button >Back</button>
                <button >Next</button>


            </div>
           

            </div>
        </div>

    )
}
