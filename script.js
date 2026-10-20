
function getStudents() {
  return JSON.parse(localStorage.getItem("students")) || [];
}

function saveStudents(students) {
  localStorage.setItem("students", JSON.stringify(students));
}

function addStudent() {
  const roll = document.getElementById("rollNumber").value.trim();
  const name = document.getElementById("studentName").value.trim();
  const dept = document.getElementById("department").value;
  const message = document.getElementById("formMessage");

  if (!roll || !name || !dept) {
    message.textContent = "Please fill in all fields.";
    return false;
  }

  const students = getStudents();

  const exists = students.some(
    student => student.rollNumber.toLowerCase() === roll.toLowerCase()
  );

  if (exists) {
    message.textContent = "This roll number already exists.";
    message.style.color = "red";
    return false;
  }

  students.push({
    rollNumber: roll,
    name: name,
    department: dept
  });

  saveStudents(students);

  message.textContent = "Student added successfully!";
  message.style.color = "green";
  document.getElementById("studentForm").reset();

  return false;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, function (character) {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    return entities[character];
  });
}

function displayStudents() {
  const tableBody = document.getElementById("studentTableBody");
  const emptyMessage = document.getElementById("emptyMessage");

  if (!tableBody) return;

  const students = getStudents();
  tableBody.innerHTML = "";

  if (emptyMessage) {
    emptyMessage.style.display = students.length ? "none" : "block";
  }

  students.forEach(function (student, index) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${escapeHtml(student.rollNumber)}</td>
      <td>${escapeHtml(student.name)}</td>
      <td>${escapeHtml(student.department)}</td>
      <td><button type="button" onclick="deleteStudent(${index})">Delete</button></td>
    `;

    tableBody.appendChild(row);
  });
}

function deleteStudent(index) {
  const students = getStudents();

  if (index < 0 || index >= students.length) return;

  if (confirm("Are you sure you want to delete this student?")) {
    students.splice(index, 1);
    saveStudents(students);
    displayStudents();
    updateStudentCount();
  }
}

function updateStudentCount() {
  const count = document.getElementById("studentCount");

  if (count) {
    count.textContent = getStudents().length;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  displayStudents();
  updateStudentCount();
});
