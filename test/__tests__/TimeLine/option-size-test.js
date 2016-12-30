'use strict';
import * as d3selection from 'd3-selection'
import {TimeLine} from "../../../src/TimeLine";
import {data,class_styles} from "../data/test.simple.data";

const chart_id = "time-line-container";
const chart_anchor = "#" + chart_id;
const html = '<div id="'+chart_id+'"></div>';

describe('options-size', ()=> {
    beforeEach(() => {
        document.body.innerHTML = html;
    });

    it('default size', () => {
        let chart = new TimeLine(chart_anchor, {
            data: {
                class_styles: class_styles,
                data: data
            }
        });

        expect(chart.context).toBe(chart_anchor);
        expect(chart.config.data.class_styles).toEqual(class_styles);
        expect(chart.config.data.data).toEqual(data);

        let chart_container = document.getElementById(chart_id);
        let chart_svg_list = chart_container.getElementsByTagName("svg");
        expect(chart_svg_list.length).toBe(1);
        let chart_svg = d3selection.select(chart_svg_list[0]);
        expect(Number.parseInt(chart_svg.attr('width'))).toBe(TimeLine.default.options.size.width);
        expect(Number.parseInt(chart_svg.attr('height'))).toBe(TimeLine.default.options.size.height);
    });

    it('change width and height both', () => {
        let chart_config = {
            data: {
                class_styles: class_styles,
                data: data
            },
            options: {
                size: {
                    width: 800,
                    height: 600
                }
            }
        };
        let chart = new TimeLine(chart_anchor, chart_config);

        let chart_container = document.getElementById(chart_id);
        let chart_svg_list = chart_container.getElementsByTagName("svg");
        expect(chart_svg_list.length).toBe(1);
        let chart_svg = d3selection.select(chart_svg_list[0]);
        expect(chart_svg).toBe(chart.chart);
        expect(Number.parseInt(chart_svg.attr('width'))).toBe(chart_config.options.size.width);
        expect(Number.parseInt(chart_svg.attr('height'))).toBe(chart_config.options.size.height);
    });

    it('change width', () => {
        let chart_config = {
            data: {
                class_styles: class_styles,
                data: data
            },
            options: {
                size: {
                    width: 800
                }
            }
        };
        let chart = new TimeLine(chart_anchor, chart_config);
        let chart_svg = chart.chart;
        expect(Number.parseInt(chart_svg.attr('width'))).toBe(chart_config.options.size.width);
        expect(Number.parseInt(chart_svg.attr('height'))).toBe(TimeLine.default.options.size.height);
    });

    it('change height', () => {
        let chart_config = {
            data: {
                class_styles: class_styles,
                data: data
            },
            options: {
                size: {
                    height: 800
                }
            }
        };
        let chart = new TimeLine(chart_anchor, chart_config);
        let chart_svg = chart.chart;
        expect(Number.parseInt(chart_svg.attr('width'))).toBe(TimeLine.default.options.size.width);
        expect(Number.parseInt(chart_svg.attr('height'))).toBe(chart_config.options.size.height);
    });
});

