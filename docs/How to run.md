# 🧾 Step by Step Instructions

---

## 🧰 Prerequisites

Before running the project, ensure you have the following installed:

- ✅ [Docker Desktop](https://www.docker.com/products/docker-desktop)
- ✅ [Visual Studio Code (VSCode)](https://code.visualstudio.com/)
- ✅ [Git](https://git-scm.com/) (optional, for version control)

---

## 🚀 How to Run the Project

### 1. Open the Project in VSCode

- Launch **Visual Studio Code**
- Go to `File` → `Open Folder...` and select the root directory of this project

### 2. Start Docker Containers

This command will:

- Build Docker images (if needed)
- Install dependencies
- Apply Prisma migrations and seed the database
- Start all services (frontend, backend, and database)
- Run the below command in the **code terminal**

```bash
docker-compose up --build
```

## 👥 Switching Roles (Firm, Vendor, Admin)

This project uses **mock JWT tokens** on the frontend to simulate different user roles during development.
Please have a look at **Mock Data Overview** file for a clear context.

---

### 🔁 How to Switch Users

1. **Open the mock login hook file in the code directory:**

   ```ts
   frontend / src / hooks / useLogin.ts;
   ```

2. **FIND THIS LINE** ``const USER = user1;` // Change this to user1, user2, user3 etc.

3. Rebuild all containers. Run the command: `./rebuild-all.sh`

## 🛑 Stopping and Cleaning Up the Project

When you're done working with the project, you can gracefully stop or fully clean up all Docker services.

---

### 🔻 Stop All Running Containers

This keeps the containers and data intact:

```bash
docker-compose stop
```

## ♻️ Resetting and Reseeding the Database

To drop all tables, reapply Prisma migrations, and run the seed script from scratch:

### 🔄 Run the Reset Script

```bash
./reset-db.sh
```
