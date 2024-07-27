import React from "react";
import AreaChart from "../components/AreaChart";
import BarChart from "../components/BarChart";
import TreeMap from "../components/TreeMap";

import LeroyJanJul from "../components/LeroyJanJul";
import LeroyRadialMargem from "../components/LeroyRadialMargem";
import LeroyGama from "../components/LeroyGama";

const Charts = () => {


    return (
        <div className= 'Area-chart' style={{ paddingTop: '56px'}}>       
            <div>
                <LeroyGama/>
                <LeroyRadialMargem/>
                <LeroyJanJul/>
                <AreaChart/>
                <BarChart/>
                <TreeMap/>
                
            </div>
        </div>
    )
};

export default Charts;