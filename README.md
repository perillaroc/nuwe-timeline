# nuwe-timeline

时间线，最初为NWPC业务系统运行时间图开发。

## 安装

可以从 [Github releases](https://github.com/perillaroc/nuwe-timeline/releases) 中下载最新版，
或者通过 npm 安装：

```
npm install nuwe-timeline
```

## 开始使用

使用ES 6模块导入方法：

```javascript
import {TimeLine, TimeLineLegend} from 'nuwe-timeline'
let chart = TimeLine(some_id, {...});
let chart_legend = TimeLineLegend(some_id, {...});
```

页面：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Test 1</title>
</head>
<link rel="stylesheet" href="./dist/timeline.css" />
<body>

<div id="time-line-container-legend"></div>
<div id="time-line-container"></div>

<script src="./dist/test1.bundle.js"></script>
</body>
</html>
```

数据：

```javascript
let data = [
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
```

配置：

```javascript
let config = {
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
        data: data
    }
}
```

绘图：

```javascript
let my_timeline = new TimeLine(document.getElementById("time-line-container"), config);
let my_timeline_legend = new TimeLineLegend("#time-line-container-legend", config);
```
