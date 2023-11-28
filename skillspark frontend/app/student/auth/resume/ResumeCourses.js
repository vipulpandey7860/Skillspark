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
    asyncDeleteCourses,
    asyncAddCourses,
    asyncEditCourses,
} from '@/store/Actions/studentAction';

const ResumeCourses = ({ isEditMode }) => {
    const dispatch = useDispatch();
    const { student } = useSelector((state) => state.studentReducer);

    const [editedData, setEditedData] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    const courseDeleteHandler = (id) => {
        dispatch(asyncDeleteCourses(id));
    };

    const addCourseHandler = () => {
        const newCourse = {
            coursename: 'Edit your course name',
            year: 'Edit year of passing',
            description: 'Edit description',
        };

        const updatedCourse = [...student.resume.courses, newCourse];

        dispatch(asyncAddCourses(updatedCourse));
    };

    const editCourseHandler = (id) => {
        const coursetoEdit = student.resume.courses.find((course) => course.id === id);
        if (coursetoEdit) {
            setEditedData(coursetoEdit);
            setIsEditing(true);
        }
    };

    const saveCourseHandler = () => {
        if (editedData.id) {
            dispatch(asyncEditCourses(editedData.id, editedData));
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
                    Courses{' '}
                    {isEditMode && (
                        <button
                            className="py-1 px-2 rounded ml-2"
                            onClick={addCourseHandler}
                        >
                            <FaPlusCircle className="mr-1" />
                        </button>
                    )}
                </h5>
                <div className="flex flex-col items-start w-full ">
                    {student &&
                        student.resume.courses.map((course, index) => (
                            <div key={course.id} className="w-full flex flex-row-reverse justify-between items-start px-4 pb-4 pt-2">
                                <div className="flex gap-2 items-center">
                                    {isEditMode && !isEditing && (
                                        <>
                                            <button
                                                className="py-1 px-2 rounded mr-2"
                                                onClick={() => editCourseHandler(course.id)}
                                            >
                                                <FaEdit className="mr-1" />
                                            </button>
                                            <button
                                                onClick={() => courseDeleteHandler(course.id)}
                                                className="py-1 px-2 rounded"
                                            >
                                                <FaTrash className="mr-1" />
                                            </button>
                                        </>
                                    )}
                                </div>
                                <div className="pl-4 mt-2 flex  flex-col gap-2">
                                    <div className="">
                                        <em className="opacity-50">Course Name</em>
                                        {isEditing && editedData.id === course.id ? (
                                            <input
                                                type="text"
                                                name="coursename"
                                                placeholder="Enter Course name"
                                                value={editedData.coursename}
                                                onChange={(e) =>
                                                    setEditedData({ ...editedData, coursename: e.target.value })
                                                }
                                                className="border rounded w-full py-1 px-2"
                                            />
                                        ) : (
                                            <p>{course.coursename}</p>
                                        )}
                                    </div>

                                    <div className="">
                                        <em className="opacity-50">Year of Passing:</em>
                                        {isEditing && editedData.id === course.id ? (
                                            <input
                                                type="text"
                                                name="year"
                                                placeholder="Enter Year of complition"
                                                value={editedData.year}
                                                onChange={(e) =>
                                                    setEditedData({ ...editedData, year: e.target.value })
                                                }
                                                className="border rounded w-full py-1 px-2"
                                            />
                                        ) : (
                                            <p>{course.year}</p>
                                        )}
                                    </div>

                                    <div className="">
                                        <em className="opacity-50">Description:</em>
                                        {isEditing && editedData.id === course.id ? (
                                            <input
                                                type="text"
                                                name="description"
                                                placeholder="Enter description/description"
                                                value={editedData.description}
                                                onChange={(e) =>
                                                    setEditedData({ ...editedData, description: e.target.value })
                                                }
                                                className="border rounded w-full py-1 px-2"
                                            />
                                        ) : (
                                            <p>{course.description}</p>
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
                            onClick={saveCourseHandler}
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

export default ResumeCourses;
