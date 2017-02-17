import * as d3selection from 'd3-selection'
import * as d3scale from 'd3-scale'

import {TimeLine, class_name} from './TimeLine'
import {mergeConfig} from './config'


export class TimeLineLegend {
    /**
     * legend for time line chart
     * @param context
     * @param config
     *      data: {
     *          label: {
     *              text: ''
     *          }
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

        this.color_domain = [];
        this.color_range = [];

        this.config = mergeConfig(TimeLineLegend.default, config);

        let color_domain = this.color_domain;
        let color_range = this.color_range;
        this.config.data.class_styles.forEach(function(a_class){
            color_domain.push(a_class.class_name);
            color_range.push(a_class.color);
        });
        this.color_scale = d3scale.scaleOrdinal()
            .domain(color_domain)
            .range(color_range);

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
    }
}

TimeLineLegend.default = {
    data: {
        label: {
            text: ''
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
