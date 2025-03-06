# **TODO App**

A simple TODO application with a **FastAPI** backend and a **Next.js** frontend.

---

## **Prerequisites**

- **Python 3.9+** (with pip)
- **Node.js 14+** (with npm or yarn)
- *(Optional)* **Virtual environment** support for Python

---

## **1. Cloning the Repository**

git clone https://github.com/yourusername/your-repo.git 
cd your-repo

---

## **2. Running the Backend**

### **2.1 Create and Activate a Virtual Environment**

cd backend python -m venv venv

- **Windows**:  
venv\Scripts\activate

- **macOS / Linux**:
- source venv/bin/activate

### **2.2 Install Dependencies**

pip install -r requirements.txt

### **2.3 Start the FastAPI Server**

uvicorn main:app --reload

The backend will run at [http://127.0.0.1:8000](http://127.0.0.1:8000).  
You can also view interactive API docs at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

---

## **3. Running the Frontend**

### **3.1 Install Dependencies**

Open a **new terminal** (or tab) in the frontend folder:

cd ../frontend npm install


### **3.2 Start the Next.js Development Server**

npm run dev


The frontend will run at [http://localhost:3000](http://localhost:3000).

---

## **4. Usage**

1. **Open the frontend** at [http://localhost:3000](http://localhost:3000).  
2. **Register** a new account or **log in** if you already have one (if authentication is implemented).  
3. **Create** tasks, **update** them, or **delete** them as needed.  
4. **Check** your backend logs and docs at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

---

## **5. Environment Variables (Optional)**

If you need different URLs in production or staging, you can use environment variables:

- **Backend**: In backend/.env, set DATABASE_URL or any other secrets.  
- **Frontend**: In frontend/.env.local, set NEXT_PUBLIC_API_URL to your FastAPI server URL, for example:

NEXT_PUBLIC_API_URL=https://my-fastapi-backend.onrailway.app


Then in your code:
js
fetch(${process.env.NEXT_PUBLIC_API_URL}/tasks/)

## **6. Additional Notes

**CORS**: Ensure your FastAPI app is configured to allow requests from http://localhost:3000.
**Database**: By default, this example uses SQLite. For production, consider PostgreSQL or another robust database.
**Deployment**:
Backend can be deployed on services like Railway, Heroku, or AWS.
Frontend can be deployed on Vercel or Netlify.

## **7. Contributing
1. Fork the repo and create a new branch.
2. Make your changes and test thoroughly.
3. Submit a pull request explaining your changes.

## **8. License
This project is licensed under the MIT License. Feel free to use and modify this code.

