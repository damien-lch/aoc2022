bags = []

with open('input.txt') as f:
    tempBag = 0
    for line in f:
        if line.strip() == "":
            bags.append(tempBag)
            tempBag = 0
        else:
            tempBag += int(line.strip())

bags.sort(reverse=True)
max3 = bags[0] + bags[1] + bags[2]
print(max3)