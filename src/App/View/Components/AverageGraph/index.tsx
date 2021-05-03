import React from 'react';
import Chart from 'chart.js';

interface Props {
    emotions: {
        anger: number,
        contempt: number,
        disgusted: number,
        fear: number,
        joy: number,
        sadness: number,
    }
}

export default class AverageGraph extends React.Component<Props>{

    componentDidUpdate = async () => {

        if (this.props.emotions) {

            const ctx: any = document.getElementsByClassName('average_graph');

            const { anger, contempt, disgusted, fear, joy, sadness } = this.props.emotions;
                        
            let myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Raiva', 'Desprezo', 'Nojo', 'Medo', 'Felicidade', 'Tristeza'],
                    datasets: [{
                        label: 'Porcentagem (%)',
                        data: [anger, contempt, disgusted, fear, joy, sadness],
                        backgroundColor: [
                            'red',
                            'gray',
                            'green',
                            'black',
                            'yellow',
                            'blue'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    title: {
                        display: true,
                        fontSize: 20,
                        text: 'Porcentagem de tempo por emoção'
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }
    }

    render() {
        return (
            <canvas className="average_graph" />
        );
    }
};