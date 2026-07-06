const express = require('express');
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 3000;

app.use(cors()); 
app.use(express.json());

const prisma = new PrismaClient();

app.use(express.json());

type Task = {
    id: number;
    text: string;
    completed: boolean;
};

const authenticateToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;    
    if (!authHeader) {        
        return res.status(401).json({           
            message: "No token provided"        
        });    
    }    
    
    const token = authHeader.split(" ")[1];    
    try {        
        const decoded = jwt.verify(token, "secret_key");        
        req.user = decoded; 
        next(); 
    } catch (error) {        
        return res.status(403).json({            
            message: "Invalid or expired token"        
        });    
    } 
};

app.get('/', (req:any, res:any) => {
    res.send('Backend is running!')
});

app.get("/tasks", async (req: any, res: any) => {
    const tasksFromDatabase = await prisma.task.findMany();
    res.json(tasksFromDatabase);
});
 
app.post("/tasks", authenticateToken, async (req: any, res: any) => {    

    const { text } = req.body || {};    
    if (!text || text.trim() === "") {        
        return res.status(400).json({            
            message: "Task text is required"        
        });    
    }    
    const newTask = await prisma.task.create({        
        data: {            
            text: text,            
            completed: false        
        }    
    });    
    res.status(201).json(newTask); 
});

app.put("/tasks/:id", authenticateToken, async (req: any, res: any) => {    
    const id = Number(req.params.id);    
    const { text, completed } = req.body;
    const task = await prisma.task.findUnique({
        where: { id : id }
    });

    if (!task) {        
        return res.status(404).json({            
            message: "Task not found"        
        });    
    }    

    const dataToUpdate: any = {};
    if (text !== undefined) {        
        dataToUpdate.text = text;    
    }    
    if (completed !== undefined) {        
        dataToUpdate.completed = completed;   
    }

    const updatedTask = await prisma.task.update({
        where: { id : id },
        data: dataToUpdate
    });

   const tasksDB = await prisma.task.findMany();

    res.json({
        message: 'Task updated successfully',
        tasks: tasksDB
    }); 
});

app.delete('/tasks/:id', authenticateToken, async (req:any, res:any) => {
    const id = Number(req.params.id);
    const task = await prisma.task.findUnique({
        where: { id }
    });

    if(!task) {
        return res.status(404).json({ 
            message: 'Task not found' 
        });
    }

    await prisma.task.delete({
        where: { id }
    });

    const tasksDB = await prisma.task.findMany();

    res.json({
        message: 'Task deleted successfully',
        tasks: tasksDB
    });
});

app.post("/login", async(req: any, res: any) => {   
    const { email, password } = req.body || {};
     
    const user = await prisma.user.findUnique({
        where: { email: email }
    });

    if (!user) {
        return res.status(401).json({        
            message: "Invalid credentials"    
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
        const token = jwt.sign(
            { email: user.email },
            "secret_key",
            { expiresIn: "1h" }
        );        
        return res.json({            
            message: "Login successful",            
            token: token        
        });    
    }    

    res.status(401).json({        
        message: "Invalid credentials"    
    }); 
});

app.post("/register", async (req: any, res: any) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword
            }
        });

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error instanceof Error ? error.message : String(error) });
    }
});

app.get("/profile", (req: any, res: any) => {    
       
    const authHeader = req.headers.authorization;    
    if (!authHeader) {        
        return res.status(401).json({           
            message: "No token provided"        
        });    
    }    

    const token = authHeader.split(" ")[1];    
    try {        
          
        const decoded = jwt.verify(token, "secret_key");        
        res.json({            
            message: "Protected profile data",            
            user: decoded        
        });    
    } catch (error) {        
        res.status(401).json({            
            message: "Invalid token"        
        });    
    } 
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});