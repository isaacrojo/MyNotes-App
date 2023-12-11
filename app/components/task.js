import React from 'react';

const Task = ({ task, onDelete }) => {
    return (
        <div className='flex items-center justify-between border p-2 my-2'>
            <span>{task}</span>
            <button onClick={onDelete} className='ml-2 px-2 py-1 bg-red-500 text-white rounded'>
                Delete
            </button>
        </div>
    );
};

export default Task;