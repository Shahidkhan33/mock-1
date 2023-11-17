
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import InputComponent from "./InputComponent";
import { useNavigate } from 'react-router-dom'


function Admin() {

  const [taskList, setTaskList] = useState(
    []
  );

  const navigate = useNavigate()

  const { userid } = useParams()
  console.log(userid)

  const [text, setText] = useState("");
  const [editTaskId, setEditTaskId] = useState(-1);

  useEffect(() => {
    fetch("https://fsd-project-backend-5.onrender.com/admin/todos").then((res) => {
      return res.json();
    }
    ).then((data) => {
      console.log(data);
      data.map((task) => {
        setTaskList((taskList) => [
          ...taskList,
          {
            id: taskList.slice(-1)[0] ? taskList.slice(-1)[0].id + 1 : 1,
            name: task.title,
            _id: task._id,
            userID: task.userID,
          },
        ]);
      })

    }
    ).catch((err) => {
      console.log(err);
    }
    )
  }
    , []);

  const deleteTask = (i) => {
    console.log("delete task");
    let index = taskList.findIndex((obj) => obj.id === i);
    if (index > -1) {
      console.log("task id is" + taskList[index]._id);
      console.log("user id is" + userid);
      // taskList.splice(index, 1);
      // setTaskList([...taskList]);
      fetch("https://fsd-project-backend-5.onrender.com/todos/" + userid +"/"+ taskList[index]._id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        return res.json();
      }).then((data) => {
        console.log(data);
        taskList.splice(index, 1);
        setTaskList([...taskList]);
      }).catch((err) => {
        console.log(err);
      })

      setText("");
      setEditTaskId(-1);
    }
  };

  const editTask = (id) => {
    let index = taskList.findIndex((obj) => obj.id === id);
    if (index > -1) {
      setText(taskList[index].name);
      setEditTaskId(id);
    }
  };

  const handlelogout = async () => {
    fetch('https://fsd-project-backend-5.onrender.com/users/logout', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json())
      .then(data => {
        console.log("logout message is " + data)
        navigate("/login")
      }
      )
  }


  return (
    <div>

      <nav class="bg-violet-700 ">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ListLoom</span>
          </a>
          <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <button class="block py-6 px-6 my-2 mx-2 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page" onClick={handlelogout}>Logout</button>
              </li>

            </ul>
          </div>
        </div>
      </nav>


      <div id="app" className="min-w-[400px] w-1/2 mx-auto mt-16">
        <div className="max-w-4xl bg-violet-500 p-4 rounded-lg shadow-lg ">
          <div className=" font-medium text-3xl text-center">
            <p className="py-2 text-white">Todo List</p>
          </div>

          {/* 2 task  ----   add the todo and to edit a todo */}
          <InputComponent
            editTaskId={editTaskId}
            setEditTaskId={setEditTaskId}
            text={text}
            setText={setText}
            taskList={taskList}
            setTaskList={setTaskList}
            userid={userid}
          />


          {taskList.map((task, index) => (
            <div
              key={index}
              className="p-1 m-1 border border-violet-500 bg-violet-200 hover:bg-violet-100 rounded-md"
            >
              <div key={task.id} className="p-1">
                <div className="flex justify-between items-center">
                  <div> {task.name}</div>


                  <div className="flex ">
                    <div
                      onClick={() => editTask(task.id)}
                      className="bg-green-100 hover:bg-green-200 px-2 py-1 mx-1 rounded-md cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-green-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </div>



                    <div
                      onClick={() => deleteTask(task.id)}
                      className="bg-red-100 hover:bg-red-200 px-2 py-1 mx-1 rounded-md cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-red-500 "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </div>


                  </div>


                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Admin