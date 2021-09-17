import React, {useState , useEffect } from 'react';

const PirateForm = ( ({ships, onCreate, pirate, onUpdate}) => {

    const [statePirate, setStatePirate] = useState({
        firstName: "",
        lastName: "",
        age: 0,
        ship: null
    })

    const shipOptions = ships?.map((ship, index) => {
        return <option key={index} value={index}>{ship.name}</option>
    })



    const handleChange = function(event){
        let propertyName = event.target.name;
        let copiedPirate = {...statePirate}
        copiedPirate[propertyName] = event.target.value;
        setStatePirate(copiedPirate);

    }

    const handleShip = function(event){
        const index = parseInt(event.target.value)
        const selectedShip = ships[index]
        let copiedPirate = {...statePirate};
        copiedPirate['ship'] = selectedShip;
        setStatePirate(copiedPirate);

    }

    const handleSubmit = function(event){
        event.preventDefault();
        if(pirate){
            onUpdate(statePirate)
        }else{
            onCreate(statePirate)
        }
        onCreate(statePirate);
    }

    let heading = "";
    if(!pirate){
        heading="Create Pirate"
    }else{
        heading="Edit" + pirate.firstName;
    }

    useEffect(()=> {
        if(pirate){
            let copiedPirate = {...pirate};
            setStatePirate(copiedPirate)
        }
    },[pirate])

    const findShipIndex = function(){
        if(pirate){
            return ships.findIndex(ship => pirate.ship.id === ship.id)
        }else{
            return null;
        }
    }


    if(ships.length === 0){
     return <p>loading...</p>
    }
    return(
        <>
        <h3>{heading}</h3>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="First Name" name="firstName" onChange={handleChange} value={statePirate.firstName}/>
            <input type="text" placeholder="Last Name" name="lastName" onChange={handleChange} value={statePirate.lasttName}/>
            <input type="number" placeholder="Age" name="age" onChange={handleChange} value={statePirate.age}/>
           <select name="ship" onChange={handleShip} defaultValue={findShipIndex() || 'select-ship'}>
               <option disable value='select-ship'>Select a ship</option>
               {shipOptions}
           </select>
        

            <button type="submit">Save</button>
        </form>
        </> 
         )

    

})

export default PirateForm;