# Feature Flag Demo

This project demonstrates how **Feature Flags** work in modern web development using **LaunchDarkly**.

Feature flags allow developers to **enable or disable features without deploying new code**.
This technique is widely used in production systems for safer deployments and experimentation.

---

# Concept

Traditional deployment:

```
Deploy code → feature becomes available
```

Using feature flags:

```
Deploy code → control feature using flag
```

Example flag:

```
enable_new_ui = true / false
```

When the flag is:

```
false → Old UI
true  → New UI
```

This allows teams to control features **in real-time from a dashboard**.

---

# Tech Stack

Frontend

* React (Vite)

Backend

* Node.js
* Express

Feature Flag Service

* LaunchDarkly

Infrastructure

* Docker
* Docker Compose

---

# Project Structure

```
feature-flag-demo
│
├── backend
│   ├── Dockerfile
│   ├── server.js
│
├── frontend
│   ├── Dockerfile
│   └── src
│       ├── App.jsx
│       └── main.jsx
│
├── docker-compose.yml
└── README.md
```

---

# How Feature Flags Work

1. The frontend requests the current flag state from the backend.

2. The backend queries LaunchDarkly to evaluate the feature flag.

3. LaunchDarkly returns the flag value.

4. The frontend changes UI based on the flag.

Architecture flow:

```
React Frontend
      |
      v
Node.js Backend
      |
      v
LaunchDarkly Cloud
```

---

# Setup LaunchDarkly

Create a free account on LaunchDarkly.

Create a project and add a feature flag:

```
enable_new_ui
```

Type:

```
boolean
```

Then copy the **Server-side SDK Key**.

---

# Configure Environment Variable

Add your LaunchDarkly SDK key inside `docker-compose.yml`:

```
backend:
  build: ./backend
  ports:
    - "4000:4000"
  environment:
    - LD_SDK_KEY=your_launchdarkly_sdk_key
```

---

# Run the Project

From the root directory run:

```
docker compose up --build
```

Open the application:

User page

```
http://localhost:5173
```

---

# Demo

Initial state:

```
enable_new_ui = false
```

User page will display:

```
Old UI
```

Go to the LaunchDarkly dashboard and toggle:

```
enable_new_ui → true
```

Refresh the page.

The UI will change to:

```
New UI
```

This demonstrates how teams can release features without redeploying code.

---

# Learning Outcome

This demo shows how modern development teams:

* reduce deployment risk
* release features safely
* experiment with product features
* control production behavior dynamically
