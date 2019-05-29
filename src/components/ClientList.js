import React from 'react';
import { Link } from 'react-router-dom';

function ClientList({client}){

	const deleteClient = id => {
		console.log('Eliminado: ', id );
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