import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const style = {
  top: '50%',
  right: 619,
  transform: 'translate(0, -50%)',
  lineHeight: '30px',
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { gama, count } = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p className="label">{`Gama: ${gama}`}</p>
        <p className="label">{`Quantidade: ${count}`}</p>
      </div>
    );
  }

  return null;
};

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, value, name }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
      {`${name}: ${value}`}
    </text>
  );
};

const GraficoGama = () => {
  const [dadosTopGama, setDadosTopGama] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseTopGama = await axios.get('http://localhost:8000/api/top-gama/');
        console.log('Top Gama: ', responseTopGama.data);
        setDadosTopGama(responseTopGama.data);
      } catch (error) {
        console.error('GAMA NÃO ENCONTRADA.', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Mais vendidos por GAMA </h2>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={dadosTopGama}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={140}
              fill="#8884d8"
              dataKey="count"
              nameKey="gama"
              label={renderCustomizedLabel}
            >
              {dadosTopGama.map((entry, index) => (
                <Cell key={`cell-${entry.gama}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style}/>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
    </div>
  );
};

export default GraficoGama;
