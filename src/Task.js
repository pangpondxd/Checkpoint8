import React from 'react'

export default (props) => {
    const {task, editTask, deleteTask} = props
    const {id, name} = task
    return (
        <li>
{id} : {name}
<button onClick={() => deleteTask(task.id)}>Delete</button>
<button onClick={() => editTask(task.id)}>edit</button>
</li>
    )
}