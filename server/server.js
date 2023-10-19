import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app= express();
app.use(cors(
    {
        origin:["http://localhost:3000"],
        methods:["POST","GET","PUT","DELETE"],
        credentials: true
    }
));
app.use(cookieParser());
app.use(express.json());

// Database connection
const con = mysql.createConnection({
    host:"localhost",
    port:"3308",
    user:"root",
    password:"",
    database:"election"

});

con.connect(function(err){
    if (err) {
        console.log("Error in Connection",err);
    }else{
        console.log("Connected");
    }
});

const verifyUser = (req,res,next)=>{
    const token = req.cookies.token;
    if (!token) {
        return res.json({Error:"You are no Authenticated"})
    }else{
        jwt.verify(token,"jwt-secret-key",(err,decode)=>{
            if (err) return res.json({Error:"Token wrong"});
            next();
        })
    }
}

app.get('/dashboard',verifyUser,(req,res)=>{
    return res.json({Status:"Success"})
})


// Login API
app.post('/login',(req,res)=>{
    const sql="SELECT * FROM admin WHERE username=? AND password=?";
    con.query(sql,[req.body.email,req.body.password],(err,result)=>{
        if (err) return res.json({Error:"Error in Server"});
        if (result.length>0) {
            const id = result[0].id;
            const token = jwt.sign({id},"jwt-secret-key",{expiresIn:'1d'});
            res.cookie('token',token);
            return res.json({Status:"Success"});
        }else{
            return res.json({Status:"Error"}); 
        }
    })
});

app.get('/logout',(req,res)=>{
   res.clearCookie('token');
   return res.json({Status:"Sucess"})
});

// Insert API
app.post('/create', (req, res) => {
    const sql = "INSERT INTO VoterInformation (`Full Name`, `DOB`, `Email`, `Age`, `Education Level`, `Gender`, `Current City`, `Province`, `District`, `Polling Division`, `Polling Station`, `Current Position of the Job`, `Name of the Institute`, `Experience`, `Current Salary`, `Position Type`, `NIC`,`FamName`,`FamPollingStation`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)";
    const values = [
        req.body.fullName,
        req.body.dob,
        req.body.email,
        req.body.age,
        req.body.eduLevel,
        req.body.gender,
        req.body.currentCity,
        req.body.province,
        req.body.district,
        req.body.pollingDivision,
        req.body.pollingStation,
        req.body.currentPosition,
        req.body.institutionName,
        req.body.experience,
        req.body.currentSalary,
        req.body.positionType,
        req.body.nic,
        req.body.famName,
        req.body.famStation
    ];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error('Database Error:', err);
            return res.json({ Status: "Error", Error: "Error in Database", DatabaseError: err.message });
        } else {
            return res.json({ Status: "Success" });
        }
    });
});

app.get('/getEmployees',(req,res)=>{
    const sql="SELECT * FROM VoterInformation";
    con.query(sql,(err,result)=>{
        if (err) return res.json({Error:"Get employee error in sql"});
        return res.json({Status:"Success",Result:result});
    })
})


app.get('/getEmployees/:id',(req,res)=>{
    const id=req.params.id;
    const sql="SELECT * FROM VoterInformation WHERE id = ?";
    con.query(sql,[id],(err,result)=>{
        if (err) return res.json({Error:"Get employee error in sql"});
        return res.json({Status:"Success",Result:result});
    })
})

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const sql = `
      UPDATE VoterInformation 
      SET 
        \`Full Name\`=?, 
        DOB=?, 
        Email=?, 
        Age=?, 
        \`Education Level\`=?, 
        Gender=?, 
        \`Current City\`=?, 
        Province=?, 
        District=?, 
        \`Polling Division\`=?, 
        \`Polling Station\`=?, 
        \`Current Position of the Job\`=?, 
        \`Name of the Institute\`=?, 
        Experience=?, 
        \`Current Salary\`=?, 
        \`Position Type\`=?, 
        NIC=?,
        FamName=?,
        FamPollingStation=?
      WHERE id = ?`;

    const values = [
      req.body.fullName,
      req.body.dob,
      req.body.email,
      req.body.age,
      req.body.eduLevel,
      req.body.gender,
      req.body.currentCity,
      req.body.province,
      req.body.district,
      req.body.pollingDivision,
      req.body.pollingStation,
      req.body.currentPosition,
      req.body.institutionName,
      req.body.experience,
      req.body.currentSalary,
      req.body.positionType,
      req.body.nic,
      req.body.famName,
      req.body.famStation,
      id // Place id at the end of the values array
    ];

    con.query(sql, values, (err, result) => {
      if (err) {
        console.error('SQL Error:', err); // Log the error
        return res.json({ Error: err.message }); // Send the SQL error message in the response
      }
      return res.json({ Status: "Success", Result: result });
    });
});


  app.delete('/delete/:id',(req,res)=>{
    const id=req.params.id;
    const sql="DELETE FROM VoterInformation WHERE id = ?";
    con.query(sql,[id],(err,result)=>{
        if (err) return res.json({Error:"Get employee error in sql"});
        return res.json({Status:"Success",Result:result});
    })
})
  

// Server starting
app.listen(8081,()=>{
    console.log("Running");
});