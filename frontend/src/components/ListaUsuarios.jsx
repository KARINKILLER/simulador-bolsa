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

  const reinicio = (usuario) => {
      fetch("http://localhost:8000/reiniciar-forzado", {
        method: 'POST', credentials: 'include',
       body: usuario, 
        headers: {
            'Content-Type': 'text/plain', 
        },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Cuenta reiniciada:', data);
        cerrarModal(); 
        window.location.reload();
      })
      .catch(error => {
        console.error('Error al reiniciar la cuenta:', error);
      });
    
  }


  return (
    <div>
      <Modal isOpen={modalOpen}>
          <div className='modal-content-app p-4 text-center'>
              <h2 className='mb-3'>¿Estás seguro de que quieres reiniciar la cuenta del usuario: "{usuarioSeleccionado}"</h2>
              <p className='mb-4'>Si reinicias esta cuenta, se borrará todo el progreso y las transacciones. No se podrá recuperar nada.</p>
              <button className='btn btn-app-danger me-2' onClick={() => reinicio(usuarioSeleccionado)}>Reiniciar cuenta</button>
              <button className='btn btn-app-secondary' onClick={cerrarModal}>Cancelar</button>
          </div>
      </Modal>
        {/* Modal para confirmar borrar el usuario */}
        
            {usuarios.map((usuario, index) => (
              <div className='usuario-card-compacta mb-3' key={index}>
                <div className = 'row' >
                    <p className='col me-3'> <strong>{usuario.nombre_usuario}</strong> </p>
                    <p className='ms-4 col'>Saldo: ${usuario.saldo_virtual}</p>
                     <button className='btn btn-app-secondary col-2' onClick={() => preReinicio(usuario.nombre_usuario)}>Reiniciar cuenta</button>

                </div>
              </div>

            ))}
    </div>
  );
}

export default ListaUsuarios;