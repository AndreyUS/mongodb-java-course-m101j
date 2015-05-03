db.messages.aggregate(
    [
        {
            "$unwind": "$headers.To",
        },
        {
            "$group": {
                "_id": { "docid": "$_id", "from": "$headers.From", "to": "$headers.To" },
            }
        },
        {
            "$group": {
                "_id": { "from": "$_id.from", "to": "$_id.to" },
                "count": { "$sum": 1 }
            }
        },
        {
            "$sort": {
                "count": -1
            }
        }
    ],
    { "allowDiskUse": true }
)
