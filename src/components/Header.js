import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
	<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
		<div className="container">
			<Link to="/Home" className="navbar-brand">
				Demo para Pixialbum
			</Link>

			<ul className="navbar-nav mr-auto">
				<li className="nav-item">
					<Link 
						to='/home'
						className="nav-link"
						>Inicio
					</Link>
				</li>

				<li className="nav-item">
					<Link 
						to='/client-new'
						className="nav-link"
						>Nuevo Cliente
					</Link>
				</li>

				<li className="nav-item">
					<Link 
						to='/new-album'
						className="nav-link"
						>Galeria imágenes
					</Link>
				</li>
			</ul>

			

		</div>
	</nav>
);

export default Header;