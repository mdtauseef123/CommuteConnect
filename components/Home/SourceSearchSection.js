"use client";
import React, {useState} from 'react'
import InputItem from './InputItem'

function SourceSearchSection(props) {
  const {selectPosition, setSelectPosition} = props;
  
  return (
    <div className='p-2 md:pd-5 border-[2px] rounded-xl'>
        <p className='text-[20px] font-bold'>Get a ride</p>
        <InputItem type="source" selectPosition={selectPosition} setSelectPosition={setSelectPosition}/>
    </div>
  )
}

export default SourceSearchSection