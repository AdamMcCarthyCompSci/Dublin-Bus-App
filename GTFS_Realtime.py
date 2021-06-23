import urllib.request, urllib.parse, urllib.error
import pandas as pd
import json
import numpy as np
import config
from sqlalchemy import create_engine

headers = {
    # Request headers
    'Cache-Control': 'no-cache',
    'x-api-key': config.GTFS_R_API_Key,
}

params = urllib.parse.urlencode({
})

req = urllib.request.Request(config.GTFS_url, None, headers)

# Create the response that will be parsed
with urllib.request.urlopen(req) as f:
    response = f.read()

# to double quotes to make it valid JSON
my_json = response.decode('utf8').replace("'", '"')

# Load the JSON to a Python list & dump it back out as formatted JSON
data = json.loads(my_json)
s = json.dumps(data, indent=4, sort_keys=True)

# a_json = json.loads(s)data_nested = pd.DataFrame.from_dict(a_json, orient="index")

data_nested = json.loads(s)
# data_nested = pd.DataFrame.from_dict(a_json, orient="index")


records = []
for datum in data_nested['entity']:
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
df_final = df_final.loc[:, ~df_final.columns.duplicated()]

df_final = df_final.reset_index(drop=True)
df_final['id'] = df_final.index
# shift column 'Name' to first position
first_column = df_final.pop('id')

# insert column using insert(position, column_name, first_column) function
df_final.insert(0, 'id', first_column)

data = df_final

# Split data into smaller sets (only useful for very large sets)
split_data = np.array_split(data, 1)

# Create engine
engine = create_engine(
    'mysql+mysqlconnector://admin:DublinBus123.@dublinbus.ccfxbrwhc5i2.us-east-1.rds.amazonaws.com:3306/dublinbus',
    echo=False)

for dataset in split_data:
    dataset.to_sql(name='tfi_realtime', con=engine, if_exists='replace', index=False)
    print('finished with set')
