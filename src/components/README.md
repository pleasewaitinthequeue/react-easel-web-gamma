# Components

### Common components
Any components that might be used in multiple contexts are stored in the common directory.
- **ChipLister** - the chip lister validates and adds emails as they're entered by the user, allowing for the entry of multiple emails via copy / paste.

### Main Page Components
Any components that are used on the Index page are stored in this directory. This includes:
- **Nav** / **Footer** - these two components provide liks that are displayed on all pages of the application.  Nav has authenticated and unauthenticated states.
- **Profile** - displays information about the user as authenticated by Google or Email / Password
- **SignOut** - a standard component that unauthenticates the user, returning them to a public view of the Index page
- **Register** - a placeholder for future functionality

### Objects Specific to EASEL

#### Courses
Courses are the highest object level in EASEL.  Because both the instructor, and the student have to have access to Courses, they exist as a collection at the root of the database.  May have to look at special permissions formatting, due to the idea that the instructor and the student will be editing the same database objects.  A course object is describe in JavaScript Object Notation (JSON) below:

```
"courses": [
    {
        "courseId":"0",
        "owner":"jomalair@iu.edu",
        "managers":["jomalair@iu.edu"],
        "name":"MET-35600-24524",
        "school":"Mechanical Engineering Technology",
        "title":"carbon fiber basket weaving for electric automobile tires",
        "description":"students in the course will learn how to weave carbon fiber together to make futuristic automobile tires fit for an elon musk dream.",
        "students": ["jomalair@iu.edu", "annamath@iu.edu", "nfurniss@iu.edu", "drkulkar@iu.edu" ],
        "assignments": [],
        "announcements": []
    }
```

#### Assignments
Assignments are smaller units that fall below the Course.  Each course can have no assignments, or many assignments.  Each assignment is exposed to all students, but by managing the number of pieces of data that the Instructor must enter, there is less risk that assignments will be created unintentionally.

```
"assignments": [
  {
    "assignmentId": "0",
    "name":  "interviewing an industry professional",
    "description":  "interviewing an industry professional is an important look into how the carbon fiber weaving operations are run on a day to day basis.",
    "due": "",
    "status":  "incomplete",
    "isTemplate": false,
    "tasks": []
  }
```

#### Tasks
Tasks break up the assignment questions.  The tasks are a key part of how the experiential learning cycle will be supported.  Key features, like geofencing for notifications will be controlled using this object.

```
"tasks": [
  {
    "taskId": "0",
    "name":  "pre-interview questions",
    "type":  "pre-task",
    "description":  "answer each of the questions prior to completing your interview",
    "dueDateSetBy":  "instructor",
    "scheduledEvent": {
      "eventId": "0",
      "eventName":  "interview event",
      "location": {
      "latitude":  "39.756014",
      "longitude":  "-86.153205",
      "name":  "At John Manager's Office"
      },
      "dueDate":  "",
      "creator":  "jomalair@iu.edu"
  },
"due": "",
"status":  "incomplete",
"questions": []
}
```

#### Questions
Questions are the main place where collaboration will happen.  While the Course, Assignment, Task, and Question Objects will be edited by the Instructor, students will answer Questions with Answers.

```
"questions": [
  {
    "questionId":"0",
    "number":"1",
    "name":"question a",
    "description":"what kinds of details do you expect to learn from this individual that you could not otherwise know?",
    "answerType":"text",
    "status":"incomplete",
    "answers":[]
}]
```

#### Answers
Answer objects will be the smallest object in the database.  Students will answer Questions with Answers.  Additional metadata tags are included, for specific types of answers - for example - if the required answer type is a Video / Sound file, the URL field will be used to record the permanent location of the asset.  At a minimum, the Instructor will be able to see which students have answered the question.  

```
{
  "answerId":"0",
  "answerer":"jomalair@iu.edu",
  "answerType":"text",
  "title":"",
  "caption":  "",
  "description":  "",
  "url":  "",
  "answer": "This is a great answer",
  "status":  "complete"
}
```
