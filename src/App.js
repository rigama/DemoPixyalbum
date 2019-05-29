import React from 'react';
import Seeker from './components/Seeker'

function App() {
    return ( 
        <div className= "app container">
            <div className = "jumbotron">
                <p className = "lead text-center"> Buscador de imágenes </p>    
                <Seeker/>
            </div> 
            <div className = "row justify-content-center">
            </div> 
        </div>

    );
}

export default App;