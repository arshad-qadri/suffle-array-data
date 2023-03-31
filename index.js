let numbers = ["arshad","ayman","asjad","noorani","hoori"]

for (let i = 0; i < numbers.length; i++) {
    const j = Math.floor(Math.random()*(i+1))
    let temp = numbers[i]
    numbers[i]= numbers[j]
    numbers[j]= temp
    
}
console.log("suffleNums: ", numbers);