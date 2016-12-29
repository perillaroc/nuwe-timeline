import * as d3selection from 'd3-selection'
import * as d3scale from 'd3-scale'

import {TimeLine, class_name} from './TimeLine'


export class TimeLineLegend {
    /**
     * 时间线图示
     * @param context
     * @param config
     *      data: {
     *          label: {
     *              text: '队列名称'
     *          },
     *          info:{
     *              text: '图中数字为并行队列使用的CPU核心数'
     *          },
     *          class_styles: [
     *              {class_name:'unknown', color: '#bdbdbd'},
     *          ]
     *      },
     *      options: {
     *          size: {
     *              height: 50,
     *              width: 1800
     *          },
     *          start_point: {
     *              x: 250
     *          }
     *      }
     */
    constructor(context, config){
        this.context = context;
        this.config = {};

        this.color_scale = null;
        this.color_domain = [];
        this.color_range = [];

        // merge config
        Object.assign(this.config, TimeLineLegend.default);


        if(config.hasOwnProperty('options')){
            let options = this.config.options;
            let user_options = config.options;

            if(user_options.hasOwnProperty("size")) {
                Object.keys(user_options.size).forEach(function (key) {
                    options.size[key] = user_options.size[key];
                });
            }

            if(user_options.hasOwnProperty("start_point")) {
                Object.keys(user_options.start_point).forEach(function (key) {
                    options.start_point[key] = user_options.start_point[key];
                });
            }
        }

        if(config.hasOwnProperty('data')){
            let data = this.config.data;
            let user_data = config.data;

            if(user_data.hasOwnProperty("class_styles")) {
                data.class_styles = user_data.class_styles;

                let color_domain = this.color_domain;
                let color_range = this.color_range;
                data.class_styles.forEach(function(a_class){
                    color_domain.push(a_class.class_name);
                    color_range.push(a_class.color);
                });
                this.color_scale = d3scale.scaleOrdinal()
                    .domain(color_domain)
                    .range(color_range);
            }

            if(user_data.hasOwnProperty("label")) {
                Object.keys(user_data.label).forEach(function (key) {
                    data.label[key] = user_data.label[key];
                });
            }

            if(user_data.hasOwnProperty("info")) {
                Object.keys(user_data.info).forEach(function (key) {
                    data.info[key] = user_data.info[key];
                });
            }
        }

        this.drawLegend();
    }

    drawLegend() {
        let context = this.context;
        let data = this.config.data;
        let options = this.config.options;

        let color_domain = this.color_domain;
        let color_scale = this.color_scale;

        let legend_svg = d3selection.select(context)
            .append("svg")
            .classed(class_name, true)
            .attr('width', options.size.width)
            .attr('height', options.size.height);

        let legend_bar = legend_svg.append('g')
            .attr('transform', 'translate('+ options.start_point.x +',0)');

        let legend_enter = legend_bar.selectAll('.legend-item')
            .data(color_domain)
            .enter()
            .append('g')
            .classed('legend-item', true);

        legend_enter.append('rect')
            .attr('x', function(d,i){
                return 120*i;
            })
            .attr('y', function(d,i){
                return 5;
            })
            .attr('width', 20)
            .attr('height', 20)
            .style('fill', function(d,i){
                return color_scale(d)
            });

        legend_enter.append('text')
            .attr('x', function(d,i){
                return 120*i+25;
            })
            .attr('y', function(d,i){
                return 15;
            })
            .attr("dominant-baseline", "central")
            .text(function(d,i){
                return d
            });

        let legend_bar_label = legend_bar.append('text')
            .attr('x', -15)
            .attr('y', 15)
            .attr("dominant-baseline", "central")
            .attr("text-anchor", "end")
            .text(data.label.text);


        legend_bar.append('text')
            .attr('x', 0)
            .attr('y', 40)
            .attr("dominant-baseline", "central")
            .attr("text-anchor", "start")
            .text(data.info.text);
    }
}

TimeLineLegend.default = {
    data: {
        label: {
            text: '队列名称'
        },
        info:{
            text: '图中数字为并行队列使用的CPU核心数'
        },
        class_styles: [
            {class_name:'unknown', color: '#bdbdbd'}
        ]
    },
    options: {
        size: {
            height: 50,
            width: TimeLine.default.options.size.width
        },
        start_point: {
            x: TimeLine.default.options.start_point.x
        }
    }
};
