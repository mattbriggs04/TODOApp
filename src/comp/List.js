import React from "react";

const List = ({list, handleDelete, handleComplete, selectedCategory}) => {
    let filter = [];
    if(selectedCategory === "All") {
        filter = list;
    }
    else {
        filter = list.filter(task => task.category === selectedCategory)
    }
       
    return (
        <div className="list-container">
            <ul className="list">
                {
                    filter.map( (task) => (
                        <li key={task.id} className={`list-item completed-${task.completed}`}>
                            <div className="title-container">
                                <h3>{task.title}</h3>
                                <div className="button-container">
                                    <button className="complete" onClick={() => handleComplete(task.id)}>&#10004;</button>
                                    <button className="delete" onClick={() => handleDelete(task.id)}>&#x2716;</button>
                                </div>
                            </div>
                            <p className={`description ${task.description ? "" : "display-none"}`}>{task.description}</p>
                        </li>
                    )) 
                }
                    
            </ul>
        </div>
    )
}
export default List