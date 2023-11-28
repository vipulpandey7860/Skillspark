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
  asyncDeleteSkills,
  asyncAddSkills,
  asyncEditSkills,
} from '@/store/Actions/studentAction';

const ResumeSkills = ({ isEditMode }) => {
  const dispatch = useDispatch();
  const { student } = useSelector((state) => state.studentReducer);

  const [editedData, setEditedData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const skillDeleteHandler = (id) => {
    dispatch(asyncDeleteSkills(id));
  };

  const addSkillHandler = () => {
    const newSkill = {
      skillname: 'Edit skill name (comma seperated)',
    };

    const updatedSkills = [...student.resume.skills, newSkill];

    dispatch(asyncAddSkills(updatedSkills));
  };

  const editSkillHandler = (id) => {
    const skillToEdit = student.resume.skills.find((skill) => skill.id === id);
    if (skillToEdit) {
      setEditedData(skillToEdit);
      setIsEditing(true);
    }
  };

  const saveSkillHandler = () => {
    if (editedData.id) {
      dispatch(asyncEditSkills(editedData.id, editedData));
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
      <section className="section_left border gap-12 md:gap-1 mx-5 flex flex-row items-start px-4">
        <h5 className="text-lg w-1/5  mt-4">
          Skills{' '}
          {isEditMode && (
            <button
              className="py-1 px-2 rounded ml-2"
              onClick={addSkillHandler}
            >
              <FaPlusCircle className="mr-1" />
            </button>
          )}
        </h5>
        <div className="flex flex-col items-start w-full">
          {student &&
            student.resume.skills.map((skill, index) => (
              <div key={skill.id} className="w-full flex flex-row-reverse justify-between items-start px-4 pb-4 pt-2">
                <div className="flex gap-2 items-center">
                  {isEditMode && !isEditing && (
                    <>
                      <button
                        className="py-1 px-2 rounded mr-2"
                        onClick={() => editSkillHandler(skill.id)}
                      >
                        <FaEdit className="mr-1" />
                      </button>
                      <button
                        onClick={() => skillDeleteHandler(skill.id)}
                        className="py-1 px-2 rounded"
                      >
                        <FaTrash className="mr-1" />
                      </button>
                    </>
                  )}
                </div>
                <div className="pl-4 mt-2 flex  flex-col gap-2">
                  <div className="w-full flex  flex-col gap-2">
                    <em className="opacity-50">Skill Name</em>
                    {isEditing && editedData.id === skill.id ? (
                      <textarea
                        name="skillname"
                        placeholder="Enter comma seperated skills"
                        value={editedData.skillname}
                        onChange={(e) =>
                          setEditedData({ ...editedData, skillname: e.target.value })
                        }
                        className="border rounded w-[50vw] py-1 px-2"
                      />
                    ) : (
                        <div className='flex flex-wrap gap-2' key={index}>
                        {skill.skillname?.split(',').map((sk, index) => (
                          <div className='flex items-center bg-gray-300 rounded-full px-5 py-1' key={index}>
                            <p>{sk}</p>
                          </div>
                        ))}
                      </div>
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
              onClick={saveSkillHandler}
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

export default ResumeSkills;
