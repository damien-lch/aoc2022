max = 0

with open('input.txt') as f:
    tempBag = 0
    for line in f:
        if line.strip() == "":
            if tempBag > max:
                max = tempBag
                tempBag = 0
            tempBag = 0
        else:
            tempBag += int(line.strip())

print(max)