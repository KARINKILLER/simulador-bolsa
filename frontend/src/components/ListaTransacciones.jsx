import React from 'react';

const ListaTransacciones = ({ transacciones }) => {
    const opcionesAcciones = [
        {nombre: 'Apple (AAPL)', ticker: 'AAPL' },
        {nombre: 'Microsoft (MSFT)', ticker: 'MSFT' },
        {nombre: 'Amazon (AMZN)', ticker: 'AMZN' },
        {nombre: 'Google (GOOGL)', ticker: 'GOOGL' },
        {nombre: 'NVIDIA (NVDA)', ticker: 'NVDA' },
        {nombre: 'JPMorgan Chase & Co (JPM)', ticker: 'JPM' },
        {nombre: 'Johnson & Johnson (JNJ)', ticker: 'JNJ' },
        {nombre: 'The Walt Disney Company (DIS)', ticker: 'DIS' },
        {nombre: 'The Coca-Cola Company (KO)', ticker: 'KO' },
        {nombre: 'Nike (NKE)', ticker: 'NKE' },
        {nombre: 'Adobe (ADBE)', ticker: 'ADBE' },
        {nombre: 'Netflix (NFLX)', ticker: 'NFLX' },
        {nombre: 'Salesforce / Slack (CRM)', ticker: 'CRM' },
        {nombre: 'Costco (COST)', ticker: 'COST' },
        {nombre: 'The Home Depot (HD)', ticker: 'HD' },
        {nombre: 'Cisco (CSCO)', ticker: 'CSCO' },
        {nombre: 'Toyota (TM)', ticker: 'TM' },
        {nombre: 'Procter & Gamble (PG)', ticker: 'PG' },
        {nombre: 'Starbucks (SBUX)', ticker: 'SBUX' },
        {nombre: 'American Express (AXP)', ticker: 'AXP' },
        {nombre: 'AMD (AMD)', ticker: 'AMD' },
        {nombre: 'McDonalds (MCD)', ticker: 'MCD' },
        {nombre: 'FedEx (FDX)', ticker: 'FDX' },
        {nombre: 'Target (TGT)', ticker: 'TGT' },
        {nombre: 'Unilever (UL)', ticker: 'UL' },
        {nombre: '3M (MMM)', ticker: 'MMM' },
        {nombre: 'Southwest Airlines (LUV)', ticker: 'LUV' },
        {nombre: 'Hershey Company (HSY)', ticker: 'HSY' },
        {nombre: 'Colgate Palmolive (CL)', ticker: 'CL' },
        {nombre: 'Marriott (MAR)', ticker: 'MAR' },
        {nombre: 'Honda (HMC)', ticker: 'HMC' },
        {nombre: 'Logitech (LOGI)', ticker: 'LOGI' },
        {nombre: 'Philips (PHG)', ticker: 'PHG' },
        {nombre: 'Nintendo (NTDOY)', ticker: 'NTDOY' },
        {nombre: 'American Eagle Outfitters (AEO)', ticker: 'AEO' },
        {nombre: 'Foot Locker (FL)', ticker: 'FL' },
        {nombre: 'Nordstrom (JWN)', ticker: 'JWN' },
        {nombre: 'Bitcoin (BTC)', ticker: 'BTC' },
        {nombre: 'Ethereum (ETH)', ticker: 'ETH' },
        {nombre: 'Dogecoin (DOGE)', ticker: 'DOGE' },
        {nombre: 'Cardano (ADA)', ticker: 'ADA' },
        {nombre: 'Monero (XMR)', ticker: 'XMR' }
    ];

    // Esta función busca el nombre del activo basado en su ticker
    const obtenerNombreActivo = (ticker) => {
        const activo = opcionesAcciones.find(opcion => opcion.ticker === ticker);
        return activo ? activo.nombre : ticker;
    };

    //Esta función formatea la fecha al formato español
    const formatearFecha = (fecha) => {
        return new Date(fecha).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const crearLista = () => {
        if (!transacciones || transacciones.length === 0) {
            return (
                <div className="transacciones-vacio">
                    <p>No hay transacciones disponibles</p>
                </div>
            );
        }

        return transacciones.map((transaction, index) => {
            const nombreActivo = obtenerNombreActivo(transaction.simbolo_activo);
            const fecha = formatearFecha(transaction.creado_en);
            const esCompra = transaction.tipo_transaccion === 'compra';
            
            return (
                <div key={index} className={`transaccion-card-compacta ${esCompra ? 'transaccion-compra' : 'transaccion-venta'}`}>
                    <div className="transaccion-contenido">
                        <div className={`transaccion-tipo ${esCompra ? 'tipo-compra' : 'tipo-venta'}`}>
                            {esCompra ? 'COMPRA' : 'VENTA'}
                        </div>
                        
                        <div className="transaccion-activo">
                            {nombreActivo} ({transaction.simbolo_activo})
                        </div>
                        
                        <div className={`transaccion-dinero ${esCompra ? 'tipo-compra' : 'tipo-venta'}`}>
                            ${parseFloat(transaction.monto_total).toFixed(2)}
                        </div>
                        
                        <div className="transaccion-acciones">
                            {parseFloat(transaction.numero_acciones).toFixed(4)} acciones
                        </div>
                        
                        <div className="transaccion-fecha">
                            {fecha}
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="transacciones-grid">
            {crearLista()}
        </div>
    );
};

export default ListaTransacciones;
