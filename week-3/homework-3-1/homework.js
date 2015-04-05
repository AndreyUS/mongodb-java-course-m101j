//
// For each student, remove a homework with the lowest score.
//

var studentsWithHomework = db.students.find({ "scores.type": "homework" });

studentsWithHomework.forEach(function(student) {
    var homeworkScores = student.scores
        .filter(function(elem) { return elem.type === "homework"; })
        .map(function(elem) { return elem.score; });

    var minHomeworkScore = Math.min.apply(null, homeworkScores);

    // This might have undesired consequences if there are multiple homeworks
    // with equal scores, since in this case all of them will be removed.
    db.students.update(
        { "_id": student._id, },
        { "$pull": { "scores" : { "type": "homework", "score": minHomeworkScore } } }
    );
});
