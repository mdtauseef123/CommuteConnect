"use client";
import React, {useState} from 'react'
import InputItem from './InputItem'
import CarListOptions from './CarListOptions';

function SearchSection(props) {
  const {selectPosition, setSelectPosition} = props;
  const [sourceValue, setSourceValue] = useState("");
  const [destinationValue, setDestinationValue] = useState("");
  const [showRides, setShowRides] = useState(false);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [distance, setDistance] = useState(null);
  console.log("Godda Bolte -", origin);
  console.log("Patna Bolte -", destination);
  
  const calculateDistance = () => {
    // Split origin and destination into latitude and longitude
    const [originLat, originLng] = origin.split(',');
    const [destLat, destLng] = destination.split(',');

    // Convert latitude and longitude to radians
    const lat1 = deg2rad(parseFloat(originLat));
    const lon1 = deg2rad(parseFloat(originLng));
    const lat2 = deg2rad(parseFloat(destLat));
    const lon2 = deg2rad(parseFloat(destLng));

    // Haversine formula
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers

    setDistance(distance.toFixed(2)); // Round to 2 decimal places
    setShowRides(true);
  };
  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const handleClick = () => {
    calculateDistance();
  };
  return (
    <div>
        <div className='p-2 md:pd-5 border-[2px] rounded-xl'>
            <p className='text-[20px] font-bold'>Get a ride</p>
            <InputItem 
                type="source" 
                sourceValue={sourceValue} 
                setSourceValue={setSourceValue}
                origin={origin}
                setOrigin={setOrigin}
                selectPosition={selectPosition}
                setSelectPosition={setSelectPosition}
            />
            <InputItem 
                type="destination" 
                destinationValue={destinationValue} 
                setDestinationValue={setDestinationValue} 
                destination={destination}
                setDestination={setDestination}
                selectPosition={selectPosition} 
                setSelectPosition={setSelectPosition}
            />
            <button className='p-3 bg-black w-full mt-5 text-white rounded-lg' onClick={handleClick}>Search</button>
            
        </div>
        {showRides && <CarListOptions distance={distance}/>}
        
    </div>
    
  )
}

export default SearchSection