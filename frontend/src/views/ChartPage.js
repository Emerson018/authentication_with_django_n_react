import React from "react";
import AreaChart from "../components/AreaChart";
import BarChart from "../components/BarChart";
import TreeMap from "../components/TreeMap";
import LeroyJanJul from "../components/LeroyJanJul";

const Charts = () => {


    return (
        <div className= 'Area-chart' style={{ paddingTop: '56px'}}>       
            <div>
                <LeroyJanJul/>
                <AreaChart/>
                <BarChart/>
                <TreeMap/>
                
            </div>
        </div>
    )
};

export default Charts;