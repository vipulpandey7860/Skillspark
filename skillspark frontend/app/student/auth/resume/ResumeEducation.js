import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FaEdit,
  FaTrash,
  FaPlusCircle,
  FaSave,
  FaTimes,
} from 'react-icons/fa';
import {
  asyncDeleteEducation,
  asyncAddEducation,
  asyncEditEducation,
} from '@/store/Actions/studentAction';

const ResumeEducation = ({ isEditMode }) => {
  const dispatch = useDispatch();
  const { student } = useSelector((state) => state.studentReducer);

  const [editedData, setEditedData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const eduDeleteHandler = (id) => {
    dispatch(asyncDeleteEducation(id));
  };

  const addEduHandler = () => {
    const newEducation = {
      schoolname: 'Edit your school name',
      year: 'Edit year of passing',
      percentage: 'Edit percentage / description',
    };

    const updatedEducations = [...student.resume.education, newEducation];

    dispatch(asyncAddEducation(updatedEducations));
  };

  const editEducationHandler = (id) => {
    const educationToEdit = student.resume.education.find((edu) => edu.id === id);
    if (educationToEdit) {
      setEditedData(educationToEdit);
      setIsEditing(true);
    }
  };

  const saveEducationHandler = () => {
    if (editedData.id) {
      dispatch(asyncEditEducation(editedData.id, editedData));
    }
    setIsEditing(false);
    setEditedData({});
  };

  const cancelEditHandler = () => {
    setIsEditing(false);
    setEditedData({});
  };

  return (
    <div className="container">
      <section className="section_left border mx-5 gap-12 md:gap-1 flex flex-row items-start px-4">
        <h5 className="text-lg w-1/5  mt-4">
          Education{' '}
          {isEditMode && (
            <button
              className="py-1 px-2 rounded ml-2"
              onClick={addEduHandler}
            >
              <FaPlusCircle className="mr-1" />
            </button>
          )}
        </h5>
        <div className="flex flex-col items-start w-full">
          {student &&
            student.resume.education.map((edu, index) => (
              <div key={edu.id} className="w-full flex flex-row-reverse justify-between items-start px-4 pb-4 pt-2">
                <div className="flex gap-2 items-center">
                  {isEditMode && !isEditing && (
                    <>
                      <button
                        className="py-1 px-2 rounded mr-2"
                        onClick={() => editEducationHandler(edu.id)}
                      >
                        <FaEdit className="mr-1" />
                      </button>
                      <button
                        onClick={() => eduDeleteHandler(edu.id)}
                        className="py-1 px-2 rounded"
                      >
                        <FaTrash className="mr-1" />
                      </button>
                    </>
                  )}
                </div>
                <div className="pl-4 mt-2 flex  flex-col gap-2">
                  <div className="">
                    <em className="opacity-50">School Name</em>
                  {isEditing && editedData.id === edu.id ? (
                    <input
                      type="text"
                      name="schoolname"
                      placeholder="Enter school name"
                      value={editedData.schoolname}
                      onChange={(e) =>
                        setEditedData({ ...editedData, schoolname: e.target.value })
                      }
                      className="border rounded w-full py-1 px-2"
                    />
                  ) : (
                    <p>{edu.schoolname}</p>
                    )}
                  </div>
                    
                  <div className="">
                    <em className="opacity-50">Year of Passing:</em>
                  {isEditing && editedData.id === edu.id ? (
                    <input
                      type="text"
                      name="year"
                      placeholder="Enter Year of passing"
                      value={editedData.year}
                      onChange={(e) =>
                        setEditedData({ ...editedData, year: e.target.value })
                      }
                      className="border rounded w-full py-1 px-2"
                    />
                  ) : (
                    <p>{edu.year}</p>
                    )}
                  </div>
                    
                  <div className="">
                    <em className="opacity-50">Percentage/Description:</em>
                  {isEditing && editedData.id === edu.id ? (
                    <input
                      type="text"
                      name="percentage"
                      placeholder="Enter percentage/description"
                      value={editedData.percentage}
                      onChange={(e) =>
                        setEditedData({ ...editedData, percentage: e.target.value })
                      }
                      className="border rounded w-full py-1 px-2"
                    />
                  ) : (
                    <p>{edu.percentage}</p>
                    )}
                  </div>
                    
                </div>
              </div>
            ))}
        </div>
        {isEditMode && isEditing && (
          <div className="text-center m-4 flex items-center">
            <button
              className="py-1 px-2 rounded mt-2"
              onClick={saveEducationHandler}
            >
              <FaSave className="mr-1" />
            </button>
            <button
              className="py-1 px-2 rounded ml-2 mt-2"
              onClick={cancelEditHandler}
            >
              <FaTimes className="mr-1" />
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ResumeEducation;
