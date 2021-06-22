import http.client, urllib.request, urllib.parse, urllib.error, base64
import pandas as pd
import json

headers = {
    # Request headers
    'Cache-Control': 'no-cache',
    'x-api-key': '1e368d52ec3c4abe9229bc3df32f207d',
}

params = urllib.parse.urlencode({
})

url = 'https://api.nationaltransport.ie/gtfsrtest/?format=json'
req = urllib.request.Request(url, None, headers)

# Create the response that will be parsed
with urllib.request.urlopen(req) as f:
    response = f.read()

my_bytes_value = response

# to double quotes to make it valid JSON
my_json = my_bytes_value.decode('utf8').replace("'", '"')

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

