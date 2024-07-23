import React, { useEffect, useState } from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import axios from 'axios';

const style = {
    top: '50%',
    right: 0,
    transform: 'translate(0, -50%)',
    lineHeight: '24px',
};

const colors = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];

const GraficoLeroyRadialMargem = () => {
    const [dadosTop5Margem, setDadosTop5Margem] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseTop5Margem = await axios.get('http://localhost:8000/api/top-5-margem/');
                setDadosTop5Margem(responseTop5Margem.data);
                console.log('Dados MARGEM:', responseTop5Margem.data);
            } catch (error) {
                console.error('Erro ao importar dados de margem.', error);
            }
        };
        fetchData();
    }, []);

    const formattedData = dadosTop5Margem.map((item, index) => ({
        ...item,
        fill: colors[index % colors.length]
    }));

    return (
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
                <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="10%"
                    outerRadius="80%"
                    barSize={18}
                    data={formattedData}
                    startAngle={90}
                    endAngle={-270}
                   
                >
                    <RadialBar
                        minAngle={15}
                        label={{ position: 'insideStart', fill: '#fff' }}
                    
                        
                        dataKey="margem"
                    
                    />
                    <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
                    <Tooltip />
                </RadialBarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GraficoLeroyRadialMargem;
