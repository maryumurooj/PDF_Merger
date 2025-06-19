# 📄 PDF Merger Tool (React + .NET Core)

A lightweight web-based tool that allows users to **upload multiple PDF files** and merge them into a **single combined PDF**, all done locally using a .NET Core backend and a React frontend.

---

## 🎬 Demo

![Watch the Demo](https://drive.google.com/file/d/1-vZx2zjosBEDpqCewY7zYb_p7nEJdVTp/view?usp=sharing)  
<!-- Replace the line above with actual video embedding if hosting on YouTube or Loom -->
[📺 Watch Video Demo](https://drive.google.com/file/d/1-vZx2zjosBEDpqCewY7zYb_p7nEJdVTp/view?usp=sharing) <!-- Replace `#` with your video link -->

---

## 🛠 Tech Stack

- **Frontend:** React (Vite), Axios, Custom CSS
- **Backend:** ASP.NET Core Web API (.NET 8)
- **PDF Library:** [PdfSharpCore](https://github.com/ststeiger/PdfSharpCore)

---

## ✨ Features

- Upload 2 or more PDF files
- Visual display of selected PDFs (name + size)
- Merging status indicator (loader while processing)
- Download or view the final merged PDF
- Simple, clean, and intuitive UI



## 🚀 Getting Started

### 🔗 Backend Setup (ASP.NET Core)

1. **Clone the repo & navigate:**
   ```bash
   cd PdfMergeAPI
```

2. **Install dependencies:**

   ```bash
   dotnet add package PdfSharpCore
   ```

3. **Run the API:**

   ```bash
   dotnet run
   ```

### 💻 Frontend Setup (React)

1. **Navigate to frontend:**

   ```bash
   cd pdf-merger-frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the frontend:**

   ```bash
   npm run dev
   ```

> Make sure your backend is running on `http://localhost:5000` or update the API URL in your React app accordingly.



## 📂 Folder Structure

```
root/
├── PdfMergeAPI/               # .NET Core Web API (backend)
│   └── Controllers/
│       └── PdfMergeController.cs
├── pdf-merger-frontend/       # React frontend
│   ├── src/
│   │   ├── App.jsx
│   │   └── App.css
│   └── index.html
```

---

## 📄 Sample Output

Once merged, the tool provides:

* ✅ Download button for `merged.pdf`
* 🔍 Preview link (opens merged PDF in a new tab)

---

## 📹 Demo Video

You can [watch the full video demo here][(#)](https://drive.google.com/file/d/1-vZx2zjosBEDpqCewY7zYb_p7nEJdVTp/view?usp=sharing) 
---

## 🙌 Credits

* [PdfSharpCore](https://github.com/ststeiger/PdfSharpCore) for PDF merging
* [React](https://reactjs.org/)
* [ASP.NET Core](https://dotnet.microsoft.com/)

---





