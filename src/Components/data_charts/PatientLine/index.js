import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import '../style.css';

// const data = {
//     labels: ["January", "February", "March", "April", "May", "June", "July"],
//     datasets: [
//         {
//             label: "My First dataset",
//             fill: false,
//             lineTension: 0.1,
//             backgroundColor: "rgba(75,192,192,0.4)",
//             borderColor: "rgba(75,192,192,1)",
//             borderCapStyle: 'butt',
//             borderDash: [],
//             borderDashOffset: 0.0,
//             borderJoinStyle: 'miter',
//             pointBorderColor: "rgba(75,192,192,1)",
//             pointBackgroundColor: "#fff",
//             pointBorderWidth: 1,
//             pointHoverRadius: 5,
//             pointHoverBackgroundColor: "rgba(75,192,192,1)",
//             pointHoverBorderColor: "rgba(220,220,220,1)",
//             pointHoverBorderWidth: 2,
//             pointRadius: 1,
//             pointHitRadius: 10,
//             data: [65, 59, 80, 81, 56, 55, 40],
//             spanGaps: false,
//         }
//     ]
// }


// const options={}

const data_config = {
    // labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            spanGaps: false,
        },
    ]
}


const options={
    maintainAspectRatio: false, 
    scales: {
        xAxes: [{
            type: 'time',
            position: 'bottom'
        }]
    }
}

const color_border = [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
]

const color = [
            'rgba(255,99,132,0.4)',
            'rgba(54, 162, 235, 0.4)',
            'rgba(255, 206, 86, 0.4)',
            'rgba(75, 192, 192, 0.4)',
            'rgba(153, 102, 255, 0.4)',
            'rgba(255, 159, 64, 0.4)'
]



class BloodStatLineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
        };
    };

    generateData(){
        if (this.props.data[0]){
            return this.props.data.map((data, index)=>{
                return Object.assign({}, data_config.datasets[0], {
                    data:data.data,
                    label:data.label,
                    backgroundColor:color[index%6],
                    pointBorderColor:color_border[index%6],
                    pointHoverBackgroundColor:color[index%6],
                    pointHoverBorderColor:color[index%6],
                    borderColor:color_border[index%6]

                })
            })   
        }
        else{
            return []
        }
    }

    /**
     * <DateRangePicker
            startDate={this.state.startDate} // momentPropTypes.momentObj or null,
            endDate={this.state.endDate} // momentPropTypes.momentObj or null,
            onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
            focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
        />
     */
    render() {
        return (
            <div className="RectangleBackground">
                <p className="Title">
                    <div>{this.props.title}</div>
                    <div style={
                        {
                            "display":"flex",
                            "flexDirection": "row",
                            "paddingLeft": "2%",
                            "alignItems": "center",
                        }}>
                    </div>
                </p>

                <div className="Chart">
                    <Line data={{
                        datasets: this.generateData()
                    }} options={options}/>
                </div>
            </div>
        );
    }
}

export default BloodStatLineChart;