"use client"
import React, { useRef, useState } from 'react';
import ResumeEducation from './ResumeEducation';
import ResumeJobs from './ResumeJob';
import ResumeProfile from './ResumeProfile';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ResumeInternship from './ResumeInternship';
import ResumeCourses from './ResumeCourses';
import ResumeProjects from './ResumeProjects';
import ResumeSkills from './ResumeSkills';
import ResumeAccomplishments from './ResumeAccomplishments';

const ResumePage = () => {
    const resumeContainerRef = useRef(null);
    const [editMode, setEditMode] = useState(false); 

    
    const handleDownloadPDF = () => {
        const pdf = new jsPDF('p', 'pt', 'a4');
        const resumeContainer = resumeContainerRef.current;
      
        // Capture the content as an image using html2canvas
        html2canvas(resumeContainer).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
      
            // Adjust the scale to fit the PDF page with padding
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const padding = 5; // Adjust the padding as needed
            const imgWidth = pdfWidth - 2 * padding;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
            // Start the image from the top-left corner
            const xPos = padding;
            const yPos = padding;
      
            pdf.addImage(imgData, 'PNG', xPos, yPos, imgWidth, imgHeight);
            pdf.save('resume.pdf');
        });
      };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    return (
        <>
            <h1 className="text-center text-4xl font-bold py-5">Resume</h1>

            <div className='flex items-center justify-end px-24 m-4 gap-4'>

            <button
                className="bg-green-500  text-white font-bold py-2 px-4 rounded"
                onClick={handleDownloadPDF}
            >
                Download 
            </button>

            <button
                className="bg-yellow-500  text-white font-bold py-2 px-4 rounded "
                onClick={toggleEditMode}
            >
                {editMode ? 'Exit Edit ' : 'Edit '}
                </button>
            </div>

            <div className="container md:px-24 py-5 mb-20 " ref={resumeContainerRef}>
                <ResumeProfile />
                <ResumeEducation isEditMode={editMode} />
                <ResumeJobs isEditMode={editMode} />
                <ResumeInternship isEditMode={editMode} />
                <ResumeSkills isEditMode={editMode} />
                <ResumeProjects isEditMode={editMode} />
                <ResumeCourses isEditMode={editMode} />
                <ResumeAccomplishments isEditMode={editMode} />
            </div>

            
                
        </>
    );
};

export default ResumePage;
