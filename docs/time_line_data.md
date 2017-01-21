# Time Line Data Structure

The following data is an example of time line data.
 
```json
[           
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

Time line data is an array of times. There are two items in the example data above. 
Each item in array is represented by a row in time line chart. 

Each row may contain some time sections which are shown as line bars in time line chart. 
In the data above, there are four time sections in each row.
 
In the following sections, more details about row and time section are shown.

## Row

The structure of a row is as follows:

```
{
    'label': string, row's label shown on chart
    'times': array of time section, see the next section
}
```

Time sections in `times` are drawn one by one, so that previous one may be override by following one. 

## Time Section

The structure of a row is as follows:

```
{
  'name': string, time section's name,
  'label': string, time section's label shown on chart, optional 
  'class': string, time section's class, used to show different colors,
  'start_time': string(HH:MM:SS), start time of time section,
  'end_time': string(HH:MM:SS), end time of time section
}
```

`label`, which is optional, is shown alone width the line bar of time section.