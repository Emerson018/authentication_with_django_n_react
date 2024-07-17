import React from "react";
import AreaChart from "../components/AreaChart";
import BarChart from "../components/BarChart";
import TreeMap from "../components/TreeMap";

const Charts = () => {


    return (
        <div className= 'Area-chart' style={{ paddingTop: '56px'}}>       
            <div>
                <AreaChart/>
                <BarChart/>
                <TreeMap/>
            </div>
        </div>
    )
};

export default Charts;