import React, { useState } from 'react';
import Error from './Error';

function Seeker() {

    const [searchTerm, saveSearchTerm] = useState('');
    const [error, saveError] = useState(false); 

    const searchImage = e => {
        e.preventDefault();

        //validar 
        if(searchTerm === ''){
            saveError(true);
            return;
        }

        // Enviar el termino hacia el componente principal 
        saveError(false);
        return false;
    }

    return (
        <form onSubmit={searchImage}>
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imagen, ejempo: Futbol o Café"
                        onChange={e => saveSearchTerm(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    />
                </div>
            </div>
            { (error) ? <Error mensaje="Agrega un término de búsqueda" /> : null }
        </form>
    );
}

export default Seeker;