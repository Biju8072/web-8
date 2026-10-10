import { useState } from "react";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([
    { id: 1, title: "Complete ReactJS lab record", done: false },
    { id: 2, title: "Revise database concepts", done: true },
    { id: 3, title: "Prepare for internal assessment", done: false }
  ]);

  const courses = [
    { name: "Web Technology", code: "CS201", progress: 80 },
    { name: "Database Management", code: "CS202", progress: 65 },
    { name: "Machine Learning", code: "CS203", progress: 72 },
    { name: "Computer Networks", code: "CS204", progress: 55 }
  ];

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(search.toLowerCase())
  );

  function addTask(e) {
    e.preventDefault();
    if (!task.trim()) return;

    setTasks([...tasks, {
      id: Date.now(),
      title: task.trim(),
      done: false
    }]);
    setTask("");
  }

  function toggleTask(id) {
    setTasks(tasks.map(item =>
      item.id === id ? { ...item, done: !item.done } : item
    ));
  }

  function deleteTask(id) {
    setTasks(tasks.filter(item => item.id !== id));
  }

  const completedTasks = tasks.filter(item => item.done).length;
  const completionPercentage = tasks.length
    ? Math.round((completedTasks / tasks.length) * 100)
    : 0;

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <nav className="navbar">
        <h2>EduDashboard</h2>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#courses">Courses</a>
          <a href="#tasks">Tasks</a>
          <a href="#profile">Profile</a>
        </div>
        <div className="nav-actions">
          <input
            className="search-input"
            placeholder="Search courses..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="theme-btn"
            onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </nav>

      <main className="dashboard">
        <section className="welcome-section" id="home">
          <div>
            <p className="eyebrow">STUDENT OVERVIEW</p>
            <h1>Welcome back, Biju Thomas!</h1>
            <p className="welcome-text">
              Keep learning, stay organized, and achieve your goals.
            </p>
          </div>
          <div className="date-card">
            <span>🎓</span>
            <div>
              <strong>Academic Dashboard</strong>
              <p>Your progress at a glance</p>
            </div>
          </div>
        </section>

        <section className="stats-grid">
          {[
            { title: "Total Courses", value: "4", icon: "📚", color: "#e7e9ff" },
            { title: "Assignments", value: "12", icon: "📝", color: "#ffedd5" },
            { title: "Attendance", value: "92%", icon: "📅", color: "#dcfce7" },
            { title: "Current CGPA", value: "8.7", icon: "🏆", color: "#fce7f3" }
          ].map(stat => (
            <div className="stat-card" key={stat.title}
              style={{ "--card-color": stat.color }}>
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <p>{stat.title}</p>
                <h3>{stat.value}</h3>
              </div>
            </div>
          ))}
        </section>

        <section className="content-grid">
          <div className="panel" id="courses">
            <div className="section-heading">
              <div>
                <p className="eyebrow">YOUR LEARNING</p>
                <h2>My Courses</h2>
              </div>
              <span className="count-badge">
                {filteredCourses.length} courses
              </span>
            </div>

            <div className="course-list">
              {filteredCourses.map(course => (
                <div className="course-item" key={course.code}>
                  <div className="course-icon">📘</div>
                  <div className="course-info">
                    <h3>{course.name}</h3>
                    <p>{course.code}</p>
                    <div className="progress-track">
                      <div className="progress-fill"
                        style={{ width: `${course.progress}%` }} />
                    </div>
                    <span className="progress-label">
                      {course.progress}% completed
                    </span>
                  </div>
                </div>
              ))}
              {filteredCourses.length === 0 && (
                <p className="empty-message">No matching courses found.</p>
              )}
            </div>
          </div>

          <div className="panel" id="tasks">
            <div className="section-heading">
              <div>
                <p className="eyebrow">STAY ORGANIZED</p>
                <h2>My Tasks</h2>
              </div>
              <span className="count-badge">
                {completedTasks}/{tasks.length} done
              </span>
            </div>

            <form className="task-form" onSubmit={addTask}>
              <input
                placeholder="Enter a new task..."
                value={task}
                onChange={e => setTask(e.target.value)}
              />
              <button className="add-btn" type="submit">+ Add</button>
            </form>

            <div className="task-list">
              {tasks.map(item => (
                <div className={`task-item ${item.done ? "completed" : ""}`}
                  key={item.id}>
                  <label className="task-label">
                    <input type="checkbox" checked={item.done}
                      onChange={() => toggleTask(item.id)} />
                    <span>{item.title}</span>
                  </label>
                  <button className="delete-btn" type="button"
                    onClick={() => deleteTask(item.id)}>×</button>
                </div>
              ))}
              {tasks.length === 0 && (
                <p className="empty-message">No tasks yet. Add your first task!</p>
              )}
            </div>

            <div className="task-summary">
              <span>Task completion</span>
              <strong>{completionPercentage}%</strong>
            </div>
            <div className="progress-track summary-track">
              <div className="progress-fill"
                style={{ width: `${completionPercentage}%` }} />
            </div>
          </div>
        </section>

        <footer className="footer" id="profile">
          <p>©️ 2026 EduDashboard · Designed with ReactJS</p>
          <p>Learn today. Lead tomorrow.</p>
        </footer>
      </main>
    </div>
  );
}

export default App;