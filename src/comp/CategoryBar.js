import React, { useState } from "react";

function CategoryBar({categoryList, category, handleOnClick, handleCategorySubmit, handleCategoryOnChange, handleCategoryDelete}) {
    const [display, setDisplay] = useState("block");
    const defaultChecked = "All";
    const [isMenuExpanded, setIsMenuExpanded] = useState(false);
    const handleAddBtn = (e) => { 
        e.preventDefault();
        setDisplay( (prev) => {
            return prev === "block" ? "none" : "block"
        })
    }
    const handleSubmit = (e) => {
        handleAddBtn(e);
        handleCategorySubmit();
    }
    const menuBtnHandler = (e) => {
        e.preventDefault();
        setIsMenuExpanded(prev => !prev);
    }
    return(
        <div>
            <div className="category-form" data-state={isMenuExpanded ? "open" : "closed"}>
                {
                    categoryList.map((item) => (
                        <div className="category-div" key={item}>
                            <input type="radio" id={item} name="category" value={item} onClick={handleOnClick} defaultChecked={item === defaultChecked} />
                            <label htmlFor={item}>{item}</label>
                            {
                                item === "All" ? 
                                null :
                                <button className="category-delete" name={item} onClick={handleCategoryDelete}>&#x2716;</button> 
                            }
                        </div>
                    ))
                }
                <div className="category-add">
                    <button onClick={handleAddBtn} className={`category-add-btn display-${display}`}>New</button>
                    <form onSubmit={handleSubmit} className={`category-input-form display-${display === "block" ? "none" : "block"}`}>
                        <input placeholder="New Category" type="text" onChange={handleCategoryOnChange} value={category} />
                        <button type="submit">+</button>
                    </form>
                    
                </div>
            </div>
            <i id="menu-btn" className="fa fa-bars"  aria-expanded={isMenuExpanded} onClick={menuBtnHandler}></i>
        </div>
    )
}

export default CategoryBar;