import pandas as pd

# This is a small script to prepare the data for analysis and database insertion

# Read the data to dataframes
may_2021 = pd.read_csv('2021-05.csv')
june_2021 = pd.read_csv('2021-06.csv')
july_2021 = pd.read_csv('2021-07.csv')
locations = pd.read_csv('Helsingin_ja_Espoon_kaupunkipyöräasemat_avoin.csv')


# Verifying and cleaning the data

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

#Remove duplicate rows
may_2021 = may_2021.drop_duplicates()
june_2021 = june_2021.drop_duplicates()
july_2021 = july_2021.drop_duplicates()

# Print the number of rows in each dataframe

print('May 2021: ', may_2021.shape[0])
print('June 2021: ', june_2021.shape[0])
print('July 2021: ', july_2021.shape[0])

# Combine the dataframes
df = pd.concat([may_2021, june_2021, july_2021])

# Edit the column names of the combined dataframe
df.columns = ['departure', 'return', 'departure_station_id', 'departure_station_name', 'return_station_id', 'return_station_name', 'distance_m', 'duration_sec']

# Delete first 2 columns of the locations dataframe
locations = locations.drop(locations.columns[[0, 0]], axis=1)

# Delete colums "Stad" and "Operaattor", they are not needed
locations = locations.drop(locations.columns[[7, 8]], axis=1)

# Rename the columns of the locations dataframe
locations.columns = ['obj_id', 'name_fi', 'name-se', 'name', 'address', 'address_se', 'city', 'capacity', 'latitude', 'longitude']

# If city == " " then city = "Helsinki"
locations['city'] = locations['city'].replace(' ', 'Helsinki')

# Print 10 random rows of the locations dataframe
print(locations.sample(10))

# Save the locations dataframe to a csv file
locations.to_csv('../db/stations.csv', index=False)


# Print the number of rows in the combined dataframe
print('Combined: ', df.shape[0])

# Save the combined dataframe to a csv file
df.to_csv('../db/bikedata.csv', index=False)