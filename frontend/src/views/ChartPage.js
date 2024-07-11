import React from "react";
import AreaChart from "../components/AreaChart";
import BarChart from "../components/BarChart";

const Charts = () => {


    return (
        <div className= 'Area-chart' style={{ paddingTop: '56px'}}>       
            <div>
                <AreaChart/>
                <BarChart/>
            </div>
        </div>
    )
};

export default Charts;