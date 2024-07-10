'use client';
import { useEffect, useState } from 'react';
import '../../src/App.css';
import { BarChart, Bar, AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const GraficoEstadosSul = () => {
    const [dadosConsumo, setDadosConsumo] = useState([]);
    const [dadosMaxConsumo, setDadosMaxConsumo] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseConsumo = await axios.get('http://localhost:8000/api/estados-sul/');
                const responseMaxConsumo = await axios.get('http://localhost:8000/api/max-consumo-estados-sul/');

                const dadosAgrupadosConsumo = agruparDados(responseConsumo.data);
                const dadosMaxConsumoFormatados = formatarMaxConsumo(responseMaxConsumo.data);

                // Combinar dados de consumo e dados de maior consumo
                const dadosCompletos = combinarDados(dadosAgrupadosConsumo, dadosMaxConsumoFormatados);

                setDadosConsumo(dadosCompletos);
            } catch (error) {
                console.error('Erro ao importar os dados.', error);
            }
        };
        fetchData();
    }, []);

    const agruparDados = (data) => {
        return data.reduce((acc, item) => {
            const estadoExistente = acc.find(estado => estado.sigla_uf === item.sigla_uf);
            if (estadoExistente) {
                estadoExistente.quantidade += item.quantidade;
            } else {
                acc.push({ sigla_uf: item.sigla_uf, quantidade: item.quantidade });
            }
            return acc;
        }, []);
    };

    const formatarMaxConsumo = (data) => {
        return data.reduce((acc, item) => {
            acc[item.sigla_uf] = item.max_consumo;
            return acc;
        }, {});
    };

    const combinarDados = (dadosConsumo, dadosMaxConsumo) => {
        return dadosConsumo.map(item => ({
            ...item,
            max_consumo: dadosMaxConsumo[item.sigla_uf] || 0
        }));
    };

    return (
        <div>
            <h2>Gráfico dos Estados do Sul</h2>
            <AreaChartComponent dados={dadosConsumo} />
        </div>
    );
};

const AreaChartComponent = ({ dados }) => {
    // Verifique se os dados foram carregados
    if (dados.length === 0) {
        return <div>Carregando...</div>;
    }

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={dados}>
                <YAxis />
                <XAxis dataKey="sigla_uf" />
                <CartesianGrid strokeDasharray="5 5" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar 
                    type="monotone" 
                    dataKey="quantidade" 
                    stroke='#2563eb'
                    fill='#3b82f6' />
                <Bar 
                    type="monotone" 
                    dataKey="max_consumo" 
                    stroke='#ff6b6b'
                    fill='#f87171' />
            </BarChart>
        </ResponsiveContainer>
    );
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-3 bg-secondary rounded">
                <p className="text-medium text-lg">{label}</p>
                <p className="text-sm text-blue-400">
                    Consumo:
                    <span className="ml-2">${payload[0].value}</span>
                </p>
                <p className="text-sm text-red-400">
                    Maior Consumo:
                    <span className="ml-2">${payload[1].value}</span>
                </p>
            </div>
        );
    }
    return null;
};

export default GraficoEstadosSul;
