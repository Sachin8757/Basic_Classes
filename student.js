const mongoose=require('mongoose');
main().then(()=>{
    console.log("connection successfull");
}).catch((err)=>console.log(err));
async function main() {
    await mongoose.connect("mongodb+srv://sachin:8757887103@shopdata.shpwbu2.mongodb.net/?retryWrites=true&w=majority&appName=student");
    // await mongoose.connect("mongodb://127.0.0.1:27017/Student");
}
const Student=new mongoose.Schema({
    studentName:String,
    phoneNo:{
        type:String,
        require:true,
    },
    admissionDate:String,
    fatherName:String,
    motherName:String,
    address:String,
    money:String,
    pic:String,
    fees: {
        type: Map,
        of: Boolean,
        default: {
            January: false,
            February: false,
            March: false,
            April: false,
            May: false,
            June: false,
            July: false,
            August: false,
            September: false,
            October: false,
            November: false,
            December: false,
        },
    },
    id:String
})
module.exports=mongoose.model("Student",Student);
