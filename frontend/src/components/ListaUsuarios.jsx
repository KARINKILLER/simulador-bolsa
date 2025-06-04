import React from 'react';

const ListaUsuarios = ({ usuarios }) => {
  return (
    <div>
        {/* Modal para confirmar borrar el usuario */}
        
            {usuarios.map((usuario, index) => (
                <div key={index}>
                    <p>
                        Nombre de usuario: {usuario.nombre_usuario} Saldo: (${usuario.saldo_virtual}) <button className='btn btn-app-danger' onClick={openModal}>Eliminar</button>
                    </p>
                </div>
            ))}
    </div>
  );
}

export default ListaUsuarios;