"use client";
import Image from 'next/image'
import React, {useEffect, useState} from 'react'
import List from '@mui/material/List';
import ListItem from "@mui/material/ListItem";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const params = {
  q: "",
  format: "json",
  addressdetails: "addressdetails",
};

function InputItem(props) {
  const [searchText, setSearchText] = useState("");
  const [isListVisible, setIsListVisible] = useState(true);
  const selectPosition = props.selectPosition;
  const setSelectPosition = props.setSelectPosition;
  const sourceValue = props.sourceValue;
  const setSourceValue = props.setSourceValue;
  const destinationValue = props.destinationValue;
  const setDestinationValue = props.setDestinationValue;
  const origin = props.origin;
  const setOrigin = props.setOrigin;
  const destination = props.destination;
  const setDestination = props.setDestination;
  const [placeholder, setPlaceholder] = useState(null);
  const [listPlace, setListPlace] = useState([]);
  useEffect(() => {
    props.type == 'source'?
    setPlaceholder('Pickup Location'):
    setPlaceholder('Dropoff Location')
  });
  return (
    <div>
        <div className='bg-slate-200 p-3 rounded-lg mt-3 flex gap-4 items-center'>
            <Image src='/source.png' width={15} height={15}/>
            <input 
                type='text' 
                placeholder={placeholder} 
                className='bg-transparent w-full outline-none'
                value={searchText} 
                onChange={(event) => {
                    setSearchText(event.target.value)
                }}  
            />
            <SearchIcon
                variant="contained"
                onClick={() => {
                    // Search
                    const params = {
                        q: searchText,
                        format: "json",
                        addressdetails: 1,
                        polygon_geojson: 0,
                    };
                    const queryString = new URLSearchParams(params).toString();
                    const requestOptions = {
                        method: "GET",
                        redirect: "follow",
                    };
                    fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
                        .then((response) => response.text())
                        .then((result) => {
                            console.log(JSON.parse(result));
                            setListPlace(JSON.parse(result));
                        })
                        .catch((err) => console.log("err: ", err));
                }}
            >
            </SearchIcon>
        </div>
        <br></br>
        {isListVisible && (<List component="nav" aria-label="main mailbox folders">
          {listPlace.map((item) => {
            return (
              <div key={item?.place_id}>
                <ListItem
                  onClick={() => {
                    console.log(item.display_name);
                    if(props.type == 'source'){
                        setOrigin(item.lat + ", " + item.lon);
                        setSourceValue(item.display_name);
                    } else {
                        setDestination(item.lat + ", " + item.lon);
                        setDestinationValue(item.display_name);
                    }
                    setIsListVisible(!isListVisible);
                    setSearchText(item.display_name);
                    setSelectPosition(item);
                  }}
                >
                  <ListItemIcon>
                    <img
                      src="./placeholder.png"
                      alt="Placeholder"
                      style={{ width: 38, height: 38 }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={item?.display_name} />
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>)}
    </div> 
  );
}

export default InputItem