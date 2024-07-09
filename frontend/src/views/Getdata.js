import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowData = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8000/api/consumo-eletrica/')
            .then(response => {
                setData(response.data);
                setIsLoading(false); // Set isLoading to false after data is fetched
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
                setIsLoading(false); // Set isLoading to false even if there is an error
            });
    }, []);

    if (isLoading) {
        return (
            <div>

            
            <div className="loading">
                <div className="spinner"></div>
                <p>Loading data...</p>
            </div>
            </div>
        );
    }

    return (
        <div>
            <h1>Consumo Elétrica</h1>
            <table>
                <thead>
                    <tr>
                        <th>Ano</th>
                        <th>Mês</th>
                        <th>UF</th>
                        <th>Tipo de Consumo</th>
                        <th>Número de Consumidores</th>
                        <th>Consumo</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.ano}</td>
                            <td>{item.mes}</td>
                            <td>{item.sigla_uf}</td>
                            <td>{item.tipo_consumo}</td>
                            <td>{item.numero_consumidores}</td>
                            <td>{item.consumo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShowData;
