import React, {useState, useEffect} from 'react';
import {firestore} from './index';
import Task from './Task'
// import Card from './component/Card'
const App = props => {
        const [name, setName] = useState('')
        const [tasks, setTasks] = useState([])
            useEffect( () => {
                retriveData()
            }, [])

            const retriveData = () => {
                firestore.collection("tasks").onSnapshot( (snapshot) => {
                    console.log(snapshot.docs)
                    let myTask = snapshot.docs.map( d => {
                        const {id, name} = d.data()
                        console.log(id, name)
                        return {id, name}
                    })
                    setTasks(myTask)
                })
            }
            const deleteTask = (id) => {
                firestore.collection("tasks").doc(id+'').delete()
            }
            const editTask = (id) => {
                firestore.collection("tasks").doc(id+'').set({id,name})
            }
    
            const addTask = () => {
                let id=0
                if(tasks.length === 0)
                    id=1
                    else
                 id = tasks[tasks.length-1].id + 1
                firestore.collection("tasks").doc(id + '').set(  {id, name} )
    
            }
        const renderTask = () => {
            console.log(tasks)
            if(tasks && tasks.length){
                return tasks.map((task, index) => {
                    return (
                      <Task key={index} task={task} 
                      deleteTask = {deleteTask}
                      editTask = {editTask}
                      />
                    )
                })
            }
            else{
                return (<li> No task </li>)
            }
        }
       
       return (
           <div>
           <h1> todo</h1>
           <input type="text" name="name" onChange={ (e) => setName(e.target.value)} />
           <button onClick={addTask} >Submit</button>
               <ul>{renderTask()}</ul> 
            </div>
       )
}
export default App