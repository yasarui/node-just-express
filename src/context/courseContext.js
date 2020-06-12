const Course = require('../models/course');

class CourseContext {
    getAllCoureses(student) {
        return Course.find({student})
            .populate('student')
            .then((data) => {
                return data;
            })
            .catch((e) => {
                throw new Error(e);
            })
    }
    getCourse(_id,student) {
        return Course.findOne({_id,student})
            .populate('student')
            .then((data) => {
                return data
            })
            .catch((e) => {
                throw new Error(e);
            })
    }
    addCourse(obj) {
        return new Course(obj)
            .save()
            .then((response) => {
                return response
            })
            .catch((e) => {
                throw new Error(e);
            })
    }
    updateCourse(_id, student,updateObj) {
        return Course.findOneAndUpdate({_id,student}, updateObj, {
                new: true
            })
            .then((data) => {
                return data
            }).catch((e) => {
                throw new Error(e);
            })
    }
    deleteCourse(_id,student) {
        return Course.findOneAndDelete({_id,student})
            .then((response) => {
                return response;
            })
            .catch((e) => {
                throw new Error(e);
            })
    }
}

module.exports = new CourseContext();