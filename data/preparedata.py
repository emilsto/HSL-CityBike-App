import pandas as pd

# Read the data to dataframes
may_2021 = pd.read_csv('2021-05.csv')
june_2021 = pd.read_csv('2021-06.csv')
july_2021 = pd.read_csv('2021-07.csv')

# Cleaning the data

# Remove the rows with missing values
may_2021 = may_2021.dropna()
june_2021 = june_2021.dropna()
july_2021 = july_2021.dropna()

# Remove rows with data of trips less than 1 minute