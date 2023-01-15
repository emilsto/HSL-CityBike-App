import pandas as pd

# This is a small script to get an idea of the data im working with

# Read the data to a dataframe
df = pd.read_csv('../db/bikedata.csv')

# Check for missing values, sanity check
print("Missing values:")
print(df.isnull().sum())
if df.isnull().sum().sum() == 0:
    print("No missing values")

# Print the number of rows in the dataframe
print('Combined: ', df.shape[0])

# Get general information about the dataframe
print("Dataframe info:")
print(df.info())

# Print the first 5 rows of the dataframe
print("First 5 rows:")
print(df.head())

# Print the last 5 rows of the dataframe
print("Last 5 rows:")
print(df.tail())

# Describe the dataframe
print("Dataframe description:")
print(df.describe())