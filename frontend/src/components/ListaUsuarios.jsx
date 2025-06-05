import React from 'react';
import  {useState} from 'react';
import Modal from './Modal';



const ListaUsuarios = ({ usuarios }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);


  const cerrarModal = () => {
    setModalOpen(false);
  };

  const preReinicio = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setModalOpen(true);
  };


  return (
    <div>
      <Modal isOpen={modalOpen}>
          <div className='modal-content-app p-4 text-center'>
              <h2 className='mb-3'>¿Estás seguro de que quieres reiniciar la cuenta del usuario: "{usuarioSeleccionado}"</h2>
              <p className='mb-4'>Si reinicias esta cuenta, se borrará todo el progreso y las transacciones. No se podrá recuperar nada.</p>
              <button className='btn btn-app-danger me-2'>Reiniciar cuenta</button>
              <button className='btn btn-app-secondary' onClick={cerrarModal}>Cancelar</button>
          </div>
      </Modal>
        {/* Modal para confirmar borrar el usuario */}
        
            {usuarios.map((usuario, index) => (
                <div key={index}>
                    <p>
                        Nombre de usuario: {usuario.nombre_usuario} Saldo: (${usuario.saldo_virtual}) <button className='btn btn-app-danger' onClick={() => preReinicio(usuario.nombre_usuario)}>Reiniciar cuenta</button>
                    </p>
                </div>
            ))}
    </div>
  );
}

export default ListaUsuarios;