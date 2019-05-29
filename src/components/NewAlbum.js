import React, { useState, useEffect } from 'react';
import Seeker from './Seeker';
import ListImages from './ListImages';

function NewAlbum() {
    const [search, saveSearch] = useState('');
    const [images, saveImages] = useState([]);
    const [pageActual, savePageActual] = useState(1);
    const [totalPages, saveTotalPages] = useState(1);

    useEffect(() =>{
        const checkApi = async () => {

            if(search === '' ) return;

            const imagesForPage = 30;
            const key='8133740-0b34236d6920216684a07b996';
            const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imagesForPage}&page=${pageActual}`;

            const answer = await fetch(url);
            const result = await answer.json();

            saveImages(result.hits);

            const calculatePageTotal = Math.ceil(result.totalHits / imagesForPage);

            saveTotalPages (calculatePageTotal);

            const jumbotron = document.querySelector('.jumbotron');
            jumbotron.scrollIntoView({behavior: 'smooth', block: 'start'});
        }

        checkApi();

    }, [search, pageActual]);


    const previousPage = () => {
        let newActualPage = pageActual-1;
        savePageActual (newActualPage);
    }

    const nextPage = () => {
        let newActualPage = pageActual+1;
        savePageActual (newActualPage);
    }

    return ( 
        <div className= "app container">
            <div className = "jumbotron">
                <p className = "lead text-center"> Buscador de imágenes </p>    
                <Seeker
                    saveSearch={saveSearch}
                />
            </div> 
            <div className = "row justify-content-center">
                <ListImages 
                    images = {images}
                />

                { (pageActual === 1) ? null: (
                    <button onClick={previousPage} type="button" className="btn btn-info mr-1"> &laquo; Anterior </button>
                ) }

                { (pageActual === totalPages) ? null : (
                    <button onClick={nextPage} type="button" className="btn btn-info">Siguiente &raquo;</button>
                ) }


            </div> 
        </div>

    );
}

export default NewAlbum;