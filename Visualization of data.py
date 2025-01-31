import pandas as pd
import matplotlib.pyplot as mp
from google.colab import drive
drive.mount('/content/drive')
data=pd.read_csv('iris.csv')
print(data.head())#print first 5 element
print(data.tail())#print last 5 element
#imnfo,isnull
mp.hist(data['species'],bins=10,color='black')
