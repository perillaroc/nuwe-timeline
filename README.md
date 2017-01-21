# nuwe-timeline

A time line chart library, which is developed for running time of operation systems in NWPC.

## Installing

### npm

```
npm install nuwe-timeline
```
### Source code

Download the latest version from [Github releases](https://github.com/perillaroc/nuwe-timeline/releases).

## Getting started

Import nuwe-timeline using ES 6 module：

```javascript
import {TimeLine, TimeLineLegend} from 'nuwe-timeline'
let chart = TimeLine(some_id, {...});
let chart_legend = TimeLineLegend(some_id, {...});
```

The following example is a simple web page with a nuwe-timeline chart and a nuwe-timeline chart legend.

The web page is shown below.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Test 1</title>
</head>
<body>

<div id="time-line-container-legend"></div>
<div id="time-line-container"></div>

<script src="./dist/bundle.js"></script>
</body>
</html>
```

To draw a timeline, a config object is needed. 
The simplest config object contains time data and class styles.

```javascript
let chart_config = {
    type: 'timeline',
    data: {
        class_styles: [
            {class_name:'unknown', color: '#bdbdbd'},
            {class_name:'serial',  color: '#4575b4'},
            {class_name:'serial_op',  color: '#74add1'},
            {class_name:'serial_op1', color: '#deebf7'},
            {class_name:'operation', color: '#cc4c02'},
            {class_name:'operation1',  color: '#f46d43'},
            {class_name:'operation2',  color: '#feb24c'},
            {class_name:'normal',  color: '#cb181d'},
            {class_name:'largemem', color: '#67000d'}
        ],
        data: [           
            {
                
                "label": "gda_gsi_v1r5",
                "times": [
                    {
                        "class": "serial_op",
                        "start_time": "09:00:59",
                        "end_time": "10:01:02",
                        "name": "00",
                        "label": "640"
                    },
                    {
                        "class": "operation",
                        "start_time": "09:41:21",
                        "end_time": "09:46:10",
                        "name": "00"
                    },
                    {
                        "class": "serial_op",
                        "start_time": "13:11:00",
                        "end_time": "14:12:10",
                        "name": "06",
                        "label": "640"
                    },
                    {
                        "class": "operation",
                        "start_time": "13:51:50",
                        "end_time": "13:57:15",
                        "name": "06"
                    }
                ]
            },
            {
                "label" : "gmf_gsi_v1r5",
                "times" : [
                    {
                        "name" : "00",
                        "start_time" : "02:59:10",
                        "label" : "640",
                        "end_time" : "05:18:42",
                        "class" : "serial_op"
                    },
                    {
                        "class" : "operation",
                        "start_time" : "03:42:51",
                        "end_time" : "04:46:22",
                        "name" : "00"
                    },
                    {
                        "name" : "06",
                        "start_time" : "10:45:51",
                        "label" : "640",
                        "end_time" : "12:42:35",
                        "class" : "serial_op"
                    },
                    {
                        "class" : "operation",
                        "start_time" : "11:25:01",
                        "end_time" : "12:00:19",
                        "name" : "06"
                   }
                ]
            }
        ]
    }
}
```

For more details about time line data, please see [Time Line Data Structure](./docs/time_line_data.md).

It is very simple to draw a timeline chart.

```javascript
let my_timeline = new TimeLine(document.getElementById("time-line-container"), chart_config);
```

A config object is also needed to draw a timeline legend.

```javascript
let legend_config = {
    data: {
        class_styles: [
            {class_name:'unknown', color: '#bdbdbd'},
            {class_name:'serial',  color: '#4575b4'},
            {class_name:'serial_op',  color: '#74add1'},
            {class_name:'serial_op1', color: '#deebf7'},
            {class_name:'operation', color: '#cc4c02'},
            {class_name:'operation1',  color: '#f46d43'},
            {class_name:'operation2',  color: '#feb24c'},
            {class_name:'normal',  color: '#cb181d'},
            {class_name:'largemem', color: '#67000d'}
        ]
    }
};

let my_timeline_legend = new TimeLineLegend("#time-line-container-legend", legend_config);
```

## Example

Please see examples directory.

## Build

Use webpack to build. Please install webpack globally using npm and run the following commands in project's root directory.

```bash
npm install
npm run build
```

## Test

Use Jest framework to test. Please install jest-cli globally using npm and run the following command in project's root directory.

```bash
jest
```

## License

Copyright (C) 2016-2017 Perilla Roc.

nuwe-timeline is licensed under [The MIT License](https://opensource.org/licenses/MIT).
