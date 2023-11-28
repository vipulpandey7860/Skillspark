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
  asyncDeleteAccomplishments,
  asyncAddAccomplishments,
  asyncEditAccomplishments,
} from '@/store/Actions/studentAction';

const ResumeAccomplishments = ({ isEditMode }) => {
  const dispatch = useDispatch();
  const { student } = useSelector((state) => state.studentReducer);

  const [editedData, setEditedData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const accomplishmentDeleteHandler = (id) => {
    dispatch(asyncDeleteAccomplishments(id));
  };

  const addAccomplishmentHandler = () => {
    const newAccomplishment = {
      title: 'Edit accomplishment title',
      description: 'Edit accomplishment description',
      year: 'Edit year',
    };

    const updatedAccomplishments = [...student.resume.accomplishments, newAccomplishment];

    dispatch(asyncAddAccomplishments(updatedAccomplishments));
  };

  const editAccomplishmentHandler = (id) => {
    const accomplishmentToEdit = student.resume.accomplishments.find((acc) => acc.id === id);
    if (accomplishmentToEdit) {
      setEditedData(accomplishmentToEdit);
      setIsEditing(true);
    }
  };

  const saveAccomplishmentHandler = () => {
    if (editedData.id) {
      dispatch(asyncEditAccomplishments(editedData.id, editedData));
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
      <section className="section_left border mx-5 flex flex-row gap-12 md:gap-1 items-start px-4">
        <h5 className="text-lg w-1/5  mt-4">
        Achievement{' '}
          {isEditMode && (
            <button
              className="py-1 px-2 rounded ml-2"
              onClick={addAccomplishmentHandler}
            >
              <FaPlusCircle className="mr-1" />
            </button>
          )}
        </h5>
        <div className="flex flex-col items-start w-full">
          {student &&
            student.resume.accomplishments.map((acc, index) => (
              <div key={acc.id} className="w-full flex flex-row-reverse justify-between items-start px-4 pb-4 pt-2">
                <div className="flex gap-2 items-center">
                  {isEditMode && !isEditing && (
                    <>
                      <button
                        className="py-1 px-2 rounded mr-2"
                        onClick={() => editAccomplishmentHandler(acc.id)}
                      >
                        <FaEdit className="mr-1" />
                      </button>
                      <button
                        onClick={() => accomplishmentDeleteHandler(acc.id)}
                        className="py-1 px-2 rounded"
                      >
                        <FaTrash className="mr-1" />
                      </button>
                    </>
                  )}
                </div>
                <div className="pl-4 mt-2 flex  flex-col gap-2">
                  <div className="">
                    <em className="opacity-50">Accomplishment Title</em>
                    {isEditing && editedData.id === acc.id ? (
                      <input
                        type="text"
                        name="title"
                        placeholder="Enter accomplishment title"
                        value={editedData.title}
                        onChange={(e) =>
                          setEditedData({ ...editedData, title: e.target.value })
                        }
                        className="border rounded w-full py-1 px-2"
                      />
                    ) : (
                      <p>{acc.title}</p>
                    )}
                  </div>
                    
                  <div className="">
                    <em className="opacity-50">Year:</em>
                    {isEditing && editedData.id === acc.id ? (
                      <input
                        type="text"
                        name="year"
                        placeholder="Enter year"
                        value={editedData.year}
                        onChange={(e) =>
                          setEditedData({ ...editedData, year: e.target.value })
                        }
                        className="border rounded w-full py-1 px-2"
                      />
                    ) : (
                      <p>{acc.year}</p>
                    )}
                  </div>
                    
                  <div className="">
                    <em className="opacity-50">Accomplishment Description:</em>
                    {isEditing && editedData.id === acc.id ? (
                      <input
                        type="text"
                        name="description"
                        placeholder="Enter accomplishment description"
                        value={editedData.description}
                        onChange={(e) =>
                          setEditedData({ ...editedData, description: e.target.value })
                        }
                        className="border rounded w-full py-1 px-2"
                      />
                    ) : (
                      <p>{acc.description}</p>
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
              onClick={saveAccomplishmentHandler}
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

export default ResumeAccomplishments;
