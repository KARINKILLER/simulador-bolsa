import React from 'react';

const TransactionList = ({ transacciones }) => {
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

    // Renderizar las transacciones
    const renderTransactions = () => {
        // Verificar si transacciones existe y tiene elementos
        if (!transacciones || transacciones.length === 0) {
            return <p>No hay transacciones disponibles</p>;
        }

        const elementos = [];

        for (let i = 0; i < transacciones.length; i++) {
            const transaction = transacciones[i];
            let nombreActivo = transaction.simbolo_activo;

            // Buscar el nombre completo del activo
            for (let j = 0; j < opcionesAcciones.length; j++) {
                if (opcionesAcciones[j].ticker === transaction.simbolo_activo) {
                    nombreActivo = opcionesAcciones[j].nombre;
                    break;
                }
            }

            // Formatear la fecha (usando creado_en en lugar de fecha)
            const fecha = new Date(transaction.creado_en).toLocaleDateString('es-ES');

            // Determinar el tipo de transacción
            let tipoTransaccion = '';
            if (transaction.tipo_transaccion === 'compra') {
                tipoTransaccion = 'Compraste';
            } else if (transaction.tipo_transaccion === 'venta') {
                tipoTransaccion = 'Vendiste';
            }

            // Crear el elemento para mostrar
            elementos.push(
                <p key={i}>
                    {fecha} - {tipoTransaccion} {transaction.numero_acciones.toString()} acciones de {nombreActivo} por valor de {parseFloat(transaction.dinero_movido).toFixed(2)} $
                </p>
            );
        }

        return elementos;
    };

    return <div>{renderTransactions()}</div>;
};

export default TransactionList;
