import numpy as np
import scipy as stats
from scipy.signal import savgol_filter
import pandas as pd
from encoder import NumpyEncoder
from scipy.signal import argrelextrema


class Tools():  
        
    
    def getMax(self, data):
        max = np.max(data)
        return max
    
    def createRandomArray(self):
        result = np.random.rand(10)
        
        
        return NumpyEncoder.default(self, result)
    
    def processTXT(self, data):
        arrayOfLines = data.splitlines()

        splittedArrayOfLines = []
        for each in arrayOfLines:
            try:
                tmp = list(map(float, each.split(";")))
                splittedArrayOfLines.append(tmp[1:])
            except:
                continue
            
        return splittedArrayOfLines
    
    def clean(self, data, windowSize, degree):
        x = data[0]
        y = data[1]

        newY = savgol_filter(y, windowSize, degree)
        result = [list(a) for a in zip(x, newY)]
        return result
    
    def normalize(self, data, reference = None):
        numerator = np.array(data)
        
        if reference is None:
            denominator = np.amax(numerator)
        else: 
            denominator = np.array(reference)
            
        return np.divide(numerator, denominator)
                
    
    def getMaxima(self,data):
        
        x = data[0]
        y = data[1]
        
        # index_max = argrelextrema(y, np.greater,10)
        # index_min = argrelextrema(y, np.less,10)


        index_min = np.argmin(y)
        index_max = np.argmax(y)
        
        min = [x[index_min],y[index_min]]
        max = [x[index_max],y[index_max]]
        
        return [min,max]
        

