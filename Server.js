const express=require('express');
const dotenv=require('dotenv');
dotenv.config();
const respone=require("./responeMessage.json");
const connectDB = require('./config/db');
const userRouter=require("./router/userRouter");
const noteRouter=require("./router/noteRouter");
const app=express();
const swaggerUI=require("swagger-ui-express");
const swaggerJsDoc=require("swagger-jsdoc");
connectDB();
app.use(express.json());

const options={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"My Notes App Project!",
            version:"1.0.0",
            description:"My Notes App Information API"
        },
        components: {
            securitySchemes: {
              jwt: {
                type: "http",
                scheme: "bearer",
                in: "header",
                bearerFormat: "JWT"
              },
            }
          }
          ,
          security: [{
            jwt: []
          }],
        servers:[
            {
                url:"http://localhost:5000",
            },
        ],
    },
    apis:["./router/*.js"],
    
};

const docs=swaggerJsDoc(options);

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(docs));
app.use('/api/user',userRouter);
app.use('/api/note',noteRouter);
const PORT=process.env.PORT|| 5000
app.listen(PORT,console.log(respone.server.Running ,PORT))