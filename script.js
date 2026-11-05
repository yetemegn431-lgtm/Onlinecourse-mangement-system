// ==========================================
// 1. VIDEO & PDF TAB SWITCHER (Course Player)
// ==========================================
function switchTab(type) {
  const videoBox = document.getElementById('video-box');
  const pdfBox = document.getElementById('pdf-box');
  const btnVideo = document.getElementById('btn-video');
  const btnPdf = document.getElementById('btn-pdf');

  if (videoBox && pdfBox) {
    if (type === 'video') {
      videoBox.style.display = 'block';
      pdfBox.style.display = 'none';
      if (btnVideo) btnVideo.classList.add('active-tab');
      if (btnPdf) btnPdf.classList.remove('active-tab');
    } else {
      videoBox.style.display = 'none';
      pdfBox.style.display = 'block';
      if (btnPdf) btnPdf.classList.remove('active-tab');
      if (btnVideo) btnVideo.classList.remove('active-tab');
    }
  }
}

function changeLesson(title, videoSrc, pdfSrc, element) {
  const lessonTitle = document.getElementById('lesson-title');
  if (lessonTitle) lessonTitle.innerText = title;

  const player = document.getElementById('video-player');
  const source = document.getElementById('video-source');
  if (player && source) {
    source.src = videoSrc;
    player.load();
    player.play();
  }

  const pdfPlayer = document.getElementById('pdf-player');
  if (pdfPlayer) pdfPlayer.src = pdfSrc;

  const items = document.querySelectorAll('.lesson-item');
  items.forEach(item => item.classList.remove('active'));
  if (element) element.classList.add('active');
}

// ==========================================
// 2. AUTHENTICATION (REGISTER & LOGIN)
// ==========================================

// Student Registration Handler
function registerStudent(event) {
  if (event) event.preventDefault();
  const nameInput = document.getElementById('fullname');
  const emailInput = document.getElementById('email');
  
  const name = nameInput ? nameInput.value.trim() : 'Student';
  const email = emailInput ? emailInput.value.trim() : 'student@academy.com';

  localStorage.setItem('studentName', name);
  localStorage.setItem('studentEmail', email);

  alert(`Welcome ${name}! Registration successful.`);
  window.location.href = "dashboard.html";
}

// Student Login Handler
function loginStudent(event) {
  if (event) event.preventDefault();
  
  const emailInput = document.getElementById('login-email');
  if (!emailInput || !emailInput.value.trim()) {
    alert("Please enter your email address!");
    return;
  }

  const email = emailInput.value.trim();
  const savedEmail = localStorage.getItem('studentEmail');
  const savedName = localStorage.getItem('studentName');

  if (savedEmail && savedEmail.toLowerCase() === email.toLowerCase()) {
    alert(`Welcome back, ${savedName || 'Student'}!`);
  } else {
    const nameFromEmail = email.split('@')[0];
    const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
    
    localStorage.setItem('studentName', formattedName);
    localStorage.setItem('studentEmail', email);
    alert(`Welcome, ${formattedName}!`);
  }

  window.location.href = "dashboard.html";
}

// ==========================================
// 3. ADD & DISPLAY CUSTOM COURSES
// ==========================================
function addNewCourse(event) {
  if (event) event.preventDefault();

  const title = document.getElementById('course-title')?.value.trim();
  const category = document.getElementById('course-category')?.value.trim() || 'General';
  const price = document.getElementById('course-price')?.value.trim() || 'Free';
  const image = document.getElementById('course-image')?.value.trim() || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500';
  const description = document.getElementById('course-description')?.value.trim() || 'No description provided.';

  if (!title) {
    alert("Please enter a course title!");
    return;
  }

  const newCourse = { title, category, price, image, description };

  let existingCourses = JSON.parse(localStorage.getItem('customCourses')) || [];
  existingCourses.push(newCourse);
  localStorage.setItem('customCourses', JSON.stringify(existingCourses));

  alert(`Course '${title}' published successfully!`);
  
  if (typeof loadAdminCourses === 'function') {
    loadAdminCourses();
  } else {
    window.location.href = "courses.html";
  }
}

function displayCustomCourses() {
  const courseGrid = document.querySelector('.course-grid');
  if (!courseGrid) return;

  const customCourses = JSON.parse(localStorage.getItem('customCourses')) || [];

  customCourses.forEach(course => {
    const imageUrl = (course.image && course.image.trim() !== '') 
      ? course.image 
      : 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500';

    const cardHTML = `
      <div class="course-card">
        <img src="${imageUrl}" alt="${course.title}" onerror="this.src='https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500'">
        <div class="card-body">
          <span class="badge">${course.category || 'Programming'}</span>
          <h3>${course.title}</h3>
          <p>${course.description || 'No description provided.'}</p>
          <div class="card-footer">
            <span class="price">${course.price || 'Free'}</span>
            <a href="index.html" class="enroll-btn">Start Learning</a>
          </div>
        </div>
      </div>
    `;
    courseGrid.innerHTML += cardHTML;
  });
}

// ==========================================
// 4. ADMIN DASHBOARD LOGIC
// ==========================================
function loadAdminCourses() {
  const tableBody = document.getElementById('admin-course-list');
  const totalCoursesElem = document.getElementById('total-courses-count');
  if (!tableBody) return;

  const customCourses = JSON.parse(localStorage.getItem('customCourses')) || [];
  
  if (totalCoursesElem) {
    totalCoursesElem.innerText = 3 + customCourses.length;
  }

  tableBody.innerHTML = '';

  if (customCourses.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#707eae;">No custom courses added yet.</td></tr>`;
    return;
  }

  customCourses.forEach((course, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${course.title}</strong></td>
      <td>${course.category || 'General'}</td>
      <td>${course.price || 'Free'}</td>
      <td><button onclick="deleteCourse(${index})" class="delete-btn">🗑 Delete</button></td>
    `;
    tableBody.appendChild(row);
  });
}

function deleteCourse(index) {
  if (confirm("Are you sure you want to delete this course?")) {
    let customCourses = JSON.parse(localStorage.getItem('customCourses')) || [];
    customCourses.splice(index, 1);
    localStorage.setItem('customCourses', JSON.stringify(customCourses));
    loadAdminCourses();
  }
}

// ==========================================
// 5. DARK / LIGHT MODE TOGGLE
// ==========================================
function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  const isDark = document.body.classList.contains('dark-theme');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateThemeButton(isDark);
}

function updateThemeButton(isDark) {
  const btn = document.getElementById('theme-btn');
  if (btn) {
    btn.innerText = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
  }
}

// ==========================================
// 6. INITIALIZE ON PAGE LOAD
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    updateThemeButton(true);
  } else {
    updateThemeButton(false);
  }

  displayCustomCourses();
});
// 1.LocalStorage
function saveProfileImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
      const imageData = e.target.result; // ፎቶውን ወደ ጽሑፍ/Base64 ይቀይረዋል
      localStorage.setItem('userProfilePic', imageData); // LocalStorage ውስጥ ያስቀምጠዋል
      
      const imgElement = document.getElementById('profile-img');
      if (imgElement) {
        imgElement.src = imageData;
      }
    };
    
    reader.readAsDataURL(file);
  }
}

// 2.  Refresh 
window.addEventListener('DOMContentLoaded', () => {
  const savedImage = localStorage.getItem('userProfilePic');
  const imgElement = document.getElementById('profile-img');
  
  if (savedImage && imgElement) {
    imgElement.src = savedImage;
  }
});