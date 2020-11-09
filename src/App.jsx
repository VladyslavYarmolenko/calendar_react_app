
import React, { useState } from 'react'
import Calendar from './components/Calendar';


function App() {

  const [date , setDate] = useState(null);
  return (
    <div className="App">
      {date && <p>Выбранная дата:{date.toLocaleDateString()}</p>}
      <Calendar
      setCurrentDate={setDate}/>
    </div>
  );
}

export default App;
