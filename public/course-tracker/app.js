const storageKey = "ms-econ-course-tracker-v1";
let isFirstRender = true;

const defaultCourses = [
  {
    semester: "Fall 2025",
    code: "ECON 680",
    name: "Financial Economics",
    type: "elective",
    credits: 3,
    grade: "A",
    status: "Complete",
    locked: true,
  },
  {
    semester: "Fall 2025",
    code: "ECON 611",
    name: "Foundations of Macroeconomic Theory",
    type: "core",
    credits: 3,
    grade: "A",
    status: "Complete",
    locked: true,
  },
  {
    semester: "Fall 2025",
    code: "ECON 663",
    name: "International Transfer Pricing",
    type: "elective",
    credits: 3,
    grade: "B",
    status: "Complete",
    locked: true,
  },
  {
    semester: "Fall 2025",
    code: "ECMT 674",
    name: "Economic Forecasting",
    type: "core",
    credits: 3,
    grade: "A",
    status: "Complete",
    locked: true,
  },
  {
    semester: "Spring 2026",
    code: "ECON 607",
    name: "Foundations of Microeconomic Theory",
    type: "core",
    credits: 3,
    grade: "B",
    status: "Complete",
    locked: true,
  },
  {
    semester: "Spring 2026",
    code: "ECMT 673",
    name: "Economic Analytics",
    type: "core",
    credits: 3,
    grade: "A",
    status: "Complete",
    locked: true,
  },
  {
    semester: "Spring 2026",
    code: "ECON 471",
    name: "Data Science for Future Decision Makers",
    type: "support",
    credits: 3,
    grade: "A",
    status: "Complete",
    locked: true,
  },
  {
    semester: "Spring 2026",
    code: "ECON 689",
    name: "International Macroeconomics",
    type: "support",
    credits: 3,
    grade: "A",
    status: "Complete",
    locked: true,
  },
  {
    semester: "Summer 2026",
    code: "ECON 684",
    name: "Professional Internship",
    type: "support",
    credits: 6,
    grade: "",
    status: "Approved",
  },
  {
    semester: "Fall 2026",
    code: "ECON 675",
    name: "Capstone",
    type: "core",
    credits: 3,
    grade: "",
    status: "Planned",
  },
  {
    semester: "Fall 2026",
    code: "STAT 656",
    name: "Applied Analytics",
    type: "support",
    credits: 3,
    grade: "",
    status: "Planned",
  },
];

const defaultTasks = [
  { text: "Fall 2025 final grades verified: ECMT 674 A, ECON 611 A, ECON 663 B, ECON 680 A", done: true, lane: "Done" },
  { text: "Spring 2026 final grades verified: ECMT 673 A, ECON 471 A, ECON 607 B, ECON 689 A", done: true, lane: "Done" },
  { text: "ECON 684 internship approval received for 6 credits", done: true, lane: "Done" },
  { text: "Ask for the ECON 684 syllabus and 6-credit deliverables", done: false, lane: "Now" },
  { text: "Confirm whether ECON 675 presentations can be completed remotely", done: false, lane: "Now" },
  { text: "Register for STAT 656 as the final Fall 2026 supporting course", done: false, lane: "Planning" },
  { text: "Prepare capstone topic ideas for ECON 675", done: false, lane: "Planning" },
  { text: "Save syllabi and major assignments in one folder", done: true, lane: "Done" },
];

const gradePoints = {
  A: 4,
  B: 3,
  C: 2,
  D: 1,
  F: 0,
};

const finalizedSpring2026Grades = {
  "ECON 607": "B",
  "ECMT 673": "A",
  "ECON 471": "A",
  "ECON 689": "A",
};

const requirements = {
  total: 36,
  core: 15,
  elective: 6,
  support: 15,
};

let state = loadState();
saveState();

function loadState() {
  const saved = localStorage.getItem(storageKey);
  if (!saved) {
    return normalizeState(structuredClone({ courses: defaultCourses, tasks: defaultTasks }));
  }

  try {
    return normalizeState(JSON.parse(saved));
  } catch {
    return normalizeState(structuredClone({ courses: defaultCourses, tasks: defaultTasks }));
  }
}

function normalizeState(nextState) {
  nextState.courses = nextState.courses
    .map((course) => {
      let normalized = course;

      if (course.code === "ECON 684") {
        normalized = { ...course, name: "Professional Internship", type: "support", credits: 6, status: course.grade ? course.status : "Approved" };
      }

      if (course.code === "ECON 685" && course.semester === "Summer 2026") {
        normalized = { ...course, code: "ECON 684", name: "Professional Internship", type: "support", credits: 6, status: course.grade ? course.status : "Approved" };
      }

      if (course.code === "ECON 675") {
        normalized = { ...course, name: "Capstone", type: "core", credits: 3 };
      }

      if (course.code === "ECON 471") {
        normalized = { ...course, name: "Data Science for Future Decision Makers", type: "support", credits: 3 };
      }

      if (course.code === "ECON 689") {
        normalized = { ...course, name: "International Macroeconomics", type: "support", credits: 3 };
      }

      if (course.code === "ECON 685" && course.semester === "Fall 2026") {
        normalized = { ...course, code: "ECON 675", name: "Capstone", type: "core", credits: 3 };
      }

      if (course.code === "Support 1") {
        normalized = { ...course, code: "STAT 656", name: "Applied Analytics", type: "support", credits: 3 };
      }

      if (normalized.semester === "Spring 2026" && finalizedSpring2026Grades[normalized.code]) {
        return { ...normalized, grade: finalizedSpring2026Grades[normalized.code], status: "Complete", locked: true };
      }

      if (normalized.grade && normalized.status === "Complete") {
        return { ...normalized, status: "Complete", locked: true };
      }

      return normalized;
    })
    .filter((course) => course.code !== "Support 2");

  nextState.tasks = nextState.tasks.map((task) => {
    if (task.text === "Confirm ECON 684 internship approval and registration") {
      return { ...task, text: "ECON 684 internship approval received for 6 credits", done: true, lane: "Done" };
    }

    if (task.text === "Confirm ECON 685 internship approval and 6-credit registration") {
      return { ...task, text: "ECON 684 internship approval received for 6 credits", done: true, lane: "Done" };
    }

    if (task.text === "Confirm ECON 684 internship approval and 6-credit registration") {
      return { ...task, text: "ECON 684 internship approval received for 6 credits", done: true, lane: "Done" };
    }

    if (task.text === "Ask for the ECON 684 syllabus and 6-credit deliverables after approval") {
      return { ...task, text: "Ask for the ECON 684 syllabus and 6-credit deliverables" };
    }

    if (task.text === "Enter final Spring 2026 grades when posted") {
      return {
        ...task,
        text: "Spring 2026 final grades verified: ECMT 673 A, ECON 471 A, ECON 607 B, ECON 689 A",
        done: true,
        lane: "Done",
      };
    }

    if (task.text === "Prepare capstone topic ideas for ECON 675") {
      return { ...task, text: "Prepare capstone topic ideas for ECON 675" };
    }

    if (task.text === "Prepare capstone topic ideas for ECON 685") {
      return { ...task, text: "Prepare capstone topic ideas for ECON 675" };
    }

    if (task.text === "Choose Fall 2026 supporting courses") {
      return { ...task, text: "Register for STAT 656 as the final Fall 2026 supporting course" };
    }

    if (task.text === "Choose the Fall 2026 supporting course") {
      return { ...task, text: "Register for STAT 656 as the final Fall 2026 supporting course" };
    }

    return task;
  });

  [
    { text: "Fall 2025 final grades verified: ECMT 674 A, ECON 611 A, ECON 663 B, ECON 680 A", done: true, lane: "Done" },
    { text: "Spring 2026 final grades verified: ECMT 673 A, ECON 471 A, ECON 607 B, ECON 689 A", done: true, lane: "Done" },
    { text: "ECON 684 internship approval received for 6 credits", done: true, lane: "Done" },
    { text: "Ask for the ECON 684 syllabus and 6-credit deliverables", done: false, lane: "Now" },
    { text: "Confirm whether ECON 675 presentations can be completed remotely", done: false, lane: "Now" },
  ].forEach((task) => {
    if (!nextState.tasks.some((existing) => existing.text === task.text)) {
      nextState.tasks.push(task);
    }
  });

  return nextState;
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function completedCredits(course) {
  return course.grade ? course.credits : 0;
}

function gpaForCourses(courses) {
  const graded = courses.filter((course) => course.grade && gradePoints[course.grade] !== undefined);
  const quality = graded.reduce((sum, course) => sum + gradePoints[course.grade] * course.credits, 0);
  const credits = graded.reduce((sum, course) => sum + course.credits, 0);

  return {
    credits,
    value: credits ? quality / credits : 0,
  };
}

function setProgress(id, current, target) {
  const value = Math.min(100, Math.round((current / target) * 100));
  const el = document.getElementById(id);
  if (isFirstRender) {
    el.style.width = "0%";
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.width = `${value}%`;
    }));
  } else {
    el.style.width = `${value}%`;
  }
}

function renderMetrics() {
  const totals = state.courses.reduce(
    (acc, course) => {
      const credits = completedCredits(course);
      acc.total += credits;
      acc[course.type] += credits;
      return acc;
    },
    { total: 0, core: 0, elective: 0, support: 0 },
  );

  document.getElementById("totalCredits").textContent    = `${totals.total} / ${requirements.total}`;
  document.getElementById("coreCredits").textContent     = `${totals.core} / ${requirements.core}`;
  document.getElementById("electiveCredits").textContent = `${totals.elective} / ${requirements.elective}`;
  document.getElementById("supportCredits").textContent  = `${totals.support} / ${requirements.support}`;

  setProgress("totalProgress", totals.total, requirements.total);
  setProgress("coreProgress", totals.core, requirements.core);
  setProgress("electiveProgress", totals.elective, requirements.elective);
  setProgress("supportProgress", totals.support, requirements.support);
}

function renderGpa() {
  const graded = state.courses.filter((course) => course.grade && gradePoints[course.grade] !== undefined);
  const { value: gpa } = gpaForCourses(graded);
  const completedCourses = state.courses.filter((course) => course.status === "Complete" && course.grade);
  const semesterRows = ["Fall 2025", "Spring 2026"].map((semester) => {
    const { credits, value } = gpaForCourses(completedCourses.filter((course) => course.semester === semester));
    return { label: semester, credits, value };
  });
  const cumulative = gpaForCourses(completedCourses);

  document.getElementById("gpaValue").textContent = gpa.toFixed(2);
  document.getElementById("semesterGpas").innerHTML = [
    ...semesterRows,
    { label: "Current cumulative", credits: cumulative.credits, value: cumulative.value },
  ]
    .map((row) => `
      <div class="semester-gpa-row">
        <span>${row.label}</span>
        <strong>${row.credits ? row.value.toFixed(2) : "—"}</strong>
      </div>
    `)
    .join("");

  document.getElementById("gradeBars").innerHTML = ["A", "B", "C", "D", "F"]
    .map((grade) => {
      const count = graded.filter((course) => course.grade === grade).length;
      const width = graded.length ? Math.round((count / graded.length) * 100) : 0;
      return `
        <div class="grade-row">
          <strong>${grade}</strong>
          <div class="bar"><span style="width:${width}%"></span></div>
          <span>${count}</span>
        </div>
      `;
    })
    .join("");
}

function renderSemesterPlan() {
  const semesters = [...new Set(state.courses.map((course) => course.semester))];
  document.getElementById("semesterGrid").innerHTML = semesters
    .map((semester) => {
      const courses = state.courses.filter((course) => course.semester === semester);
      const credits = courses.reduce((sum, course) => sum + course.credits, 0);
      return `
        <div class="semester-column">
          <div class="semester-title">
            <span>${semester}</span>
            <span>${credits} credits</span>
          </div>
          ${courses
            .map((course) => {
              const index = state.courses.indexOf(course);
              return `
                <article class="course-card ${course.type}${course.locked ? " locked" : ""}">
                  <div class="course-title">
                    <strong>${course.code} <span class="type-badge ${course.type}">${codeForType(course.type)}</span></strong>
                    <span>${course.credits} cr</span>
                  </div>
                  <div>${course.name}</div>
                  <div class="course-meta">
                    <span>${course.status} · ${labelForType(course.type)}</span>
                    <select data-grade-index="${index}" aria-label="Grade for ${course.code}" ${course.locked ? "disabled" : ""}>
                      ${["", "A", "B", "C", "D", "F"]
                        .map((grade) => `<option value="${grade}" ${course.grade === grade ? "selected" : ""}>${grade || "Grade"}</option>`)
                        .join("")}
                    </select>
                  </div>
                </article>
              `;
            })
            .join("")}
        </div>
      `;
    })
    .join("");

  document.querySelectorAll("[data-grade-index]").forEach((select) => {
    select.addEventListener("change", (event) => {
      const index = Number(event.target.dataset.gradeIndex);
      if (state.courses[index].locked) return;
      state.courses[index].grade = event.target.value;
      saveState();
      renderAll();
    });
  });
}

function labelForType(type) {
  return {
    core: "Core",
    elective: "ECON/ECMT elective",
    support: "Supporting",
  }[type];
}

function codeForType(type) {
  return {
    core: "C",
    elective: "E",
    support: "SC",
  }[type];
}

function renderTasks() {
  document.getElementById("taskList").innerHTML = state.tasks
    .slice(0, 5)
    .map((task, index) => taskTemplate(task, index))
    .join("");

  const lanes = ["Now", "Planning", "Done"];
  document.getElementById("taskBoard").innerHTML = lanes
    .map((lane) => {
      const tasks = state.tasks.filter((task) => task.lane === lane);
      return `
        <div class="task-column">
          <h4>${lane}<span>${tasks.length}</span></h4>
          <div class="task-list">
            ${tasks.map((task) => taskTemplate(task, state.tasks.indexOf(task))).join("")}
          </div>
        </div>
      `;
    })
    .join("");

  document.querySelectorAll("[data-task-check]").forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      const index = Number(event.target.dataset.taskCheck);
      state.tasks[index].done = event.target.checked;
      state.tasks[index].lane = event.target.checked ? "Done" : "Now";
      saveState();
      renderTasks();
    });
  });

  document.querySelectorAll("[data-task-text]").forEach((input) => {
    input.addEventListener("change", (event) => {
      const index = Number(event.target.dataset.taskText);
      state.tasks[index].text = event.target.value.trim() || "Untitled task";
      saveState();
      renderTasks();
    });
  });
}

function taskTemplate(task, index) {
  return `
    <label class="task-item">
      <input type="checkbox" data-task-check="${index}" ${task.done ? "checked" : ""}>
      <textarea data-task-text="${index}" aria-label="Task text">${escapeHtml(task.text)}</textarea>
    </label>
  `;
}

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function renderAll() {
  renderMetrics();
  renderGpa();
  renderSemesterPlan();
  renderTasks();
}

document.getElementById("addTask").addEventListener("click", () => {
  state.tasks.unshift({ text: "New task", done: false, lane: "Now" });
  saveState();
  renderTasks();
});

document.getElementById("resetData").addEventListener("click", () => {
  localStorage.removeItem(storageKey);
  state = loadState();
  saveState();
  renderAll();
});

renderAll();
isFirstRender = false;

// Reveal panels as they scroll into view
const panelObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      panelObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(".panel").forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.05}s`;
  panelObserver.observe(el);
});
