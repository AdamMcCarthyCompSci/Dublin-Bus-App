# Initial check of dublin bus data to see that it can be grabbed in the correct format to allow it to upload to the database


import pandas as pd

data_nested = [{
    "header": {
        "gtfs_realtime_version": "1.0",
        "timestamp": 1623958659
    },
    "entity": [{
        "id": "1984890.y100u.10-700-e20-1.2031.O",
        "trip_update": {
            "trip": {
                "trip_id": "1984890.y100u.10-700-e20-1.2031.O",
                "start_time": "16:40:00",
                "start_date": "20210617",
                "schedule_relationship": "SCHEDULED",
                "route_id": "10-700-e20-1"
            },
            "stop_time_update": [{
                "stop_sequence": 1,
                "departure": {
                    "time": 1623949080
                },
                "stop_id": "8220B1353101",
                "schedule_relationship": "SKIPPED"
            }, {
                "stop_sequence": 2,
                "arrival": {
                    "time": 1623949200
                },
                "departure": {
                    "time": 1623949200
                },
                "stop_id": "8220B1353201",
                "schedule_relationship": "SKIPPED"
            }, {
                "stop_sequence": 3,
                "arrival": {
                    "time": 1623949200
                },
                "departure": {
                    "time": 1623949200
                },
                "stop_id": "8220B136151",
                "schedule_relationship": "SKIPPED"
            }, {
                "stop_sequence": 4,
                "arrival": {
                    "time": 1623949260
                },
                "departure": {
                    "time": 1623949260
                },
                "stop_id": "8220B135301",
                "schedule_relationship": "SKIPPED"
            }, {
                "stop_sequence": 5,
                "arrival": {
                    "time": 1623949920
                },
                "departure": {
                    "time": 1623949920
                },
                "stop_id": "8220B1353301",
                "schedule_relationship": "SKIPPED"
            }, {
                "stop_sequence": 6,
                "arrival": {
                    "time": 1623950400
                },
                "departure": {
                    "time": 1623950400
                },
                "stop_id": "8220B1352701",
                "schedule_relationship": "SKIPPED"
            }, {
                "stop_sequence": 7,
                "arrival": {
                    "time": 1623950400
                },
                "departure": {
                    "time": 1623950400
                },
                "stop_id": "8220B101971",
                "schedule_relationship": "SKIPPED"
            }, {
                "stop_sequence": 8,
                "arrival": {
                    "time": 1623950520
                },
                "departure": {
                    "time": 1623950520
                },
                "stop_id": "8220B106421",
                "schedule_relationship": "SKIPPED"
            }, {
                "stop_sequence": 9,
                "arrival": {
                    "time": 1623951180
                },
                "departure": {
                    "time": 1623951180
                },
                "stop_id": "8240B111951",
                "schedule_relationship": "SKIPPED"
            }, {
                "stop_sequence": 10,
                "arrival": {
                    "time": 1623956040
                },
                "departure": {
                    "time": 1623956040
                },
                "stop_id": "8300B136141",
                "schedule_relationship": "SKIPPED"
            }, {
                "stop_sequence": 11,
                "arrival": {
                    "delay": 6960
                },
                "departure": {
                    "delay": 6960
                },
                "stop_id": "8300B1359501",
                "schedule_relationship": "SCHEDULED"
            }, {
                "stop_sequence": 12,
                "arrival": {
                    "delay": 7920
                },
                "departure": {
                    "delay": 7920
                },
                "stop_id": "8300B1316301",
                "schedule_relationship": "SCHEDULED"
            }, {
                "stop_sequence": 13,
                "arrival": {
                    "delay": 8100
                },
                "departure": {
                    "delay": 8100
                },
                "stop_id": "8300B1314101",
                "schedule_relationship": "SCHEDULED"
            }]
        }
    }, {
        "id": "1984810.y100u.10-32-e20-1.89.O",
        "trip_update": {
            "trip": {
                "trip_id": "1984810.y100u.10-32-e20-1.89.O",
                "start_time": "16:45:00",
                "start_date": "20210617",
                "schedule_relationship": "SCHEDULED",
                "route_id": "10-32-e20-1"
            },
            "stop_time_update": [{
                "stop_sequence": 1,
                "departure": {
                    "delay": 540
                },
                "stop_id": "8220B1350001",
                "schedule_relationship": "SCHEDULED"
            }, {
                "stop_sequence": 2,
                "arrival": {
                    "delay": 420
                },
                "departure": {
                    "delay": 600
                },
                "stop_id": "8240B111931",
                "schedule_relationship": "SCHEDULED"
            }, {
                "stop_sequence": 3,
                "arrival": {
                    "delay": 840
                },
                "departure": {
                    "delay": 1020
                },
                "stop_id": "8300B1524301",
                "schedule_relationship": "SCHEDULED"
            }, {
                "stop_sequence": 4,
                "arrival": {
                    "delay": 600
                },
                "departure": {
                    "delay": 600
                },
                "stop_id": "8540B601221",
                "schedule_relationship": "SCHEDULED"
            }, {
                "stop_sequence": 5,
                "arrival": {
                    "delay": 1140
                },
                "departure": {
                    "delay": 1140
                },
                "stop_id": "8540B1559301",
                "schedule_relationship": "SCHEDULED"
            }, {
                "stop_sequence": 6,
                "arrival": {
                    "delay": 1320
                },
                "departure": {
                    "delay": 600
                },
                "stop_id": "8540B1559201",
                "schedule_relationship": "SCHEDULED"
            }, {
                "stop_sequence": 7,
                "arrival": {
                    "delay": 1380
                },
                "departure": {
                    "delay": 1380
                },
                "stop_id": "8540B1560201",
                "schedule_relationship": "SCHEDULED"
            }, {
                "stop_sequence": 8,
                "arrival": {
                    "delay": 1560
                },
                "departure": {
                    "delay": 1620
                },
                "stop_id": "8540B156591",
                "schedule_relationship": "SCHEDULED"
            }, {
                "stop_sequence": 9,
                "arrival": {
                    "delay": 1380
                },
                "departure": {
                    "delay": 1380
                },
                "stop_id": "700000015376",
                "schedule_relationship": "SCHEDULED"
            }, {
                "stop_sequence": 11,
                "arrival": {
                    "delay": 1500
                },
                "departure": {
                    "delay": 1500
                },
                "stop_id": "7060B1581001",
                "schedule_relationship": "SCHEDULED"
            }, {
                "stop_sequence": 12,
                "arrival": {
                    "delay": 1380
                },
                "departure": {
                    "delay": 1380
                },
                "stop_id": "7060B1581401",
                "schedule_relationship": "SCHEDULED"
            }, {
                "stop_sequence": 13,
                "arrival": {
                    "delay": 1320
                },
                "departure": {
                    "delay": 1320
                },
                "stop_id": "700000013332",
                "schedule_relationship": "SCHEDULED"
            }]
        }
    },
        {
            "id": "10315.10204.2-451-gad-1.308.O",
            "trip_update": {
                "trip": {
                    "trip_id": "10315.10204.2-451-gad-1.308.O",
                    "start_time": "21:35:00",
                    "start_date": "20210617",
                    "schedule_relationship": "SCHEDULED",
                    "route_id": "2-451-gad-1"
                },
                "stop_time_update": [{
                    "stop_sequence": 1,
                    "departure": {
                        "delay": 0
                    },
                    "stop_id": "8350DB004533",
                    "schedule_relationship": "SCHEDULED"
                }]
            }
        }]
}
]

records = []
for datum in data_nested[0]['entity']:
    try:
        records.append({'timestamp': datum['id'],
                        'start_time': datum['trip_update']['trip']['start_time'],
                        'start_date': datum['trip_update']['trip']['start_date'],
                        'trip_id': datum['trip_update']['trip']['trip_id'],
                        'route_id': datum['trip_update']['trip']['route_id'],
                        'schedule_relationship': datum['trip_update']['trip']['schedule_relationship'],
                        'stop_sequence': datum['trip_update']['stop_time_update']
                        })

    # Handles for missing /cancel journeys but there should be a better way to do this
    except KeyError:
        pass

df = pd.DataFrame.from_records(records)
# df = pd.DataFrame.df['departure']

df = df.explode('stop_sequence')
df = pd.concat([df.drop(['stop_sequence'], axis=1), df['stop_sequence'].apply(pd.Series)], axis=1)

departure = df['departure'].apply(pd.Series)
departure = departure.rename(columns={'delay': 'departure_delay', 'time': 'departure_time'})

arrival = df['arrival'].apply(pd.Series)
arrival = arrival.rename(columns={'delay': 'arrival_delay', 'time': 'arrival_time'})

df_final = pd.concat([df, arrival['arrival_delay'], arrival['arrival_time'],
                      departure['departure_delay'], departure['departure_time']],
                     axis=1)
df_final.drop(['departure', 'arrival'], axis=1, inplace=True)

