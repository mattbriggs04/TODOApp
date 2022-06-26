import React from "react";

const AddTask = ({handleSubmit, handleOnChange, task}) => {
    return (
        <form className="add-task-form" onSubmit={handleSubmit}>
            <div>
                <input name="title" type="text" className="task-input" placeholder="Task" value={task.title || ''} onChange={handleOnChange} />
                <button type="submit" className="task-submit">+</button>
            </div>
            <textarea className="task-desc" name="description" placeholder="Description" id="form-textarea" value={task.description || ''} onChange={handleOnChange} rows="2" />
        </form>
    );
}

export default AddTask;