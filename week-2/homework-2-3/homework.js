// Remove the worst homework for each student in grades.json dataset.

var homeworkIterator,
    currentStudentId,
    homeworksToRemove;

currentStudentId = null;
homeworksToRemove = [];

// Find the id of the worst homework for each student.
homeworkIterator = db.grades.find({ type: 'homework' }).sort({ student_id: 1, score: 1 });
homeworkIterator.forEach(function(homework) {
    if (homework.student_id != currentStudentId) {
        homeworksToRemove.push(homework['_id']);
        currentStudentId = homework.student_id;
    }
});

print('Will remove ' + homeworksToRemove.length + ' homeworks now.');

db.grades.remove({ '_id': { '$in': homeworksToRemove } });
