import React, {useState} from 'react';
import Error from './Error';

import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

function NewClient({history,saveReloadClients}){

	const [name, saveName] = useState('');
	const [lastName, saveLastName] = useState('');
	const [age, saveAge] = useState('');
	const [sex, saveSex] = useState('');
	const [error, saveError] = useState(false);
	
	const readValueRadio = e => {
		saveSex(e.target.value);
	}

	const addClient = async e => {
		e.preventDefault();

		if(name === '' || lastName === '' || age === '' || sex === ''){
			saveError(true);
			return;
		}

		saveError(false);

		try{
			const result = await axios.post('http://localhost:4000/clients', {
				name, 
				lastName, 
				age, 
				sex
			});

			console.log(result);
			if(result.status === 201){
				Swal.fire(
					'Cliente Creado',
					'Se ha creado correctamente el cliente',
					'success'
				)
			}

		}catch (error){
			console.log('Error:' + error);
			Swal.fire({
				type: 'error',
				title: 'Error ',
				text: 'Ocurrio un error, vuelve a intentar crear el cliente'
			});
		}

		saveReloadClients(true);
		history.push('/home');
	}
	
	return(
		<div className="col-md-8 mx-auto">
		<h1>Nuevo Cliente</h1>

		{(error) ? <Error mensaje='Todos los campos son obligatorios'/> : null }

		<form 
			className="mt-5"
			onSubmit={addClient}
		>
			<div className="form-group">
				<label>Nombre Cliente</label>
				<input
					type="text"
					className="form-control"
					name="nameClient"
					placeholder="Nombre cliente"
					onChange={e => saveName(e.target.value)}
				/>
			</div>

			<div className="form-group">
				<label>Apellidos Cliente</label>
				<input
					type="text"
					className="form-control"
					name="lastNameClient"
					placeholder="Apellidos cliente"
					onChange={e => saveLastName(e.target.value)}
				/>
			</div>

			<div className="form-group">
				<label>Edad</label>
				<input
					type="text"
					className="form-control"
					name="age"
					placeholder="Edad cliente"
					onChange={e => saveAge(e.target.value)}
				/>
			</div>

			<legend className="text-center">Sexo:</legend>
                <div className="text-center">
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="sex"
                        value="Masculino"
                        onChange={readValueRadio}
                    />
                    <label className="form-check-label">
                        Masculino
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="sex"
                        value="Femenino"
                        onChange={readValueRadio}
                        
                    />
                    <label className="form-check-label">
                        Femenino
                    </label>
                </div>
             	</div>

                

			<input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Agregar cliente" />

		</form>
		</div>
	);
}

export default  withRouter(NewClient);