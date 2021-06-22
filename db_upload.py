import pandas as pd
import numpy as np
from sqlalchemy import create_engine
import config

# Choose location/name of file you want to send to mySQL
filepath = r'C:\Users\myfile.csv'
data = pd.read_csv(filepath)
table_name = 'myTable'

# Split data into smaller sets (only useful for very large sets)
split_data = np.array_split(data, 10)

# Create engine based on details in config
engine = create_engine(config.CONNECTION_STRING, echo=False)

# Iterate over the broken down sets and load to the sql table
# can choose between append, replace or fail for if_exists, if you are spliting up the data sets then replace would
# only keep the final set.
for dataset in split_data:
    dataset.to_sql(name=table_name, con=engine, if_exists='append', index=False)
    print('finished with set')
