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
  asyncDeleteProjects,
  asyncAddProjects,
  asyncEditProjects,
} from '@/store/Actions/studentAction';

const ResumeProjects = ({ isEditMode }) => {
  const dispatch = useDispatch();
  const { student } = useSelector((state) => state.studentReducer);

  const [editedData, setEditedData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const projectDeleteHandler = (id) => {
    dispatch(asyncDeleteProjects(id));
  };

  const addProjectHandler = () => {
    const newProject = {
      projectname: 'Edit project name',
      description: 'Edit project description',
    };

    const updatedProjects = [...student.resume.projects, newProject];

    dispatch(asyncAddProjects(updatedProjects));
  };

  const editProjectHandler = (id) => {
    const projectToEdit = student.resume.projects.find((project) => project.id === id);
    if (projectToEdit) {
      setEditedData(projectToEdit);
      setIsEditing(true);
    }
  };

  const saveProjectHandler = () => {
    if (editedData.id) {
      dispatch(asyncEditProjects(editedData.id, editedData));
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
          Projects{' '}
          {isEditMode && (
            <button
              className="py-1 px-2 rounded ml-2"
              onClick={addProjectHandler}
            >
              <FaPlusCircle className="mr-1" />
            </button>
          )}
        </h5>
        <div className="flex flex-col items-start w-full">
          {student &&
            student.resume.projects.map((project, index) => (
              <div key={project.id} className="w-full flex flex-row-reverse justify-between items-start px-4 pb-4 pt-2">
                <div className="flex gap-2 items-center">
                  {isEditMode && !isEditing && (
                    <>
                      <button
                        className="py-1 px-2 rounded mr-2"
                        onClick={() => editProjectHandler(project.id)}
                      >
                        <FaEdit className="mr-1" />
                      </button>
                      <button
                        onClick={() => projectDeleteHandler(project.id)}
                        className="py-1 px-2 rounded"
                      >
                        <FaTrash className="mr-1" />
                      </button>
                    </>
                  )}
                </div>
                <div className="pl-4 mt-2 flex  flex-col gap-2">
                  <div className="">
                    <em className="opacity-50">Project Name</em>
                    {isEditing && editedData.id === project.id ? (
                      <input
                        type="text"
                        name="projectname"
                        placeholder="Enter project name"
                        value={editedData.projectname}
                        onChange={(e) =>
                          setEditedData({ ...editedData, projectname: e.target.value })
                        }
                        className="border rounded w-full py-1 px-2"
                      />
                    ) : (
                      <p>{project.projectname}</p>
                    )}
                  </div>
                                        
                  <div className="">
                    <em className="opacity-50">Project Description:</em>
                    {isEditing && editedData.id === project.id ? (
                      <input
                        type="text"
                        name="description"
                        placeholder="Enter project description"
                        value={editedData.description}
                        onChange={(e) =>
                          setEditedData({ ...editedData, description: e.target.value })
                        }
                        className="border rounded w-full py-1 px-2"
                      />
                    ) : (
                      <p>{project.description}</p>
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
              onClick={saveProjectHandler}
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

export default ResumeProjects;
