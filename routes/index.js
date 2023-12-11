const express = require('express');
const router = express.Router();
const Teacher=require("../models/teacher");
const Student=require("../models/student");

router.get('/', async(req, res) => {
  res.render('home');
});
router.get('/teacherlogin', async(req, res) => {
  res.render('teacherlogin',{ error:''});
});
router.post('/teacherlogin', async (req, res) => {
  const { registerNumber, password } = req.body;
  try {
    const teacher = await Teacher.findOne({
      where: { registerNumber, password },
    });

    if (teacher) {
      //If  Successful login, navigate to the next page
      res.redirect('/teacherdash'); 
    } else {
      // if Incorrect login details, display an error
      res.render('teacherlogin', { error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.render('teacherlogin', { error: 'An error occurred during login' });
  }
});
router.get('/teacherdash', async (req, res) => {
  try {
    const students = await Student.findAll(); // Fetch all student records
    res.render('teacherdashboard', { students }); 
  } catch (error) {
    console.error('Error fetching student records:', error);
    res.render('teacherdashboard', { error: 'An error occurred' });
  }
});
router.get('/teacherlogout', (req, res) => {
  res.redirect('/'); //On logout Redirect to the index page
});
router.get('/addrecord', (req, res) => {
  res.render('addRecord',{ error:''}); 
});
router.post('/addrecord', async (req, res) => {
  const { rollno, dob, name, score } = req.body;
  try {
    //This will Insert the new student record into the database
    await Student.create({
      rollno,
      dob,
      name,
      score,
    });
    res.redirect('/teacherdash?message=Record added successfully');
    // res.render('addRecord', { message: 'Student record added successfully!' });
  } catch (error) {
    console.error('Error adding student record:', error);
    res.render('addRecord', { error: 'Please enter valid details of the student' });
  }
});

router.get('/studentlogin', async(req,res)=>{
  res.render('studentlogin',{ error:''});
});
router.post('/studentlogin', async (req, res) => {
  const { rollno, name } = req.body;

  try {
    const student = await Student.findOne({
      where: { rollno, name },
    });

    if (student) {
      res.redirect(`/studentlogin/dashboard/${student.rollno}`);
    } else {
      res.render('studentlogin', { error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during student login:', error);
    res.render('studentlogin', { error: 'An error occurred during login' });
  }
});
router.get('/studentlogin/dashboard/:id', async (req, res) => {
  const studentId = req.params.id;

  try {
    const student = await Student.findByPk(studentId);

    if (student) {
      res.render('studentdashboard', { student });
    } else {
      res.render('studentlogin', { error: 'Student not found' });
    }
  } catch (error) {
    console.error('Error fetching student data:', error);
    res.render('stuentlogin', { error: 'An error occurred' });
  }
});
router.get('/studentlogout', (req, res) => {
  res.redirect('/'); // Redirect to the index page
});

router.get('/delete/:id', async (req, res) => {
  const studentId = req.params.id;
  try {
    // Find the student record by ID
    const student = await Student.findByPk(studentId);


    // Delete the student record
    await student.destroy();

    res.redirect('/teacherdash'); // Redirect to the dashboard after deletion
  } catch (error) {
    console.error('Error deleting student:', error);
    res.render('teacherdashboard', { error: 'An error occurred' });
  }
});

// edit.js
router.get('/edit/:id', async (req, res) => {
  const studentId = req.params.id;

  try {
    const student = await Student.findByPk(studentId);

    if (!student) {
      res.redirect('/teacerdash'); 
      return;
    }

    res.render('edit', { student }); // Render the edit form with student data
  } catch (error) {
    console.error('Error fetching student for edit:', error);
    res.redirect('/teacherdash'); // Redirect to the dashboard in case of an error
  }
});

router.post('/edit/:id', async (req, res) => {
  const studentId = req.params.id;
  const { dateOfBirth, name, score } = req.body;

  try {
    const student = await Student.findByPk(studentId);

    if (!student) {
      res.redirect('/teacherdash'); // Redirect to the dashboard if student is not found
      return;
    }

    // This will Update student data
    student.dob = dateOfBirth;
    student.name = name;
    student.score = score;
    await student.save();

    res.redirect('/teacherdash'); 
  } catch (error) {
    console.error('Error editing student:', error);
    res.redirect('/teacherdash'); // Redirect to the dashboard in case of an error
  }
});

module.exports = router;
