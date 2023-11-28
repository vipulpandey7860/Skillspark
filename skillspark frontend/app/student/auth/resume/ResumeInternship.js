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
  asyncDeleteInternship,
  asyncAddInternship,
    asyncEditInternship
} from '@/store/Actions/studentAction';

const ResumeInternship = ({ isEditMode }) => {
  const dispatch = useDispatch();
  const { student } = useSelector((state) => state.studentReducer);

  const [editedData, setEditedData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const internDeleteHandler = (id) => {
    dispatch(asyncDeleteInternship(id));
  };

  const addInternHandler = () => {
    const newIntern = {
      schoolname: 'Edit your school name',
      year: 'Edit year of passing',
      percentage: 'Edit percentage / description',
    };

    const updatedInternships = [...student.resume.internships, newIntern];

    dispatch(asyncAddInternship(updatedInternships));
  };

  const editInternHandler = (id) => {
    const internshiptoEdit = student.resume.internships.find((intern) => intern.id === id);
    if (internshiptoEdit) {
      setEditedData(internshiptoEdit);
      setIsEditing(true);
    }
  };

  const saveInternHandler = () => {
    if (editedData.id) {
      dispatch(asyncEditInternship(editedData.id, editedData));
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
          Internship/s{' '}
          {isEditMode && (
            <button
              className="py-1 px-2 rounded ml-2"
              onClick={addInternHandler}
            >
              <FaPlusCircle className="mr-1" />
            </button>
          )}
        </h5>
        <div className="flex flex-col items-start w-full">
          {student &&
            student.resume.internships.map((internship, index) => (
                <div key={internship.id} className="w-full flex flex-row-reverse justify-between items-start px-4 pb-4 pt-2">
                <div className="flex gap-2 items-center">
                  {isEditMode && !isEditing && (
                    <>
                      <button
                        className="py-1 px-2 rounded mr-2"
                        onClick={() => editInternHandler(internship.id)}
                      >
                        <FaEdit className="mr-1" />
                      </button>
                      <button
                        onClick={() => internDeleteHandler(internship.id)}
                        className="py-1 px-2 rounded"
                      >
                        <FaTrash className="mr-1" />
                      </button>
                    </>
                  )}
                </div>
                <div className="pl-4 mt-2 flex flex-col gap-2 w-full">
                  <div>
                  <em className="opacity-50">Position</em>
                  {isEditing && editedData.id === internship.id ? (
                    <input
                      type="text"
                      name="position"
                      value={editedData.position}
                      onChange={(e) =>
                        setEditedData({ ...editedData, position: e.target.value })
                      }
                      className="border rounded w-full py-1 px-2"
                    />
                  ) : (
                    <h5 className="text-lg font-semibold">{internship.position}</h5>
                    )}
                  </div>
                  <div>
                  <em className="opacity-50">Company</em>
                  {isEditing && editedData.id === internship.id ? (
                    <input
                      type="text"
                      name="company"
                      value={editedData.company}
                      onChange={(e) =>
                        setEditedData({ ...editedData, company: e.target.value })
                      }
                      className="border rounded w-full py-1 px-2"
                    />
                  ) : (
                    <p>{internship.company}</p>
                    )}
                  </div>
                  <div>
                  <em className="opacity-50">Description</em>
                  {isEditing && editedData.id === internship.id ? (
                    <textarea
                      name="description"
                      value={editedData.description}
                      onChange={(e) =>
                        setEditedData({ ...editedData, description: e.target.value })
                      }
                      className="border rounded w-full py-1 px-2"
                    />
                  ) : (
                    <p >{internship.description}</p>
                    )}
                  </div>
                  
                  <div className='flex items-center justify-between w-full'>
                  <em className="opacity-50">Period of Work</em>
                  {isEditing && editedData.id === internship.id ? (
                    <input
                      type="text"
                      name="periodofwork"
                      value={editedData.periodofwork}
                      onChange={(e) =>
                        setEditedData({ ...editedData, periodofwork: e.target.value })
                      }
                      className="border rounded w-full py-1 px-2"
                    />
                  ) : (
                    <p  >{internship.periodofwork}</p>
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
              onClick={saveInternHandler}
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

export default ResumeInternship;
