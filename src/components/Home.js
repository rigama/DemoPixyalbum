import React, {Fragment} from 'react';
import ClientList from './ClientList';

function Home({clients,saveReloadClients}) {
	return(
		<Fragment>
			<h1 className="text-center"> Lista Clientes </h1>
			<ul className="list-group mt-5">
				{clients.map(client => (
					<ClientList
						key={client.id}
						client={client}
						saveReloadClients={saveReloadClients}
					/>
				))}
			</ul>
		</Fragment>
		
	);
}

export default Home;