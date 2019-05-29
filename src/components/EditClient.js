import React, {useState, useRef} from 'react';
import Error from './Error';

import axios from 'axios';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom'; 

function EditClient(props){

	const {history,client, saveReloadClients} = props;

	const nameRef = useRef('');
	const lastNameRef = useRef('');
	const ageRef = useRef('');
	

	const [error, saveError ] = useState(false);
	const [sex, saveSex ] = useState('');

	const edithClient =  async e => {
		e.preventDefault();

		const newValueNameClient = nameRef.current.value,
			  newValueLastNameClient = lastNameRef.current.value,
			  newValueAgeClient = ageRef.current.value;

		if( newValueNameClient === '' | newValueLastNameClient==='' | newValueAgeClient==='' ){
			saveError(true);
			return;
		} 

		saveError(false);

		let typeSex = (sex==='') ? client.sex : sex;

		console.log(typeSex); 

		const editClient = {
			name: newValueNameClient,
			lastName: newValueLastNameClient,
			age: newValueAgeClient,
			sex: typeSex
		}
		
		const url = `http://localhost:4000/clients/${client.id}`;
		try{
			const result = await axios.put(url, editClient);
			
			if(result.status === 200){
				Swal.fire(
					'Cliente Editado',
					'Se ha editado correctamente el cliente',
					'success'
				)
			}

		}catch (error){
			Swal.fire({
				type: 'error',
				title: 'Error',
				text: 'Hubo un error, intenta nuevamente'
			});
		}

		saveReloadClients(true);
		history.push('/home');

	}
	const readValueRadio = e => {
		saveSex(e.target.value);
	}

	return(
		<div className="col-md-8 mx-auto">
		<h1>Editar Cliente</h1>

		{(error) ? <Error mensaje='Todos los campos son obligatorios'/> : null }

		<form 
			className="mt-5"
			onSubmit={edithClient}
		>
			<div className="form-group">
				<label>Nombre Cliente</label>
				<input
					type="text"
					className="form-control"
					name="nameClient"
					placeholder="Nombre cliente"
					ref={nameRef}
					defaultValue={client.name}
				/>
			</div>

			<div className="form-group">
				<label>Apellidos Cliente</label>
				<input
					type="text"
					className="form-control"
					name="lastNameClient"
					placeholder="Apellidos cliente"
					ref={lastNameRef}
					defaultValue={client.lastName}
				/>
			</div>

			<div className="form-group">
				<label>Edad</label>
				<input
					type="text"
					className="form-control"
					name="age"
					placeholder="Edad cliente"
					ref={ageRef}
					defaultValue={client.age}
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
                        defaultChecked={(client.sex === 'Masculino')}
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
                        defaultChecked={(client.sex === 'Femenino')}
                    />
                    <label className="form-check-label">
                        Femenino
                    </label>
                </div>
             	</div>

                

			<input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Editar cliente" />

		</form>
		</div>
	);
}

export default withRouter(EditClient);