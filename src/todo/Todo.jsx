import React, { useEffect, useState } from 'react'

const Todo = () => {
    const [todos , setTodos]= useState();
    const [pageCount , setPageCount]= useState(0);
    // const [isdone , setIsDone ]= useState(false);
    const getTodos = async ()=>{
        const response = await fetch(`https://dummyjson.com/todos?limit=20&skip=${pageCount}`)
        const data = await response.json();
        console.log(data);
        setTodos(data)
    }

    const  loadMore = ()=>{
        if(pageCount<5){
            setPageCount(pageCount+1)
        }
    }

    const MarkAsDone=({item})=>{
        console.log(item);
    //    const tododata = {...item, completed:!completed}
    //     setTodos((prev)=>{
    //        return {...prev,tododata}
    //     })

        
    }

    useEffect(  ()=>{
         getTodos();
    },[pageCount])

  return (
    <div className=' container mx-auto px-4 '>
        <div className=' p-4 text-center'>
            <h1> Todo App</h1>
            <p>Total Pages :-{pageCount*20}.</p>
        </div>
        <div className='text-center'>
            {/* todos */}
           {todos?.todos.map(( item , idx )=>{
            return(
               <div className=' flex '>
                    <button onClick={()=>MarkAsDone(item)} className=' border p-1 ml-1 '>done</button>
                 <div className={`${item?.completed === true ? " line-through":""}`} key={idx}>{item.todo}</div>
               </div>
            )
           })}

           <button className={`p-2 border border-black rounded my-4 ${pageCount == 5 ? "disabled:" : null }`} onClick={loadMore} >Load More</button>
        </div>
    </div>
  )
}

export default Todo