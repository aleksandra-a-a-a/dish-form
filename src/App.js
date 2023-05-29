import { useState } from 'react';
import moment from 'moment';
import './App.css';


function App() {

    const [name, setName] = useState('');
    const [preparationTime, setPreparationTime] = useState('00:00:00');
    const [type, setType] = useState('');
    const [noOfSlices, setNoOfSlices] = useState(0);
    const [diameter, setDiameter] = useState(0);
    const [spicinessScale, setSpicinessScale] = useState(0);
    const [slicesOfBread, setSlicesOfBread] = useState(0);
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false)

    function refreshPage() {
      window.location.reload(false)
    } 

    const handleSubmit = (e) => {
      e.preventDefault();
      
      // Perform validation
      const newErrors = {};
      if (!name) newErrors.name = 'Name is required.';
      if (!preparationTime) newErrors.preparationTime = 'Preparation time is required.';
      if (!type) newErrors.type = 'Type is required.';
      if (type === 'pizza') {
        if (!noOfSlices) newErrors.noOfSlices = 'Number of slices is required.';
        if (!diameter) newErrors.diameter = 'Diameter is required.';
      } else if (type === 'soup') {
        if (!spicinessScale) newErrors.spicinessScale = 'Spiciness scale is required.';
      } else if (type === 'sandwich') {
        if (!slicesOfBread) newErrors.slicesOfBread = 'Number of slices of bread is required.';
      }
  
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
      } else {
        // Convert preparationTime to desired format
        const formattedPreparationTime = moment(preparationTime, 'HH:mm:ss').format('HH:mm:ss');


        // Construct the JSON 
        let data = {
          name: name,
          preparation_time: formattedPreparationTime,
          type: type,
        };
  
        if (type === 'soup') {
          data.spiciness_scale = spicinessScale;
        }
        if (type === 'pizza') {
          data.no_of_slices = noOfSlices;
          data.diameter = diameter;
        }
        if (type === 'sandwich') {
          data.slices_of_bread = slicesOfBread;
        }
        
        // Send POST request
        fetch('https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }) 
          .then(res => res.json())
          .then(data => {
            console.log(data); // Handle the response data
            setIsSubmitted(true); 
            resetForm()
          })
          .catch(error => {
            console.error('Error:', error);
            setIsSubmitted(false);
          });
      };
      const resetForm = () => {
        setName('');
        setPreparationTime('');
        setType('');
        setNoOfSlices(0);
        setDiameter(0);
        setSpicinessScale(0);
        setSlicesOfBread(0);
        setErrors({});
      };
    };
  
    return (
      
      <form onSubmit={handleSubmit}>
        <h1>HexOcean Cookbook 👩‍🍳</h1>
        <div className='inputs'>
        <div className='name-input'>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className='preparation-input'>
          <label htmlFor="preparationTime">Preparation Time:</label>
          <input type="text" id="preparationTime" value={preparationTime} onChange={e => setPreparationTime(e.target.value)} />
          {errors.preparationTime && <span className="error">{errors.preparationTime}</span>}
        </div>
        <div className='type-input'>
          <label htmlFor="type">Type:</label>
          <select id="type" value={type} onChange={e => setType(e.target.value)}>
            <option value="">Select type</option>
            <option value="pizza">Pizza 🍕</option>
            <option value="soup">Soup 🍲</option>
            <option value="sandwich">Sandwich 🥪</option>
          </select>
          {errors.type && <span className="error">{errors.type}</span>}
        </div>
  
        {type === 'pizza' && (
          <div className='slices-input'>
            <label htmlFor="noOfSlices">Number of Slices:</label>
            <input type="number" id="noOfSlices" min="1" value={noOfSlices} onChange={e => setNoOfSlices(parseInt(e.target.value))} />
            {errors.noOfSlices && <span className="error">{errors.noOfSlices}</span>}
          </div>
        )}
  
        {type === 'pizza' && (
          <div className='diameter-input'>
            <label htmlFor="diameter">Diameter:</label>
            <input type="number" id="diameter" min="1" value={diameter} onChange={e => setDiameter(parseFloat(e.target.value))} />
            {errors.diameter && <span className="error">{errors.diameter}</span>}
          </div>
        )}
  
        {type === 'soup' && (
          <div className='spicy-input'>
            <label htmlFor="spicinessScale">Spiciness Scale:</label>
            <input type="number" id="spicinessScale" min="1" max="10" value={spicinessScale} onChange={e => setSpicinessScale(parseInt(e.target.value))}/>
            {errors.spicinessScale && <span className="error">{errors.spicinessScale}</span>}
          </div>
        )}
  
        {type === 'sandwich' && (
          <div className='bread-input'>
            <label htmlFor="slicesOfBread">Number of Slices of Bread:</label>
            <input type="number" id="slicesOfBread" min="0" value={slicesOfBread} onChange={e => setSlicesOfBread(parseInt(e.target.value))} />
            {errors.slicesOfBread && <span className="error">{errors.slicesOfBread}</span>}
          </div>
        )}
        </div>
       {isSubmitted ? <div><p>Your dish was submitted!</p><button onClick={refreshPage}>Add more!</button></div> : <button  type="submit">Submit</button>} 
      </form>
      
    );
  };
  
  export default App;