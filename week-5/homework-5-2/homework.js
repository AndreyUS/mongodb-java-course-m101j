// Please calculate the average population of cities in California (abbreviation CA) and New York (NY) (taken together) with populations over 25,000.
// For this problem, assume that a city name that appears in more than one state represents two separate cities. 
db.zips.aggregate([
    {
        "$group": {
            "_id": { "city": "$city", "state": "$state" },
            "population": { "$sum": "$pop" }
        }
    },
    {
        "$match": {
            "$or": [ { "_id.state": "CA" }, { "_id.state": "NY" } ],
            "population": { "$gt": 25000 }
        }
    },
    {
        "$group": {
            "_id": 1,
            "avgPopulation": { "$avg": "$population" }
        }
    }
]);
