const express = require('express')
const app = express();
const path = require('path');
const Student = require("./student.js")

const methodoverride = require('method-override');

app.set("view engine", "views")
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, ("/public"))));
app.use(express.urlencoded({ extended: true }))
app.use(methodoverride('_method'));


app.get("/", async (req, res) => {
    let stu = await Student.find();
    res.render("index.ejs", { stu })
})

// student deatils node
app.get("/student/:id", async (req, res) => {
    let { id } = req.params;
    let student = await Student.findById(id);
    console.log(student)
    res.render("studen.ejs", { student });
})


//delete node
app.post("/stu/:id/delete", async (req, res) => {
    // res.send("hello on delete")
    let { id } = req.params;
    let student = await Student.findByIdAndDelete(id);
    res.redirect("/")
})

//admission node
app.get("/admission", async (req, res) => {
    res.render("admission.ejs")
})
app.post("/admission", async (req, res) => {
    let { studentName, phoneNo, fatherName, motherName, address, id } = req.body;
    let student = new Student({
        studentName: studentName,
        phoneNo: phoneNo,
        fatherName: fatherName,
        motherName: motherName,
        address: address,
        id: id
    })
    let newstudent = await Student.create(student);
    res.redirect("/");
})

// payfee
app.get("/payfee", (req, res) => {
    res.render("fee.ejs")
})
app.post("/payfee", async (req, res) => {
    let { id, months, payment,date } = req.body;
    try {
        const student = await Student.findOne({ id: id });
        // console.log(student);
        if (!student) {
            res.send("Student is not found")
        } 
        // Update the fee for the specified month
        student.fees.set(months, true);
        await student.save();
        console.log(`Fee paid for ${months}`);
        res.redirect("/")
    } catch (error) {
        console.error(error.message);
    }

})

//listen port
const port = 3000;
app.listen(port, (req, res) => {
    console.log(`app is runing on port ${port}...`);
})