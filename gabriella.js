// *yawn* awake and ready to work!

// so, let's setup some things first
const express = require('express');
const app = express();

// this buddy right here will help us getting data from the body
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// just one more sec okay? We'l just configure our firebase
let firebase = require("firebase-admin");

let serviceAccount = require("./configs/se3me-tasks-firebase-adminsdk-tzqz6-51bbfdd6d0.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://se3me-tasks.firebaseio.com"
});

let db = firebase.firestore();
let auth = firebase.auth();

// AAAA FINALLY! Now we can start...

app.get('/', (req, res) =>  {
    res.status(200).json({
        message: 'Hello world!'
    });
});

app.post('/user/:email/create/task', (req, res) => {

    let email = req.params.email;
    let title = req.body.title;
    let deadline = req.body.deadline;
    let description = req.body.description;
    let importance = req.body.importance;

    // first time here? Well, I'll teach you
    // in these following lines, we'll be getting user's infos
    // then, we'll get the user's id and, finally, mix everything putting it in the database
    auth.getUserByEmail(email)
        .then((userInfos) => {

            let addTask = db.collection('tasks').doc().set({
                userId: userInfos.uid,
                todo: title,
                deadline: deadline,
                description: description,
                importance: importance
            });

            if(addTask) {
                res.json({
                    message: "Task added successfully"
                })
            } else {
                res.json({
                    message: "Couldn't add task :("
                })
            }

        });

});

app.post('/user/remove/task/:taskId', (req, res) => {

    let taskId = req.params.taskId;

    db.collection('tasks').doc(taskId).delete()
        .then(
            res.json({
                message: "Uff finally you got rid of that task"
            })
        )

});

app.post('/user/edit/task/:taskId', (req, res) => {

    let taskId = req.params.taskId;
    let title = req.body.title;
    let deadline = req.body.deadline;
    let description = req.body.description;
    let importance = req.body.importance;

    let editTask = db.collection('tasks').doc(taskId).update({
        todo: title,
        deadline: deadline,
        description: description,
        importance: importance
    });

    if(editTask) {
        res.json({
            message: "Task edited successfully"
        })
    } else {
        res.json({
            message: "Couldn't edit task :("
        })
    }

});

app.post('/user/:email/create/homework', (req, res) => {

    let email = req.params.email;
    let subject = req.body.subject;
    let homework = req.body.homework;

    auth.getUserByEmail(email)
        .then((userInfos) => {

            let addHomework = db.collection('homework').doc().set({
                userId: userInfos.uid,
                subject: subject,
                todo: homework
            });

            if(addHomework) {
                res.json({
                    message: "OwO more homework..."
                })
            } else {
                res.json({
                    message: "Couldn't add homework, is it good?"
                })
            }

        });

});

app.post('/user/remove/homework/:homeworkId', (req, res) => {

    let homeworkId = req.params.homeworkId;

    db.collection('homework').doc(homeworkId).delete()
        .then(
            res.json({
                message: "Now the teacher won't complain about you not doing your homework ;)"
            })
        )

});

app.post('/user/edit/homework/:homeworkId', (req, res) => {

    let homeworkId = req.params.homeworkId;
    let subject = req.body.subject;
    let homework = req.body.homework;

    let editHomework = db.collection('homework').doc(homeworkId).update({
        subject: subject,
        todo: homework
    });

    if(editHomework) {
        res.json({
            message: "Homework edited ufff, now you're not mistaken"
        })
    } else {
        res.json({
            message: "Couldn't edit homework, try to note it somewhere and then come here again :("
        })
    }

});

app.post('/user/:email/create/notebook', (req, res) => {

    let email = req.params.email;
    let title = req.body.title;
    let content = req.body.content;

    auth.getUserByEmail(email)
        .then((userInfos) => {

            let createNotebook = db.collection('notebook').doc().set({
                userId: userInfos.uid,
                title: title,
                content: content
            });

            if(createNotebook) {
                res.json({
                    message: "New and fresh notebook, try writing something cute"
                })
            } else {
                res.json({
                    message: "Out of paper x| couldn't create notebook"
                })
            }

        });

});

app.post('/user/remove/notebook/:notebookId', (req, res) => {

    let notebookId = req.params.notebookId;

    db.collection('notebook').doc(notebookId).delete()
        .then(
            res.json({
                message: "Vooooshhhh this notebook is gone"
            })
        )

});

app.post('/user/edit/notebook/:notebookId', (req, res) => {

    let notebookId = req.params.notebookId;
    let title = req.body.title;
    let content = req.body.content;

    let editNotebook = db.collection('notebook').doc(notebookId).set({
        userId: userInfos.uid,
        title: title,
        content: content
    });

    if(editNotebook) {
        res.json({
            message: "Homework edited ufff, now you're not mistaken"
        })
    } else {
        res.json({
            message: "Couldn't edit homework, try to note it somewhere and then come here again :("
        })
    }

});

app.post('/user/:email/create/contact', (req, res) => {

    let email = req.params.email;
    let peerName = req.body.peerName;
    let peerEmail = req.body.peerEmail;
    let peerBirthday = req.body.peerBirthday;

    auth.getUserByEmail(email)
        .then((userInfos) => {

            let createContact = db.collection('contacts').doc().set({
                userId: userInfos.uid,
                peerName: peerName,
                peerEmail: peerEmail,
                peerBirthday: peerBirthday
            });

            if(createContact) {
                res.json({
                    message: "Hmm a new contact... have fun!"
                })
            } else {
                res.json({
                    message: "Couldn't add this contact (maybe he/she wasn't that important)"
                })
            }

        });

});

app.post('/user/remove/contact/:contactId', (req, res) => {

    let contactId = req.params.contactId;

    db.collection('contacts').doc(contactId).delete()
        .then(
            res.json({
                message: "Contact removed, please don't be sad now..."
            })
        )

});

app.post('/user/edit/contact/:contactId', (req, res) => {

    let contactId = req.params.contactId;
    let peerName = req.body.peerName;
    let peerEmail = req.body.peerEmail;
    let peerBirthday = req.body.peerBirthday;

    let editContact = db.collection('contacts').doc(contactId).update({
        peerName: peerName,
        peerEmail: peerEmail,
        peerBirthday: peerBirthday
    });

    if(editContact) {
        res.json({
            message: "Now you know your peer's e-mail ehehehe"
        })
    } else {
        res.json({
            message: "Couldn't edit peer's e-mail:("
        })
    }

});

app.post('/user/:email/create/reminder/:isMonthly', (req, res) => {

    let email = req.params.email;
    let isMonthly = req.params.isMonthly;
    let reminder = req.body.reminder;
    let date = req.body.date;

    if(isMonthly !== true) {
        date = "0, 0";
    }

    auth.getUserByEmail(email)
        .then((userInfos) => {

            let createReminder = db.collection('reminders').doc().set({
               userId: userInfos.uid,
               isMonthly: isMonthly,
               date: date,
               content: reminder
            });

            if(createReminder) {
                res.json({
                    message: "It's 11pm, and I had a tuff day, if this message is on your screen, congrats, it worked"
                })
            } else {
                res.json({
                    message: "Couldn't add the reminder bro"
                })
            }

        })

});

app.post('/user/remove/reminder/:reminderId', (req, res) => {

    let reminderId = req.params.reminderId;

    db.collection('reminders').doc(reminderId).delete()
        .then(
            res.json({
                message: "This reminder was removed! Hope you're now free!"
            })
        )

});

app.post('/user/edit/reminder/:reminderId', (req, res) => {

    let reminderId = req.params.reminderId;
    let isMonthly = req.params.isMonthly;
    let reminder = req.body.reminder;
    let date = req.body.date;

    if(!isMonthly) {
        date = "0, 0";
    }

    let editReminder = db.collection('reminders').doc(reminderId).update({
        isMonthly: isMonthly,
        date: date,
        content: reminder
    });

    if(editReminder) {
        res.json({
            message: "It's 11pm, and I had a tuff day, if this message is on your screen, congrats, it worked"
        })
    } else {
        res.json({
            message: "Couldn't add the reminder bro"
        })
    }

});

app.post('/user/:email/create/goal/', (req, res) => {

    let email = req.params.email;
    let goal = req.body.goal;

    auth.getUserByEmail(email)
        .then((userInfos) => {

            let createGoal = db.collection('goals').doc().set({
                userId: userInfos.uid,
                goal: goal
            });

            if(createGoal) {
                res.json({
                    message: "Yaohhh, new goals, up and running!"
                })
            } else {
                res.json({
                    message: "Hmm... it looks like we couldn't add that new goal :/"
                })
            }

        })

});

app.post('/user/remove/goal/:goalId', (req, res) => {

    let goalId = req.params.goalId;

    db.collection('goals').doc(goalId).delete()
        .then(

            res.json({
                message: "Guys, we deleted it!"
            })

        )

});

app.post('/user/edit/goal/:goalId/', (req, res) => {

    let goalId = req.params.goalId;
    let goal = req.body.goal;

    let editGoal = db.collection('goals').doc(goalId).update({
        goal: goal
    });

    if(editGoal) {
        res.json({
            message: "Edited successfully! New goals, new life"
        })
    } else {
        res.json({
            message: "Hmmmm... there's an error here...."
        })
    }

});

// if the following message appears on the terminal: congrats!
// if not, just close the laptop for a bit, get some rest and then get back to your amazing work!
app.listen(3000, () => console.log("Server is up and running on port 3000!"));


