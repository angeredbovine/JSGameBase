sed -i 's/\r$//' DeployLocations.txt

while read LINE; do

    find . -name "*.js" -exec cp {} ${LINE} \;

done < DeployLocations.txt
