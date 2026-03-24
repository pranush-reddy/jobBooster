import React, { useState } from 'react';
import axios from 'axios';
import './InputsGrid.css';
import { useDataStore } from "../DataStore";
import ApplicationFitUI from './ApplicationFitUI';
import ResultContainer from './ResultContainer';

function InputsGrid() {
  const [JD, setJD] = useState("");
  const [file, setFile] = useState(null);
  const [ResumeText,SetResumeText]=useState("");
  const [Result,SetResult]=useState(null);
  const [processing,SetProcessing]=useState(false);
  const [ButtonTxt,SetTxt]=useState("Generate")

 const { setLLMData } = useDataStore();
  const handleFileChange = (e) => {
    const uploaded = e.target.files[0];
    if (uploaded && uploaded.type === "application/pdf") {
      setFile(uploaded);
    } else {
      alert("Please upload a valid PDF file");
    }
  };
  const HandleSubmit = async () => {
    if(!processing){
      SetTxt("Generating...")
    SetProcessing(true)
    const formData = new FormData();
    formData.append("file", file);

   const res = await axios.post(import.meta.env.VITE_FASTAPI, formData);
    SetResumeText(res.data);
  SendLLMRequest(res.data);}
  };
const SendLLMRequest = async (resumeText) => {
  try {
    const response = await axios.post(import.meta.env.VITE_BACKEND_URL,
      {
        resume: resumeText,
        jd: JD
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    );
 setLLMData(response.data.data);  // ⬅ store globally
    SetResult(response.data.data);
    SetProcessing(false);
    SetTxt("Generate")
   const container = document.querySelector(".app-fit-container");
  if (container) {
    container.scrollIntoView({ 
      behavior: "smooth", 
      block: "start" 
    });
  }

  } catch (error) {
    console.error("Axios Error:", error.response?.data || error.message);
  }
};
  return (<>
    <div className='input-grid'>
      <div className='resume-grid'>
        <span>📄</span>
        <h4>Upload Resume</h4>
        <p>Less than 5MB - PDF</p>
        {file && (<p style={{color:'blueviolet',fontSize:'13px'}}>📄{file?.name}</p>)}
 <input 
    type="file"
    id="fileUpload"
    accept="application/pdf"
    onChange={handleFileChange}
    hidden
  />

  <label htmlFor="fileUpload" className="custom-file-btn">
    Choose File
  </label>
      </div>

      <div className='JD-grid'>
        <span>📋</span>
        <h4>Paste Job Description</h4>
        <p>Copy from Job posting</p>

        <textarea placeholder='Paste your Job description'
          value={JD} 
          onChange={(e) => setJD(e.target.value)} 
        />
      </div>
     
    </div>
    <div className='submit-button' onClick={HandleSubmit}> <button>{ButtonTxt}</button></div>
    {!processing &&
    <ResultContainer/> }
    </>
  );
}

export default InputsGrid;