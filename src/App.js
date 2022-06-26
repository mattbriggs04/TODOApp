import React, { useState, useEffect } from 'react';
import './App.css';
import AddTask from './comp/AddTask';
import List from './comp/List';
import CategoryBar from './comp/CategoryBar';
import { Helmet } from 'react-helmet';


function App() {
  //username
  const [user, setUser] = useState("");
  const [userOverlay, setUserOverlay] = useState(false);
  //task state, list state
  const [task, setTask] = useState({});
  const [list, setList] = useState([]);
  //div list is the list for a selected div
  const [category, setCategory] = useState(""); //used for when a user makes a new category
  const [categoryList, setCategoryList] = useState(["All"]); //array of all categories made
  const [selectedCategory, setSelectedCategory] = useState("All"); //holds the current category that is selected
  //useEffects for local storage allocation
  //get localStorage off first render
  useEffect(() => {
    if(localStorage.getItem('categoryList') !== null) {
      setCategoryList(JSON.parse(localStorage.getItem('categoryList')));
    }
    if(localStorage.getItem('list') !== null) {
      setList(JSON.parse(localStorage.getItem('list')));
    }
    if(localStorage.getItem('user') !== null) {
      setUser(JSON.parse(localStorage.getItem('user')));
    } else {
      setUserOverlay(true);
    }
  }, [])
  //set localStorage whenever list updates
  useEffect(() => {
    localStorage.setItem('categoryList', JSON.stringify(categoryList));
  }, [categoryList])
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list])
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user])

  //sets the username - updates on every keystroke
  const handleUserOnChange = (e) => {
    e.preventDefault();
    setUser(e.target.value);
  }
  const handleUserOnSubmit = (e) => {
    e.preventDefault();
    setUserOverlay(false);
  }
  const handleUserChangeRequest = (e) => {
    
    e.preventDefault();
    setUserOverlay(true);
  }
  //changle handler: set the task to what is changed and give it an id relative to date
  const handleOnChange = ({ target }) => {
    //name will either be title or description, value is corresponding
    const {name, value} = target
    //keeps the !name, replaces name with its new value
    setTask((prev) => {
      return {
        ...prev,
        id: Date.now(),
        completed: false,
        [name]: value,
        category: selectedCategory
      }
    })
  }

  //submit handler, delete handler
  const handleSubmit = (e) => {
    e.preventDefault();
    //make sure there is some form of input
    if(task.title == null) {
      alert('Please enter a value in the task field');
      return;
    }
    setList((prev) => {
      return [task, ...prev]
    })
    setTask({});
  }
  const handleDelete = (id) => {
    setList((prev) => {
      //filter out the id parameter
      let newList = []
      for(let i=0; i < prev.length; i++) {
        if(prev[i].id !== id) {
          newList = [...newList, prev[i]]
        }
      }
      return newList;
    })
  }
  const handleComplete = (id) => {
    setList(list.map((task) => {
      if(task.id === id) {
        return {
          ...task,
          completed: !task.completed
        }
      }
      return task
    }))
  }

  //category handlers
  const handleOnClick = ({ target }) => {
    setSelectedCategory(target.value);
  }
  const handleCategoryOnChange = ({ target }) => {
    setCategory(target.value);
  }
  const handleCategorySubmit = () => {
    if(category === "" || category === null) {
      alert("Please enter a non-empty category");
      return;
    }
    let temp = false;
    categoryList.forEach(item => {
      if(item === category) {
        temp = true;
      }
    })
    if(temp) {
      setCategory("");
      alert("Error: that category already exists");
      return;
    }
    setCategoryList((prev) => {
      return [...prev, category];
    })
    setCategory("");
  }
  const handleCategoryDelete = ({ target }) => {
    const name = target.name;
    setCategoryList((prev) => {
      return prev.filter((item) => { return item !== name })
    })
    setSelectedCategory("All");
  }
  
  return (
    <div className="App">
    {/* using Helmet returns a warning message in React.Strictmode, but seems harmless */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>{user !== "" ? `${user}'s Todo List` : "Todo App"}</title>
        <meta name="description" content="Free TODO app, keep track of all tasks" />
      </Helmet>
      <div className={`overlay display-${userOverlay ? "block" : "none"}`}>
        <div className="modal">
          <h3>Hi, welcome to TODO, a free to-do app for your todo's!</h3>
          <form onSubmit={handleUserOnSubmit} autoComplete="off">
            <label htmlFor="userName">What's your name?</label>
            <input type="text" name="username" value={user} onChange={handleUserOnChange} />
            <button type="submit">Enter</button>
          </form>
        </div>
      </div>
      <CategoryBar category={category} categoryList={categoryList} handleOnClick={handleOnClick} handleCategorySubmit={handleCategorySubmit} handleCategoryOnChange={handleCategoryOnChange} handleCategoryDelete={handleCategoryDelete} />
      <header className="todo-header">
        {user !== "" ? <h1><span onClick={handleUserChangeRequest}>{user}'s</span> Todo List</h1> : <h1 className="no-user-header" onClick={handleUserChangeRequest}>Todo App</h1>}
      </header>
      <AddTask task={task} handleOnChange={handleOnChange} handleSubmit={handleSubmit} />
      <List list={list} selectedCategory={selectedCategory} handleDelete={handleDelete} handleComplete={handleComplete} />
      <footer style={{position: "fixed", bottom: ".3em", left: ".3em"}}>
        <p style={{color: "darkgray", fontSize: ".1em"}}>Created by Matt Briggs</p>
      </footer>
    </div>
  );
}

export default App;
