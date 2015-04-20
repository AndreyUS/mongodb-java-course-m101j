// Find the most active commenter on the blog.
db.posts.aggregate([
    {
        "$unwind": "$comments"
    },
    {
        "$group": {
            "_id": "$comments.author",
            "totalComments": { "$sum": 1 }
        }
    },
    {
        "$sort": {
            "totalComments": -1
        }
    },
    {
        "$project": {
            "_id": 1,
        }
    },
    {
        "$limit": 1
    }
]);
