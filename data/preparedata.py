import pandas as pd

# This is a small script to prepare the data for analysis and database insertion

# Read the data to dataframes
may_2021 = pd.read_csv('2021-05.csv')
june_2021 = pd.read_csv('2021-06.csv')
july_2021 = pd.read_csv('2021-07.csv')

# Cleaning the data

# Remove the rows with missing values
may_2021 = may_2021.dropna()
june_2021 = june_2021.dropna()
july_2021 = july_2021.dropna()

# Remove rows with data of trips less than 10 seconds
may_2021 = may_2021[may_2021['Duration (sec.)'] > 10]
june_2021 = june_2021[june_2021['Duration (sec.)'] > 10]
july_2021 = july_2021[july_2021['Duration (sec.)'] > 10]


# Remove rows with data of trips less than 10 meters
may_2021 = may_2021[may_2021['Covered distance (m)'] > 10]
june_2021 = june_2021[june_2021['Covered distance (m)'] > 10]
july_2021 = july_2021[july_2021['Covered distance (m)'] > 10]

# Print the number of rows in each dataframe

print('May 2021: ', may_2021.shape[0])
print('June 2021: ', june_2021.shape[0])
print('July 2021: ', july_2021.shape[0])

# Combine the dataframes
df = pd.concat([may_2021, june_2021, july_2021])

# Edit the column names
df.columns = ['departure', 'return', 'departure_station_id', 'departure_station_name', 'return_station_id', 'return_station_name', 'distance_m', 'duration_sec']




# Print the number of rows in the combined dataframe
print('Combined: ', df.shape[0])

# Save the combined dataframe to a csv file
df.to_csv('../db/bikedata.csv.csv', index=False)