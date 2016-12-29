'use strict';
import * as d3selection from 'd3-selection'
import {TimeLine} from "../../../src/TimeLine";
import {data,class_styles} from "../data/test.simple.data";

it('default TimeLine', () => {
    document.body.innerHTML =
        '<div id="time-line-container"></div>';

    let chart = new TimeLine("#time-line-container", {
        data: {
            class_styles: class_styles,
            data: data
        }
    });

    expect(chart.context).toBe("#time-line-container");
    expect(chart.config.data.class_styles).toEqual(class_styles);
    expect(chart.config.data.data).toEqual(data);

    let chart_container = document.getElementById("time-line-container");
    let chart_svgs = chart_container.getElementsByTagName("svg");
    expect(chart_svgs.length).toBe(1);
    let chart_svg = d3selection.select(chart_svgs[0]);
    expect(Number.parseInt(chart_svg.attr('width'))).toBe(TimeLine.default.options.size.width);
    expect(Number.parseInt(chart_svg.attr('height'))).toBe(TimeLine.default.options.size.height);
});