//packages
import React, { useEffect, useState } from "react";
//functions
import { useIsMount } from "../../customHooks";

const RenderNodeActions = ({type, done, node_id, changeNode, treeData, treePreview}) => {
  const isMount = useIsMount()
  const [isChecked, setIsChecked] = useState(done)
  const [inputValue, setInputValue] = useState(done.done)
  const [deboundcedInputVal, setDebouncedVal] = useState(inputValue)

  useEffect(() => {
    if(type === "Counter"){
      if(!isNaN(inputValue) || inputValue.match(/^[0-9\b]+$/)){
        const timerId = setTimeout(() => {
          setDebouncedVal(inputValue)
        }, 1000)
  
        return () => {
          clearTimeout(timerId)
        }
      } 
    }  
  }, [inputValue])

  useEffect(() => {
    if(!isMount){
      changeNode(node_id, treeData, treePreview.id, {
        attributes: {
          done: isChecked
        }
      })
    }      
  }, [isChecked])

  useEffect(() => {
    if(!isMount){
      if(deboundcedInputVal > done.steps){
        setInputValue(done.steps)
        return
      }
      changeNode(node_id, treeData, treePreview.id, {
        attributes: {
          done: {
            done: parseInt(deboundcedInputVal)
          }
        }
      })
    }      
  }, [deboundcedInputVal])

  if(type === "Checkbox"){
    return (
      <div className="ui checkbox">
        <input 
          type="checkbox"
          checked={isChecked}
          onChange={() => {
            setIsChecked(!isChecked)
          }}
        />
        <label>Erledigt</label>
      </div>
    )
  } else {
    return (
      <div className="ui mini action input">
        <button 
          className="ui green button right pointing label" 
          onClick={() => setDebouncedVal(inputValue+1)}>
          +1
        </button>
        <input type="text" value={inputValue} onChange={(e) => {setInputValue(e.target.value)}}/>
        /{done.steps}
      </div>      
    )
  }
}

export default RenderNodeActions