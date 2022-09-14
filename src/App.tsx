import { useState } from 'react';
import './App.css';
import { LifeContainer } from './components/LifeContainer';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <LifeContainer />
    </div>
  );
}

export default App;
