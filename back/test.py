import numpy as np
data = "0;1;2\n1;2;3\n13;4;5"

arrayOfLines = np.array(data.splitlines())

splittedArrayOfLines = []
for each in arrayOfLines:
    tmp = list(map(float, each.split(";")))
    splittedArrayOfLines.append(tmp[1:])
    
print(splittedArrayOfLines)
