import React from 'react'
import Taskcard from './Taskcard'
import { useSelector } from 'react-redux'
import CreateTaskDialog from '../dialogbox/CreateTaskDialog'
import { addTask ,setChange} from '../../features/Todolist/taskSlice'
import { useDispatch } from 'react-redux'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
export function  todaysdate(){
      let now = new Date(Date.now()); 
      let year = now.getFullYear();
      let month = now.getMonth() + 1; 
      let day = now.getDate();

     return `${year}-${month}-${day}`; 
  }
function TaskHolder({ barname, listeners, attributes }) {
  const tasks = useSelector((state) => state.taskStore.tasks)
  const [openDialog, setOpenDialog] = React.useState(false)
  const dispatch = useDispatch()

  function onSaveCall() {
    dispatch(addTask())
    setOpenDialog(false)
  }

  const handleOpenDialog = () => {
   
    dispatch(setChange({
        id:null,
        title:null,
        state:barname,
        description:null,
        date:todaysdate(),
    }))
    setOpenDialog(true)
  }

  const columnTasks = tasks.filter((task) => task.state === barname)
  const columnTaskIds = columnTasks.map((t) => `task-${t.id}`)

  // Make column droppable for tasks
  const { setNodeRef } = useDroppable({
    id: barname,
  })

  return (
    <div className="taskHolder">
      
      {/* Column title bar - draggable for column reordering */}
      <div className="titelBar" {...attributes} {...listeners}>
        <h2>
          {barname} <p>...</p>
        </h2>
      </div>
      <button className="addTask" onClick={handleOpenDialog}>
        +
      </button>
      <div className="taskListSholder" ref={setNodeRef}>
        <SortableContext items={columnTaskIds} id="sortableContextOfTask">
          {columnTasks.map((task, idx) => (
            <Taskcard
              key={`task-${task.id}-${idx}`}
              id={`task-${task.id}`}
              task={task}
            />
          ))}
        </SortableContext>
      </div>
      <CreateTaskDialog
        title={"Create Task"}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={onSaveCall}
      />
    </div>
  )
}

export default TaskHolder
