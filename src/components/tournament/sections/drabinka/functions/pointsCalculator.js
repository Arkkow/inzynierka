export function pointsForTournamentsClassicLadder(numberOfPairGames, rang, numberOfPairs){
    if (rang == "MASTER" && numberOfPairs === "8")
    {
        if (numberOfPairGames == 1){
            return 50
        }
        else if (numberOfPairGames == 2){
            return 125
        }
        else if (numberOfPairGames == 3){
            return 250
        }
        else if (numberOfPairGames == 4){
            return 500
        }
    }
    else if (rang === "MASTER" && numberOfPairs === "16")
    {
        if (numberOfPairGames == 1){
            return 50
        }
        else if (numberOfPairGames == 2){
            return 125
        }
        else if (numberOfPairGames == 3){
            return 250
        }
        else if (numberOfPairGames == 4){
            return 500
        }
        else if (numberOfPairGames == 5){
            return 1000
        }
    }
    else if (rang === "CHALLENGER" && numberOfPairs === "8")
    {
        if (numberOfPairGames === 1){
            return 25
        }
        else if (numberOfPairGames === 2){
            return 50
        }
        else if (numberOfPairGames === 3){
            return 125
        }
        else if (numberOfPairGames === 4){
            return 250
        }
    }
    else if (rang === "CHALLENGER" && numberOfPairs === "16")
    {
        if (numberOfPairGames == 1){
            return 25
        }
        else if (numberOfPairGames == 2){
            return 50
        }
        else if (numberOfPairGames == 3){
            return 125
        }
        else if (numberOfPairGames == 4){
            return 250
        }
        else if (numberOfPairGames == 5){
            return 500
        }
    }
    else
    {return null}
}

export function pointsForTournamentsLadderOfPlace(place, rang, numberOfPairs){
    if (rang == "MASTER" && numberOfPairs == "8")
    {
        if (place == 1){
            return 500
        }
        else if (place == 2){
            return 400
        }
        else if (place == 3){
            return 300
        }
        else if (place == 4){
            return 200
        }
        else if (place == 5){
            return 150
        }
        else if (place == 6){
            return 100
        }
        else if (place == 7){
            return 50
        }
        else if (place == 8){
            return 25
        }
    }
    else if (rang == "MASTER" && numberOfPairs == "16")
    {
        if (place == 1){
            return 1000
        }
        else if (place == 2){
            return 900
        }
        else if (place == 3){
            return 800
        }
        else if (place == 4){
            return 700
        }
        else if (place == 5){
            return 600
        }
        else if (place == 6){
            return 500
        }
        else if (place == 7){
            return 450
        }
        else if (place == 8){
            return 400
        }
        else if (place == 9){
            return 350
        }
        else if (place == 10){
            return 300
        }
        else if (place == 11){
            return 250
        }
        else if (place == 12){
            return 200
        }
        else if (place == 13){
            return 150
        }
        else if (place == 14){
            return 100
        }
        else if (place == 15){
            return 50
        }
        else if (place == 16){
            return 25
        }
    }
    else if (rang == "CHALLENGER" && numberOfPairs == "8")
    {
        if (place == 1){
            return 250
        }
        else if (place == 2){
            return 200
        }
        else if (place == 3){
            return 150
        }
        else if (place == 4){
            return 100
        }
        else if (place == 5){
            return 75
        }
        else if (place == 6){
            return 50
        }
        else if (place == 7){
            return 25
        }
        else if (place == 8){
            return 10
        }
    }
    else if (rang == "CHALLENGER" && numberOfPairs == "16")
    {
        if (place == 1){
            return 500
        }
        else if (place == 2){
            return 450
        }
        else if (place == 3){
            return 400
        }
        else if (place == 4){
            return 350
        }
        else if (place == 5){
            return 300
        }
        else if (place == 6){
            return 250
        }
        else if (place == 7){
            return 225
        }
        else if (place == 8){
            return 200
        }
        else if (place == 9){
            return 175
        }
        else if (place == 10){
            return 150
        }
        else if (place == 11){
            return 125
        }
        else if (place == 12){
            return 100
        }
        else if (place == 13){
            return 75
        }
        else if (place == 14){
            return 50
        }
        else if (place == 15){
            return 25
        }
        else if (place == 16){
            return 10
        }
    }
}
