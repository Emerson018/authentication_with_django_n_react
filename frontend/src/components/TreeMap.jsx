/* eslint-disable max-classes-per-file */
import React, { PureComponent, useState, useEffect } from 'react';
import { Treemap, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const TreeMapTecnologia = () => {
  const [dadosTecnologia, setDadosTecnologia] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseDados = await axios.get('http://localhost:8000/api/produtos-tecnologia/');

        // Supondo que os dados tenham a estrutura correta ou você pode precisar mapear para o formato correto
        const dadosAgrupadosTecnologia = responseDados.data.map(item => ({
          name: item.marca,
          size: item.total_vendas, // ou outro campo que faça sentido para o tamanho
        }));

        setDadosTecnologia(dadosAgrupadosTecnologia);
      } catch (error) {
        console.error('Erro ao importar os dados da API.', error);
      }
    };
    fetchData();
  }, []);

  const COLORS = ['#8889DD', '#9597E4', '#8DC77B', '#A5D297', '#E2CF45', '#F8C12D'];

  class CustomizedContent extends PureComponent {
    render() {
      const { depth, x, y, width, height, index, name } = this.props;

      return (
        <g>
          <rect
            x={x}
            y={y}
            width={width}
            height={height}
            style={{
              stroke: '#fff',
              strokeWidth: 2 / (depth + 1e-10),
              strokeOpacity: 1 / (depth + 1e-10),
            }}
          />
          {depth === 1 ? (
            <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle" fill="#fff" fontSize={14}>
              {name}
            </text>
          ) : null}
          {depth === 1 ? (
            <text x={x + 4} y={y + 18} fill="#fff" fontSize={16} fillOpacity={0.9}>
              {index + 1}
            </text>
          ) : null}
        </g>
      );
    }
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <Treemap
        width={400}
        height={200}
        data={dadosTecnologia}
        dataKey="size"
        stroke="#fff"
        fill="#8884d8"
        content={<CustomizedContent colors={COLORS} />}
      />
    </ResponsiveContainer>
  );
};

export default TreeMapTecnologia;
