import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import '../../src/App.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {

    const valorFormatado = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(payload[0].value);
    return (
      <div className="custom-tooltip">
       
        <p className="label">{`${payload[0].payload.titulo}`}</p>
        <p className="label">{`Vendas: ${valorFormatado}`}</p>
        <p className="desc">{`${label}`}</p>
        
      </div>
    );
  }

  return null;
};

const GraficoLeroyJanJul = () => {
    const [dadosTop10Vendidos, setDadosTop10Vendidos] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseTop10Vendidos = await axios.get('http://localhost:8000/api/top-10-vendidos/');
                console.log('Dados MAIOR VENDA:', responseTop10Vendidos.data); // Verifica os dados recebidos
                setDadosTop10Vendidos(responseTop10Vendidos.data);
            } catch (error) {
                console.error('Erro ao importar os dados.', error);
            }
        };
        fetchData();
    }, []);

    const formatNumber = (value) => {
        return new Intl.NumberFormat('pt-BR').format(value);
      };

    return (
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
                <BarChart width={150} height={40} data={dadosTop10Vendidos}>
                    <XAxis dataKey="codigo" />
                    <YAxis tickFormatter={formatNumber} />
                    <CartesianGrid strokeDasharray="5 5" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="vendas" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GraficoLeroyJanJul;
