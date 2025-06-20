# 🛠️ Simple CLI App

A minimal Node.js console application for managing recurring tasks with frequency (daily / weekly / monthly).

---

## 🚀 How to Use

1. Install dependencies:

```bash
npm install
```

---

## 📦 Main Commands

### ➕ 1. Add a New Task

```bash
npm run start -- add name=test freq=daily
```

### ✅ 2. Mark Task as Done

```bash
npm run start -- done id=<task_id>
```

### 📋 3. Show All Tasks

```bash
npm run start -- list
```

### 📊 4. Show Task Statistics

```bash
npm run start -- stats id=<task_id>
```

### ✏️ 5. Update Task Name or Frequency

```bash
npm run start -- update name=<new_name> freq=<daily|weekly|monthly>
```

> Name or freq is optional

### ❌ 6. Delete Task by ID

```bash
npm run start -- delete id=<task_id>
```

---

## 🗓 Frequency Options

- `daily` – once per day
- `weekly` – once per week
- `monthly` – once per month

---

## 📁 Example

```bash
npm run start -- add name="Drink water" freq=daily
npm run start -- done id=12345678
npm run start -- stats id=12345678
```

---

> ℹ️ You can change how "today" is calculated using the "SKIP_DAYS_COUNT" variable in ".env".

---
