import React from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import Swal from 'sweetalert2';


function ClientList({client, saveReloadClients}){

	const deleteClient =  id => {
		console.log('Eliminado: ', id );

		Swal.fire({
			title: '¿Estas seguro?',
			text: 'Un cliente eliminado no se puede recuperar',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: "Si, eliminar",
			cancelButtonText: 'Cancel'
		}).then( async (result) => {
			if(result.value){
				try{
					const url = `http://localhost:4000/clients/${id}`;
					const result = await axios.delete(url);

					if(result.status=200){
						Swal.fire(
							'Eliminado',
							'Se ha eliminado el cliente',
							'success'
						)
					saveReloadClients(true);
					}

				}catch(error){
					console.log(error);
					Swal.fire({
						type: 'error',
						title: 'Error',
						text: 'Hubo un error intentalo de nuevo'
					})
				}
			}
		})
	}

	return(
		<li className="list-group-item d-flex justify-content-between align-items-center">
			<p>
				{client.name} {' '}
				<span className="font-weight-bold">{client.lastName}</span>
			</p>

			<div>
				<Link 
					to={`/clientsEdit/editClient/${client.id}`}
					className="btn btn-success mr-2"
				>Editar </Link>	

				<button 
					type="button"
					className="btn btn-danger"
					onClick={() => deleteClient(client.id)}
				>
					Eliminar &times;
				</button>
			</div>

		</li>
	);
}

export default ClientList;