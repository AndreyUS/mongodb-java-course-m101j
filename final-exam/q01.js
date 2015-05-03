db.messages.find({
    "headers.From": "andrew.fastow@enron.com",
    "headers.To": "john.lavorato@enron.com"
}).count()
