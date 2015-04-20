// Calculate the sum total of people who are living in a zip code where the city starts with a digit.
db.zips.aggregate([
    {
        "$project": {
            "firstChar": { "$substr" : ["$city", 0, 1] },
            "city": 1,
            "pop": 1
        }
    },
    {
        "$match": {
            "firstChar": { "$gte": "0" },
            "firstChar": { "$lte": "9" }
        }
    },
    {
        "$group": {
            "_id": 1,
            "ruralPopulation": { "$sum": "$pop" }
        }
    }
]);
