import React from 'react'
import './ResultContainer.css';
import ApplicationFitUI from './ApplicationFitUI';

function ResultContainer() {
   
  return (
    <>
        <div className='result-container'>
            <div className='scroll-caption'>
                <h4>Scroll down for results</h4>
            </div>
        </div>
        <ApplicationFitUI/>
    </>
  )
}

export default ResultContainer