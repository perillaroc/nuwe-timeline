'use strict';
import * as d3 from 'd3'
import {TimeLine} from "../../../src/TimeLine";
import {data,class_styles} from "../data/test.simple.data";

const chart_id = "time-line-container";
const chart_anchor = "#" + chart_id;
const html = '<div id="'+chart_id+'"></div>';

describe('start_point', ()=> {
    beforeEach(() => {
        document.body.innerHTML = html;
    });

    it('default start_point', () => {
        let chart = new TimeLine(chart_anchor, {
            data: {
                class_styles: class_styles,
                data: data
            }
        });

        let chart_svg = chart.chart;
        //TODO: 使用 d3-selection 获取子节点（直接子节点）
        let svg_g_list = chart_svg.selectAll('g').filter(function() {
            return this.parentNode == chart_svg.node();
        });
        expect(svg_g_list.size()).toBe(3);

        svg_g_list.each(function(p,j){
            // NOTE: 无法使用 SVG 的 DOM，改用 transform 属性值
            let transform_string = d3.select(this).attr('transform');
            expect(transform_string).toBe(
                'translate('+ TimeLine.default.options.start_point.x +','
                + TimeLine.default.options.start_point.y + ')'
            );
        });

    });

    it('change start_point', () => {
        let chart_config = {
            data: {
                class_styles: class_styles,
                data: data
            },
            options: {
                start_point: {
                    x: 100,
                    y: 50
                }
            }
        };
        let chart = new TimeLine(chart_anchor, chart_config);

        let chart_svg = chart.chart;
        let svg_g_list = chart_svg.selectAll('g').filter(function() {
            return this.parentNode == chart_svg.node();
        });
        expect(svg_g_list.size()).toBe(3);

        svg_g_list.each(function(p,j){
            let transform_string = d3.select(this).attr('transform');
            expect(transform_string).toBe(
                'translate('+ chart_config.options.start_point.x +','
                + chart_config.options.start_point.y + ')'
            );
        });

    });

    it('change x of start_point', () => {
        let chart_config = {
            data: {
                class_styles: class_styles,
                data: data
            },
            options: {
                start_point: {
                    x: 100
                }
            }
        };
        let chart = new TimeLine(chart_anchor, chart_config);

        let chart_svg = chart.chart;
        let svg_g_list = chart_svg.selectAll('g').filter(function() {
            return this.parentNode == chart_svg.node();
        });
        expect(svg_g_list.size()).toBe(3);

        svg_g_list.each(function(p,j){
            let transform_string = d3.select(this).attr('transform');
            expect(transform_string).toBe(
                'translate('+ chart_config.options.start_point.x +','
                + TimeLine.default.options.start_point.y + ')'
            );
        });

    });

    it('change x of start_point', () => {
        let chart_config = {
            data: {
                class_styles: class_styles,
                data: data
            },
            options: {
                start_point: {
                    y: 100
                }
            }
        };
        let chart = new TimeLine(chart_anchor, chart_config);

        let chart_svg = chart.chart;
        let svg_g_list = chart_svg.selectAll('g').filter(function() {
            return this.parentNode == chart_svg.node();
        });
        expect(svg_g_list.size()).toBe(3);

        svg_g_list.each(function(p,j){
            let transform_string = d3.select(this).attr('transform');
            expect(transform_string).toBe(
                'translate('+ TimeLine.default.options.start_point.x +','
                + chart_config.options.start_point.y + ')'
            );
        });

    });
});

