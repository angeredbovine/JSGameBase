sed -i 's/\r$//' DeployLocations.txt

while read LINE; do

    if [ ! -d "$LINE" ]; then
    
    	mkdir ${LINE}

    fi

    find . -name "*.js" -exec cp {} ${LINE} \;

done < DeployLocations.txt
