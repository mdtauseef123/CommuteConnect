"use client";
import React, {useState} from 'react'
import InputItem from './InputItem'

function DestinationSearchSection(props) {
  const {selectPosition, setSelectPosition} = props;
  
  return (
    <div className='p-2 md:pd-5 border-[2px] rounded-xl'>
        <p className='text-[20px] font-bold'>Get a ride</p>
        <InputItem type="destination" selectPosition={selectPosition} setSelectPosition={setSelectPosition}/>
        <button className='p-3 bg-black w-full mt-5 text-white rounded-lg'>Search</button>
    </div>
  )
}

export default DestinationSearchSection