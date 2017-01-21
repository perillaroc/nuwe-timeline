import * as d3time from 'd3-time';
import * as d3timeFormat from 'd3-time-format'
import * as d3selection from 'd3-selection'
import * as d3scale from 'd3-scale'
import * as d3axis from 'd3-axis'

export let class_name = "nuwe-timeline";

export class TimeLine {
    /**
     * time line chart.
     * @param context the container to draw the chart. context may be any type supported by d3.select, such as：
     *      "#time-line-container"
     *      document.getElementById("time-line-container")
     *
     * @param config
     *      {
     *          type: 'timeline',
     *          data: {
     *              class_styles: [
     *              ],
     *              data:[
     *                  {class_name:'unknown', color: '#bdbdbd'},
     *              ]
     *          },
     *          options: {
     *              size: {
     *                  width: 1800,
     *                  height: 1000
     *              },
     *              start_point: {
     *                  x: 250,
     *                  y: 30
     *              },
     *              row: {
     *                  interval: 30,
     *                  bar_height: 20
     *              }
     *          }
     *      }
     */
    constructor(context, config) {
        this.context = context;
        this.config = {};
        this.color_scale = null;
        this.color_domain = [];
        this.color_range = [];

        // merge config
        Object.assign(this.config, TimeLine.default);

        if(config.hasOwnProperty('options')) {
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

            if(user_options.hasOwnProperty("row")) {
                Object.keys(user_options.row).forEach(function (key) {
                    options.row[key] = user_options.row[key];
                });
            }
        }

        if(config.hasOwnProperty("data")) {
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

            if(user_data.hasOwnProperty("data")) {
                data.data = user_data.data;
            }
        }

        // generate necessary objects
        this.chart = this.drawTimeLineChart(this.context, this.config);
    }

    drawTimeLineChart(context, config) {
        let options = config.options;
        let data = config.data;
        let color_scale = this.color_scale;

        let svg = d3selection.select(context)
            .append("svg")
            .classed(class_name, true)
            .attr('width', options.size.width)
            .attr('height', options.size.height);

        // x scale: [0,24) hour
        let current_time = new Date();
        let start_hour = d3time.timeDay(current_time);

        let next_date = d3time.timeDay.offset(start_hour, 1);
        let end_hour = d3time.timeHour.offset(next_date, 0);

        let x_scale = d3scale.scaleTime()
            .domain([start_hour, end_hour])
            .range([0, options.size.width - 2*options.start_point.x]);

        // x axis
        let x_axis = d3axis.axisTop(x_scale)
            .ticks(d3time.timeHour.every(1))
            .tickFormat(d3timeFormat.timeFormat("%H"))
            .tickSizeInner( -(data.data.length * options.row.interval - options.row.interval/2) );

        let axis_group = svg.append("g")
            .attr('transform', 'translate('+ options.start_point.x +','+ options.start_point.y + ')')
            .classed('axis', true)
            .call(x_axis);

        // y scale
        let y_scale = d3scale.scaleLinear()
            .domain([0, data.data.length-1])
            .range([options.row.interval/2, (data.data.length-1)*options.row.interval + options.row.interval/2]);

        // y axis
        let y_axis = d3axis.axisLeft(y_scale)
            .ticks(data.data.length-1)
            .tickFormat("")
            .tickSizeInner( -(options.size.width - 2*options.start_point.x) );

        let y_axis_group = svg.append("g")
            .attr('transform', 'translate('+ options.start_point.x +','+ options.start_point.y + ')')
            .classed('axis', true)
            .call(y_axis);

        // time bar: row, one row per row
        let time_bar_group = svg.append("g")
            .attr('transform', 'translate('+ options.start_point.x +','+ options.start_point.y + ')');


        // row
        let row_data = time_bar_group.selectAll('.row')
            .data(data.data);

        let row_data_enter = row_data
            .enter()
            .append('g')
            .attr('transform', function(d, i){
                return 'translate(0, '+ (options.row.interval*i) +')'
            })
            .classed('row', true);

        // row label
        let row_label = row_data_enter
            .append('text')
            .attr('x', function(d,i){
                return -10
            })
            .attr('y', function(d,i){
                return options.row.interval/2;
            })
            .text(function(d,i){
                return d.label;
            })
            .attr('text-anchor', 'end')
            .attr("dominant-baseline", "central");

        // time item
        let time_item_data = row_data_enter
            .selectAll('.time-item-item')
            .data(function(d){ return d.times});

        let time_item_enter = time_item_data
            .enter()
            .append("g")
            .classed('time-item-item', true);

        // time level rect
        time_item_enter
            .append('rect')
            .attr('x', function(d, i){
                let local_start_time = d.start_time;
                let hour = parseInt(local_start_time.substr(0, 2));
                let minute = parseInt(local_start_time.substr(3, 2));
                let current_start_time = d3time.timeMinute.offset(d3time.timeHour.offset(start_hour, hour), minute);

                return x_scale(current_start_time);
            })
            .attr('y', function(d, i){
                return (options.row.interval - options.row.bar_height)/2;
            })
            .attr('width', function(d,i){
                let local_start_time = d.start_time;
                let hour = parseInt(local_start_time.substr(0, 2));
                let minute = parseInt(local_start_time.substr(3, 2));
                let current_start_time = d3time.timeMinute.offset(d3time.timeHour.offset(start_hour, hour), minute);

                let local_end_time = d.end_time;
                let end_hour = local_end_time.substr(0, 2);
                let end_minute = local_end_time.substr(3, 2);
                let current_end_time;
                if(end_hour < hour)
                {
                    current_end_time = d3time.timeMinute.offset(d3time.timeHour.offset(next_date, end_hour), end_minute);
                }
                else{
                    current_end_time = d3time.timeMinute.offset(d3time.timeHour.offset(start_hour, end_hour), end_minute);
                }

                let bar_width = x_scale(current_end_time) - x_scale(current_start_time);

                return bar_width>=5?bar_width:5;
            })
            .attr('height', options.row.bar_height)
            .style('fill', function(d,i){
                if (! 'class' in d) {
                    d.class = 'unknown';
                }
                return color_scale(d.class)
            });

        // time item label
        time_item_enter
            .filter(function(d,i){
                return d.hasOwnProperty('label') && d.label != '';
            })
            .append('text')
            .attr('x', function(d, i){
                let local_end_time = d.end_time;
                let end_hour = local_end_time.substr(0, 2);
                let end_minute = local_end_time.substr(3, 2);
                let current_end_time = d3time.timeMinute.offset(d3time.timeHour.offset(start_hour, end_hour), end_minute);
                return x_scale(current_end_time) + 2;
            })
            .attr('y', function(d, i){
                return options.row.interval/2;
            })
            .text(function(d, i){
                return d.label;
            })
            .attr("dominant-baseline", "central")
            .attr("text-anchor", "start");
        return svg;
    }
}

TimeLine.default = {
    type: 'timeline',
    data: {
        class_styles: [
            {class_name:'unknown', color: '#bdbdbd'}
        ]
    },
    options: {
        size: {
            width: 1800,
            height: 1000
        },
        start_point: {
            x: 250,
            y: 30
        },
        row: {
            interval: 30,
            bar_height: 20
        }
    }
};