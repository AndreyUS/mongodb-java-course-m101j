// Calculate the class with the best average student performance.
db.grades.aggregate([
    {
        "$unwind": "$scores"
    },
    {
        "$match": {
            "scores.type": { "$ne": "quiz" }
        }
    },
    {
        "$group": {
            "_id": { "class_id": "$class_id", "student_id": "$student_id" },
            "avgScore": { "$avg": "$scores.score" }
        }
    },
    {
        "$group": {
            "_id": "$_id.class_id",
            "avgScore": { "$avg": "$avgScore" }
        }
    },
    {
        "$sort": {
            "avgScore": -1
        }
    },
    {
        "$limit": 1
    }
])
