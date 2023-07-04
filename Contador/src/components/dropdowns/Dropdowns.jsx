import React from 'react';
import './dropdowns.css';


const Dropdowns = () => {
  const [localidades, setLocalidades] = useState([]);
  const [escuelas, setEscuelas] = useState([]);

  useEffect(() => {
    // Realizar la llamada a la API 
    fetch('API_JULI')
      .then(response => response.json())
      .then(data => {
        // Actualizar estado API
        setLocalidades(data.localidades);
        setEscuelas(data.escuelas);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      desplegable 
    </div>
    
      
   
  )
}

export default Dropdowns