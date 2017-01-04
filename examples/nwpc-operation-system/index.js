import {TimeLine, TimeLineLegend} from '../../src/index'

let data = require("./data.json");

let class_styles = [
    {class_name:'unknown', color: '#bdbdbd'},
    {class_name:'serial',  color: '#4575b4'},
    {class_name:'serial_op',  color: '#74add1'},
    {class_name:'serial_op1', color: '#deebf7'},
    {class_name:'operation', color: '#cc4c02'},
    {class_name:'operation1',  color: '#f46d43'},
    {class_name:'operation2',  color: '#feb24c'},
    {class_name:'normal',  color: '#cb181d'},
    {class_name:'largemem', color: '#67000d'}
];

let my_timeline = new TimeLine(document.getElementById("time-line-container"),{
    type: 'timeline',
    data: {
        class_styles: class_styles,
        data: data
    },
    options: {
        size: {
            'width': 1400
        }
    }
});

let my_timeline_legend = new TimeLineLegend("#time-line-container-legend", {
    data: {
        class_styles: class_styles
    }
});