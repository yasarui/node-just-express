const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const mongoose = require("mongoose");

const userOne = {
    name:"Yasar",
    email:"yasararafatui@gmail.com",
    password:"P@ssW0rd123"
}

beforeEach(async ()=>{
   await User.deleteMany();
   const response = await new User(userOne).save();
})

test('Should create a new User',async () => {
   const response = await request(app).post('/api/users').send({
        "name":"Yasar",
        "email":"yasararafat88@gmail.com",
        "password":"P@ssw0rd123"
   }).expect(201);

   const user = await User.findById(response.body.user._id);
   expect(user).not.toBeNull();
   expect(response.body).toMatchObject({
       user:{
        "name":"Yasar",
        "email":"yasararafat88@gmail.com"           
       }
   })
   expect(user.password).not.toBe('P@ssw0rd123');
});

test("Should Login",async ()=>{
    // console.log("Asmaa Yasar");
    // const response = await request(app).post('/api/users/login').send({
    //     email:"yasararafatui@gmail.com",
    //     password:"P@ssW0rd123"
    // }).expect(200);
    // console.log("Asmaa Yasar");
    await request(app).post("/api/users/login").send({
         "email": "yasararafatui@gmail.com",
         "password": "P@ssw0rd123"
    }).expect(200);
})
