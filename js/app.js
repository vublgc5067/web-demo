// ==========================================================================
// HỆ THỐNG ĐIỀU KHIỂN & QUẢN TRỊ WEBSITE KỶ NIỆM 12A1
// ==========================================================================

// 1. Quản lý dữ liệu lưu trữ (LocalStorage Data Store)
let APP_DATA = loadAppData();
let CURRENT_USER = loadCurrentUser();

function loadAppData() {
  try {
    const saved = localStorage.getItem("12a1_site_data");
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error("Lỗi đọc dữ liệu localStorage:", e);
  }
  // Mặc định clone từ CLASS_DATA
  const cloned = JSON.parse(JSON.stringify(CLASS_DATA));
  localStorage.setItem("12a1_site_data", JSON.stringify(cloned));
  return cloned;
}

function saveAppData() {
  localStorage.setItem("12a1_site_data", JSON.stringify(APP_DATA));
}

function resetAppDataToDefault() {
  if (confirm("Bạn có chắc chắn muốn khôi phục toàn bộ nội dung về mặc định ban đầu không?")) {
    APP_DATA = JSON.parse(JSON.stringify(CLASS_DATA));
    saveAppData();
    location.reload();
  }
}

function loadCurrentUser() {
  try {
    const savedUser = localStorage.getItem("12a1_auth_user");
    if (savedUser) {
      return JSON.parse(savedUser);
    }
  } catch (e) {}
  return null;
}

function saveCurrentUser(user) {
  CURRENT_USER = user;
  if (user) {
    localStorage.setItem("12a1_auth_user", JSON.stringify(user));
  } else {
    localStorage.removeItem("12a1_auth_user");
  }
  updateAuthUI();
}

// ==========================================================================
// KHỞI CHẠY KHI TẢI TRANG
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initAuth();
  initBasicInfo();
  initTeacher();
  initMembers();
  initClassroomMap();
  initTimeline();
  initGallery();
  initVideos();
  initGuestbook();
  initPKD();
  initTimeCapsule();
  initMusicPlayer();
  initSakuraCanvas();
  initConfetti();
  initMobileNav();

  updateAuthUI();
  lucide.createIcons();
});

// ==========================================================================
// 2. HỆ THỐNG PHÂN QUYỀN TÀI KHOẢN (ADMIN & GUEST)
// ==========================================================================
function initAuth() {
  const authBtn = document.getElementById("auth-btn");
  const authModal = document.getElementById("auth-modal");
  const closeAuthBtn = document.getElementById("close-auth-modal");
  const authForm = document.getElementById("auth-form");
  const authUserInput = document.getElementById("auth-username");
  const authPassInput = document.getElementById("auth-password");
  const authErrorMsg = document.getElementById("auth-error-msg");
  const quickAdminBtn = document.getElementById("quick-login-admin");
  const quickGuestBtn = document.getElementById("quick-login-guest");
  const logoutBtn = document.getElementById("logout-btn");
  const adminResetBtn = document.getElementById("admin-reset-btn");

  if (authBtn && authModal) {
    authBtn.addEventListener("click", () => {
      if (CURRENT_USER) {
        // Nếu đã đăng nhập, click mở tùy chọn đăng xuất
        if (confirm(`Bạn đang đăng nhập với tư cách: ${CURRENT_USER.displayName}. Bạn có muốn đăng xuất không?`)) {
          saveCurrentUser(null);
          triggerConfetti();
        }
      } else {
        authModal.classList.remove("hidden");
        if (authErrorMsg) authErrorMsg.classList.add("hidden");
        if (authUserInput) authUserInput.focus();
      }
    });
  }

  if (closeAuthBtn && authModal) {
    closeAuthBtn.addEventListener("click", () => authModal.classList.add("hidden"));
    authModal.addEventListener("click", (e) => {
      if (e.target === authModal) authModal.classList.add("hidden");
    });
  }

  // Chọn nhanh
  if (quickAdminBtn && authUserInput && authPassInput) {
    quickAdminBtn.addEventListener("click", () => {
      authUserInput.value = "admin";
      authPassInput.value = "lygiahieu123";
    });
  }

  if (quickGuestBtn && authUserInput && authPassInput) {
    quickGuestBtn.addEventListener("click", () => {
      authUserInput.value = "guest";
      authPassInput.value = "12A1";
    });
  }

  // Xử lý submit đăng nhập
  if (authForm) {
    authForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const u = authUserInput.value.trim();
      const p = authPassInput.value.trim();

      const accAdmin = CLASS_DATA.accounts.admin;
      const accGuest = CLASS_DATA.accounts.guest;

      if (u === accAdmin.username && p === accAdmin.password) {
        saveCurrentUser({
          username: "admin",
          role: "admin",
          displayName: accAdmin.displayName,
          canEditAll: true,
          canEditPhotos: true,
          canEditSeating: true
        });
        authModal.classList.add("hidden");
        authForm.reset();
        triggerConfetti();
        alert(`Xin chào ${accAdmin.displayName}! Bạn đã đăng nhập thành công với toàn quyền chỉnh sửa.`);
      } else if (u === accGuest.username && p === accGuest.password) {
        saveCurrentUser({
          username: "guest",
          role: "guest",
          displayName: accGuest.displayName,
          canEditAll: false,
          canEditPhotos: true,
          canEditSeating: false
        });
        authModal.classList.add("hidden");
        authForm.reset();
        triggerConfetti();
        alert(`Xin chào ${accGuest.displayName}! Bạn đã đăng nhập thành công với quyền thêm và sửa ảnh.`);
      } else {
        if (authErrorMsg) {
          authErrorMsg.classList.remove("hidden");
        }
      }
    });
  }

  // Nút Bỏ qua đăng nhập
  const dismissAuthBtn = document.getElementById("dismiss-auth-btn");
  if (dismissAuthBtn && authModal) {
    dismissAuthBtn.addEventListener("click", () => {
      authModal.classList.add("hidden");
    });
  }

  // Tự động mở hộp thoại đăng nhập khi mới vào trang (chưa chọn tài khoản)
  if (!CURRENT_USER && authModal) {
    authModal.classList.remove("hidden");
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      saveCurrentUser(null);
      alert("Bạn đã đăng xuất thành công!");
    });
  }

  if (adminResetBtn) {
    adminResetBtn.addEventListener("click", () => {
      resetAppDataToDefault();
    });
  }
}

function updateAuthUI() {
  const banner = document.getElementById("admin-banner");
  const bannerBadge = document.getElementById("admin-banner-badge");
  const bannerText = document.getElementById("admin-banner-text");
  const authBtnLabel = document.getElementById("auth-btn-label");
  const adminResetBtn = document.getElementById("admin-reset-btn");

  const adminOnlyEls = document.querySelectorAll(".admin-only");
  const photoEditorOnlyEls = document.querySelectorAll(".photo-editor-only");

  if (CURRENT_USER) {
    if (banner) banner.classList.remove("hidden");

    if (CURRENT_USER.role === "admin") {
      if (bannerBadge) {
        bannerBadge.textContent = "ADMIN 👑";
        bannerBadge.className = "px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-900 font-extrabold uppercase text-[10px] tracking-wider shadow-sm";
      }
      if (bannerText) bannerText.textContent = `Đang đăng nhập: ${CURRENT_USER.displayName} - Chế độ toàn quyền sửa nội dung, sơ đồ lớp & ảnh đã kích hoạt!`;
      if (authBtnLabel) authBtnLabel.textContent = "Admin (Hiếu) 👑";
      if (adminResetBtn) adminResetBtn.classList.remove("hidden");

      adminOnlyEls.forEach(el => el.classList.remove("hidden"));
      photoEditorOnlyEls.forEach(el => el.classList.remove("hidden"));
    } else if (CURRENT_USER.role === "guest") {
      if (bannerBadge) {
        bannerBadge.textContent = "GUEST 👥";
        bannerBadge.className = "px-2.5 py-0.5 rounded-full bg-sky-500 text-white font-extrabold uppercase text-[10px] tracking-wider shadow-sm";
      }
      if (bannerText) bannerText.textContent = `Đang đăng nhập: ${CURRENT_USER.displayName} - Quyền thêm và chỉnh sửa ảnh đã kích hoạt!`;
      if (authBtnLabel) authBtnLabel.textContent = "Guest (12A1) 👥";
      if (adminResetBtn) adminResetBtn.classList.add("hidden");

      adminOnlyEls.forEach(el => el.classList.add("hidden"));
      photoEditorOnlyEls.forEach(el => el.classList.remove("hidden"));
    }
  } else {
    if (banner) banner.classList.add("hidden");
    if (authBtnLabel) authBtnLabel.textContent = "Tài Khoản";
    adminOnlyEls.forEach(el => el.classList.add("hidden"));
    photoEditorOnlyEls.forEach(el => el.classList.add("hidden"));
  }

  // Render lại các danh sách để gắn nút sửa/xóa tương ứng
  renderMembers();
  renderClassroomMap();
  renderGallery();
  renderVideos();
  renderTimeline();
  renderGuestbook();
  lucide.createIcons();
}

// ==========================================================================
// 3. THÔNG TIN CƠ BẢN & SỬA LỜI TỰA (ADMIN ONLY)
// ==========================================================================
function initBasicInfo() {
  renderBasicInfo();

  const editGeneralBtn = document.getElementById("edit-general-btn");
  const generalModal = document.getElementById("edit-general-modal");
  const closeGeneralModal = document.getElementById("close-general-modal");
  const generalForm = document.getElementById("general-info-form");

  if (editGeneralBtn && generalModal) {
    editGeneralBtn.addEventListener("click", () => {
      document.getElementById("edit-class-name").value = APP_DATA.info.className || "";
      document.getElementById("edit-academic-years").value = APP_DATA.info.academicYears || "";
      document.getElementById("edit-total-students").value = APP_DATA.info.totalStudents || 40;
      document.getElementById("edit-school-name").value = APP_DATA.info.schoolName || "";
      document.getElementById("edit-slogan").value = APP_DATA.info.slogan || "";
      document.getElementById("edit-main-quote").value = APP_DATA.info.quote || "";
      generalModal.classList.remove("hidden");
    });
  }

  if (closeGeneralModal && generalModal) {
    closeGeneralModal.addEventListener("click", () => generalModal.classList.add("hidden"));
    generalModal.addEventListener("click", (e) => {
      if (e.target === generalModal) generalModal.classList.add("hidden");
    });
  }

  if (generalForm) {
    generalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      APP_DATA.info.className = document.getElementById("edit-class-name").value.trim();
      APP_DATA.info.academicYears = document.getElementById("edit-academic-years").value.trim();
      APP_DATA.info.totalStudents = parseInt(document.getElementById("edit-total-students").value) || 40;
      APP_DATA.info.schoolName = document.getElementById("edit-school-name").value.trim();
      APP_DATA.info.slogan = document.getElementById("edit-slogan").value.trim();
      APP_DATA.info.quote = document.getElementById("edit-main-quote").value.trim();

      saveAppData();
      renderBasicInfo();
      generalModal.classList.add("hidden");
      triggerConfetti();
      alert("Thông tin chung của lớp đã được cập nhật thành công!");
    });
  }
}

function renderBasicInfo() {
  const info = APP_DATA.info;
  const heroClassName = document.getElementById("hero-class-name");
  const heroYears = document.getElementById("hero-academic-years");
  const heroSlogan = document.getElementById("hero-slogan");
  const heroQuote = document.getElementById("hero-quote");
  const heroSchool = document.getElementById("hero-school-name");
  const totalStudentsEl = document.getElementById("stat-total-students");
  const daysCounter = document.getElementById("days-counter");

  if (heroClassName) heroClassName.textContent = `Tập Thể ${info.className}`;
  if (heroYears) heroYears.textContent = `Kỷ Yếu Điện Tử • Niên Khóa ${info.academicYears}`;
  if (heroSlogan) heroSlogan.textContent = `"${info.slogan}"`;
  if (heroQuote) heroQuote.textContent = `"${info.quote}"`;
  if (heroSchool) heroSchool.textContent = `— Mãi là ${info.className}-er (${info.schoolName}) ❤️`;
  if (totalStudentsEl) totalStudentsEl.textContent = info.totalStudents;

  if (daysCounter && info.establishedDate) {
    const startDate = new Date(info.establishedDate);
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    daysCounter.textContent = `${diffDays}+`;
  }
}

// ==========================================================================
// 4. GÓC GIÁO VIÊN CHỦ NHIỆM & SỬA LỜI DẶN (ADMIN ONLY)
// ==========================================================================
function initTeacher() {
  renderTeacher();

  const editTeacherBtn = document.getElementById("edit-teacher-btn");
  const teacherModal = document.getElementById("edit-teacher-modal");
  const closeTeacherModal = document.getElementById("close-teacher-modal");
  const teacherForm = document.getElementById("teacher-info-form");

  if (editTeacherBtn && teacherModal) {
    editTeacherBtn.addEventListener("click", () => {
      document.getElementById("edit-teacher-name-input").value = APP_DATA.teacher.name || "";
      document.getElementById("edit-teacher-title-input").value = APP_DATA.teacher.title || "";
      document.getElementById("edit-teacher-nick-input").value = APP_DATA.teacher.nickname || "";
      document.getElementById("edit-teacher-avatar-input").value = APP_DATA.teacher.avatar || "";
      document.getElementById("edit-teacher-message-input").value = APP_DATA.teacher.message || "";
      document.getElementById("edit-teacher-quote-input").value = APP_DATA.teacher.quote || "";
      teacherModal.classList.remove("hidden");
    });
  }

  if (closeTeacherModal && teacherModal) {
    closeTeacherModal.addEventListener("click", () => teacherModal.classList.add("hidden"));
    teacherModal.addEventListener("click", (e) => {
      if (e.target === teacherModal) teacherModal.classList.add("hidden");
    });
  }

  if (teacherForm) {
    teacherForm.addEventListener("submit", (e) => {
      e.preventDefault();
      APP_DATA.teacher.name = document.getElementById("edit-teacher-name-input").value.trim();
      APP_DATA.teacher.title = document.getElementById("edit-teacher-title-input").value.trim();
      APP_DATA.teacher.nickname = document.getElementById("edit-teacher-nick-input").value.trim();
      APP_DATA.teacher.avatar = document.getElementById("edit-teacher-avatar-input").value.trim();
      APP_DATA.teacher.message = document.getElementById("edit-teacher-message-input").value.trim();
      APP_DATA.teacher.quote = document.getElementById("edit-teacher-quote-input").value.trim();

      saveAppData();
      renderTeacher();
      teacherModal.classList.add("hidden");
      triggerConfetti();
      alert("Thông tin Cô Chủ Nhiệm đã được cập nhật thành công!");
    });
  }
}

function renderTeacher() {
  const teacher = APP_DATA.teacher;
  const avatarEl = document.getElementById("teacher-avatar");
  const nameEl = document.getElementById("teacher-name");
  const titleEl = document.getElementById("teacher-title");
  const nickEl = document.getElementById("teacher-nickname");
  const msgEl = document.getElementById("teacher-message");
  const quoteEl = document.getElementById("teacher-quote");

  if (avatarEl) avatarEl.src = teacher.avatar;
  if (nameEl) nameEl.textContent = teacher.name;
  if (titleEl) titleEl.textContent = teacher.title;
  if (nickEl) nickEl.textContent = teacher.nickname;
  if (msgEl) msgEl.textContent = `"${teacher.message}"`;
  if (quoteEl) quoteEl.textContent = `"${teacher.quote}"`;
}

// ==========================================================================
// 5. THÀNH VIÊN LỚP (TỰ THÊM, SỬA, XÓA CHO ADMIN)
// ==========================================================================
let currentGroupFilter = "all";
let currentSearchQuery = "";

function initMembers() {
  renderMembers();

  // Filter theo tổ
  const filterBtns = document.querySelectorAll(".group-filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => {
        b.classList.remove("bg-rose-600", "text-white");
        b.classList.add("bg-slate-100", "text-slate-700");
      });
      btn.classList.remove("bg-slate-100", "text-slate-700");
      btn.classList.add("bg-rose-600", "text-white");

      currentGroupFilter = btn.dataset.group;
      renderMembers();
    });
  });

  // Tìm kiếm theo từ khóa
  const searchInput = document.getElementById("member-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearchQuery = e.target.value.toLowerCase().trim();
      renderMembers();
    });
  }

  // Toggle View Thẻ / Sơ đồ
  const viewCardsBtn = document.getElementById("view-cards-btn");
  const viewMapBtn = document.getElementById("view-map-btn");
  const cardsContainer = document.getElementById("members-card-view");
  const mapContainer = document.getElementById("classroom-map-view");
  const groupFilters = document.getElementById("group-filters");

  if (viewCardsBtn && viewMapBtn) {
    viewCardsBtn.addEventListener("click", () => {
      cardsContainer.classList.remove("hidden");
      mapContainer.classList.add("hidden");
      groupFilters.classList.remove("hidden");
      
      viewCardsBtn.classList.add("bg-white", "text-rose-600", "shadow-sm");
      viewCardsBtn.classList.remove("text-slate-600");
      viewMapBtn.classList.remove("bg-white", "text-rose-600", "shadow-sm");
      viewMapBtn.classList.add("text-slate-600");
    });

    viewMapBtn.addEventListener("click", () => {
      cardsContainer.classList.add("hidden");
      mapContainer.classList.remove("hidden");
      groupFilters.classList.add("hidden");

      viewMapBtn.classList.add("bg-white", "text-rose-600", "shadow-sm");
      viewMapBtn.classList.remove("text-slate-600");
      viewCardsBtn.classList.remove("bg-white", "text-rose-600", "shadow-sm");
      viewCardsBtn.classList.add("text-slate-600");
      renderClassroomMap();
    });
  }

  // Setup Modal Chi tiết
  const modal = document.getElementById("member-modal");
  const closeBtn = document.getElementById("close-member-modal");
  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.add("hidden");
    });
  }

  // Thêm thành viên mới (Admin)
  const addMemberBtn = document.getElementById("add-member-btn");
  const editMemberModal = document.getElementById("edit-member-modal");
  const closeEditMemberModal = document.getElementById("close-edit-member-modal");
  const memberForm = document.getElementById("member-form");

  if (addMemberBtn && editMemberModal) {
    addMemberBtn.addEventListener("click", () => {
      document.getElementById("edit-member-id").value = "";
      document.getElementById("member-modal-title").innerHTML = `<i data-lucide="user-plus" class="w-5 h-5 text-rose-500"></i><span>Thêm Thành Viên Mới Vào 12A1</span>`;
      memberForm.reset();
      editMemberModal.classList.remove("hidden");
      lucide.createIcons();
    });
  }

  if (closeEditMemberModal && editMemberModal) {
    closeEditMemberModal.addEventListener("click", () => editMemberModal.classList.add("hidden"));
    editMemberModal.addEventListener("click", (e) => {
      if (e.target === editMemberModal) editMemberModal.classList.add("hidden");
    });
  }

  if (memberForm) {
    memberForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const idVal = document.getElementById("edit-member-id").value;
      const name = document.getElementById("edit-m-name").value.trim();
      const nickname = document.getElementById("edit-m-nickname").value.trim();
      const group = document.getElementById("edit-m-group").value;
      const role = document.getElementById("edit-m-role").value.trim() || "Thành viên";
      const avatar = document.getElementById("edit-m-avatar").value.trim();
      const funnyTitle = document.getElementById("edit-m-funny").value.trim() || "Thành viên đáng yêu";
      const quote = document.getElementById("edit-m-quote").value.trim() || "12A1 mãi trong tim mình!";
      const dream = document.getElementById("edit-m-dream").value.trim() || "Tốt nghiệp đại học xuất sắc";
      const seat = document.getElementById("edit-m-seat").value.trim() || "Bàn học 12A1";

      if (idVal) {
        // Cập nhật học sinh hiện có
        const student = APP_DATA.students.find(s => s.id == idVal);
        if (student) {
          student.name = name;
          student.nickname = nickname;
          student.group = group;
          student.role = role;
          student.avatar = avatar;
          student.funnyTitle = funnyTitle;
          student.quote = quote;
          student.dream = dream;
          student.seat = seat;
        }
      } else {
        // Thêm học sinh mới
        const newStudent = {
          id: Date.now(),
          name,
          nickname,
          group,
          role,
          avatar,
          funnyTitle,
          quote,
          dream,
          seat,
          facebook: "https://facebook.com",
          instagram: "https://instagram.com",
          hobbies: "Học tập, Trà sữa cùng 12A1"
        };
        APP_DATA.students.unshift(newStudent);
      }

      saveAppData();
      renderMembers();
      editMemberModal.classList.add("hidden");
      triggerConfetti();
      alert("Đã lưu thông tin thành viên thành công!");
    });
  }
}

function renderMembers() {
  const container = document.getElementById("members-card-view");
  if (!container) return;

  const isAdmin = CURRENT_USER && CURRENT_USER.role === "admin";

  const filtered = APP_DATA.students.filter(student => {
    const matchGroup = currentGroupFilter === "all" || student.group === currentGroupFilter;
    const matchSearch = !currentSearchQuery || 
      student.name.toLowerCase().includes(currentSearchQuery) ||
      student.nickname.toLowerCase().includes(currentSearchQuery) ||
      student.funnyTitle.toLowerCase().includes(currentSearchQuery) ||
      student.dream.toLowerCase().includes(currentSearchQuery);
    return matchGroup && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center text-slate-500">
        <i data-lucide="search-x" class="w-12 h-12 mx-auto text-slate-300 mb-3"></i>
        <p class="font-medium text-base">Không tìm thấy thành viên nào phù hợp với từ khóa.</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  container.innerHTML = filtered.map((s, idx) => {
    const tapeColors = ["washi-tape-pink", "washi-tape-blue", "washi-tape"];
    const tapeClass = tapeColors[idx % tapeColors.length];

    return `
      <div class="polaroid-card group relative">
        <div class="washi-tape ${tapeClass}"></div>
        
        <!-- Nút Sửa / Xóa cho Admin -->
        ${isAdmin ? `
          <div class="absolute top-2 right-2 z-20 flex items-center gap-1">
            <button onclick="event.stopPropagation(); editMember(${s.id})" title="Sửa thông tin" class="w-7 h-7 rounded-full bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center text-xs shadow">
              <i data-lucide="edit-2" class="w-3.5 h-3.5"></i>
            </button>
            <button onclick="event.stopPropagation(); deleteMember(${s.id})" title="Xóa thành viên" class="w-7 h-7 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center text-xs shadow">
              <i data-lucide="trash" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        ` : ''}

        <div class="cursor-pointer" onclick="openMemberModal(${s.id})">
          <div class="relative overflow-hidden rounded mb-3 bg-slate-100 aspect-square">
            <img src="${s.avatar}" alt="${s.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
            <span class="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-black/60 backdrop-blur-xs text-white">
              ${s.group}
            </span>
          </div>
          <div>
            <h4 class="font-bold text-slate-800 text-base group-hover:text-rose-600 transition-colors flex items-center justify-between">
              <span>${s.name}</span>
            </h4>
            <p class="text-xs text-rose-500 font-semibold mt-0.5">${s.nickname}</p>
            <div class="mt-2.5 p-2 rounded-lg bg-amber-50/80 border border-amber-200/60 text-[11px] text-amber-900 font-medium line-clamp-1">
              ⭐ ${s.funnyTitle}
            </div>
            <p class="text-xs text-slate-500 mt-2 font-serif-quote italic line-clamp-2">
              "${s.quote}"
            </p>
          </div>
        </div>
      </div>
    `;
  }).join("");

  lucide.createIcons();
}

window.openMemberModal = function(id) {
  const student = APP_DATA.students.find(s => s.id === id);
  if (!student) return;

  const modal = document.getElementById("member-modal");
  document.getElementById("modal-member-avatar").src = student.avatar;
  document.getElementById("modal-member-group").textContent = student.group;
  document.getElementById("modal-member-name").textContent = student.name;
  document.getElementById("modal-member-nickname").textContent = `${student.nickname} • ${student.role}`;
  document.getElementById("modal-member-funny").textContent = student.funnyTitle;
  document.getElementById("modal-member-quote").textContent = `"${student.quote}"`;
  document.getElementById("modal-member-dream").textContent = student.dream;
  document.getElementById("modal-member-seat").textContent = student.seat;
  document.getElementById("modal-member-hobbies").textContent = student.hobbies || "Đang cập nhật...";

  document.getElementById("modal-member-fb").href = student.facebook || "#";
  document.getElementById("modal-member-ig").href = student.instagram || "#";

  modal.classList.remove("hidden");
  lucide.createIcons();
};

window.editMember = function(id) {
  const student = APP_DATA.students.find(s => s.id === id);
  if (!student) return;

  const editMemberModal = document.getElementById("edit-member-modal");
  document.getElementById("edit-member-id").value = student.id;
  document.getElementById("member-modal-title").innerHTML = `<i data-lucide="edit" class="w-5 h-5 text-amber-500"></i><span>Sửa Thông Tin: ${student.name}</span>`;

  document.getElementById("edit-m-name").value = student.name;
  document.getElementById("edit-m-nickname").value = student.nickname;
  document.getElementById("edit-m-group").value = student.group;
  document.getElementById("edit-m-role").value = student.role;
  document.getElementById("edit-m-avatar").value = student.avatar;
  document.getElementById("edit-m-funny").value = student.funnyTitle;
  document.getElementById("edit-m-quote").value = student.quote;
  document.getElementById("edit-m-dream").value = student.dream;
  document.getElementById("edit-m-seat").value = student.seat;

  editMemberModal.classList.remove("hidden");
  lucide.createIcons();
};

window.deleteMember = function(id) {
  const student = APP_DATA.students.find(s => s.id === id);
  if (!student) return;

  if (confirm(`Bạn có chắc chắn muốn xóa thành viên "${student.name}" khỏi danh sách lớp không?`)) {
    APP_DATA.students = APP_DATA.students.filter(s => s.id !== id);
    saveAppData();
    renderMembers();
    triggerConfetti();
  }
};

// ==========================================================================
// 6. SƠ ĐỒ LỚP HỌC (ADMIN TỰ THÊM TÊN, TỰ THÊM Ô VỊ TRÍ, THÊM HÀNG)
// ==========================================================================
function initClassroomMap() {
  renderClassroomMap();

  const addRowBtn = document.getElementById("add-row-btn");
  const resetSeatingBtn = document.getElementById("reset-seating-btn");
  const seatModal = document.getElementById("edit-seat-modal");
  const closeSeatModal = document.getElementById("close-seat-modal");
  const seatForm = document.getElementById("seat-edit-form");
  const deleteSeatBtn = document.getElementById("delete-seat-btn");

  // Admin thêm hàng mới
  if (addRowBtn) {
    addRowBtn.addEventListener("click", () => {
      const newRowNum = (APP_DATA.seatingPlan.length || 0) + 1;
      const newRow = {
        row: newRowNum,
        desks: [
          { id: `desk-${newRowNum}-1`, name: "Học sinh mới 1", col: "Dãy 1" },
          { id: `desk-${newRowNum}-2`, name: "Học sinh mới 2", col: "Dãy 2" },
          { id: `desk-${newRowNum}-3`, name: "Học sinh mới 3", col: "Dãy 3" },
          { id: `desk-${newRowNum}-4`, name: "Học sinh mới 4", col: "Dãy 4" }
        ]
      };
      APP_DATA.seatingPlan.push(newRow);
      saveAppData();
      renderClassroomMap();
      triggerConfetti();
      alert(`Đã thêm thành công Hàng ${newRowNum} vào sơ đồ lớp học!`);
    });
  }

  // Khôi phục sơ đồ gốc
  if (resetSeatingBtn) {
    resetSeatingBtn.addEventListener("click", () => {
      if (confirm("Khôi phục sơ đồ chỗ ngồi về cấu hình mặc định?")) {
        APP_DATA.seatingPlan = JSON.parse(JSON.stringify(CLASS_DATA.seatingPlan));
        saveAppData();
        renderClassroomMap();
      }
    });
  }

  if (closeSeatModal && seatModal) {
    closeSeatModal.addEventListener("click", () => seatModal.classList.add("hidden"));
    seatModal.addEventListener("click", (e) => {
      if (e.target === seatModal) seatModal.classList.add("hidden");
    });
  }

  // Lưu chỗ ngồi sau khi chỉnh sửa
  if (seatForm) {
    seatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const rIdx = parseInt(document.getElementById("edit-seat-row-idx").value);
      const dIdx = parseInt(document.getElementById("edit-seat-desk-idx").value);
      const studentName = document.getElementById("edit-seat-student-name").value.trim();
      const colName = document.getElementById("edit-seat-col-name").value.trim() || `Dãy ${dIdx + 1}`;

      if (APP_DATA.seatingPlan[rIdx] && APP_DATA.seatingPlan[rIdx].desks[dIdx]) {
        APP_DATA.seatingPlan[rIdx].desks[dIdx].name = studentName;
        APP_DATA.seatingPlan[rIdx].desks[dIdx].col = colName;
        saveAppData();
        renderClassroomMap();
        seatModal.classList.add("hidden");
        triggerConfetti();
      }
    });
  }

  // Xóa ô chỗ ngồi khỏi hàng
  if (deleteSeatBtn) {
    deleteSeatBtn.addEventListener("click", () => {
      const rIdx = parseInt(document.getElementById("edit-seat-row-idx").value);
      const dIdx = parseInt(document.getElementById("edit-seat-desk-idx").value);

      if (confirm("Bạn có chắc chắn muốn xóa vị trí bàn học này không?")) {
        if (APP_DATA.seatingPlan[rIdx]) {
          APP_DATA.seatingPlan[rIdx].desks.splice(dIdx, 1);
          saveAppData();
          renderClassroomMap();
          seatModal.classList.add("hidden");
        }
      }
    });
  }
}

function renderClassroomMap() {
  const container = document.getElementById("classroom-seats-grid");
  if (!container) return;

  const isAdmin = CURRENT_USER && CURRENT_USER.role === "admin";

  container.innerHTML = APP_DATA.seatingPlan.map((row, rIdx) => `
    <div class="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 transition-all">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-bold text-slate-500 uppercase">
          Hàng ${row.row} (${row.desks ? row.desks.length : 0} Chỗ ngồi)
        </span>

        <!-- Các công cụ quản trị hàng dành cho Admin -->
        ${isAdmin ? `
          <div class="flex items-center gap-1.5">
            <button onclick="addDeskToRow(${rIdx})" class="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold shadow-sm transition-all flex items-center gap-1">
              <i data-lucide="plus" class="w-3 h-3"></i>
              <span>+ Thêm Bàn</span>
            </button>
            <button onclick="deleteRow(${rIdx})" class="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white text-[11px] font-bold shadow-sm transition-all flex items-center gap-1" title="Xóa toàn bộ hàng này">
              <i data-lucide="trash-2" class="w-3 h-3"></i>
              <span>Xóa Hàng</span>
            </button>
          </div>
        ` : ''}
      </div>

      <!-- Lưới các bàn học trong hàng -->
      <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-${Math.min(row.desks ? row.desks.length : 4, 6)} gap-2 sm:gap-3">
        ${(row.desks || []).map((desk, dIdx) => renderDeskItem(desk, rIdx, dIdx, isAdmin)).join("")}
      </div>
    </div>
  `).join("");

  lucide.createIcons();
}

function renderDeskItem(desk, rIdx, dIdx, isAdmin) {
  const student = APP_DATA.students.find(s => s.name === desk.name);
  const clickAction = isAdmin 
    ? `onclick="openEditSeatModal(${rIdx}, ${dIdx})"`
    : (student ? `onclick="openMemberModal(${student.id})"` : "");

  const bgStyle = student ? "bg-rose-50 border-rose-200 hover:bg-rose-100/90" : "bg-white border-slate-200 hover:bg-slate-100";

  return `
    <div ${clickAction} class="classroom-desk p-3 rounded-xl border ${bgStyle} text-center cursor-pointer relative shadow-xs group">
      ${isAdmin ? `
        <span class="absolute top-1 right-1 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] shadow" title="Sửa tên/ô">
          <i data-lucide="edit-2" class="w-3 h-3"></i>
        </span>
      ` : ''}
      <span class="text-[10px] font-semibold text-slate-400 block">${desk.col || `Dãy ${dIdx + 1}`}</span>
      <p class="text-xs sm:text-sm font-bold text-slate-800 mt-1 truncate">${desk.name}</p>
      ${student ? `<span class="text-[10px] text-rose-600 font-medium block truncate">${student.nickname}</span>` : '<span class="text-[10px] text-slate-400 italic block">Trống</span>'}
    </div>
  `;
}

window.addDeskToRow = function(rIdx) {
  if (!APP_DATA.seatingPlan[rIdx]) return;
  const currentCount = APP_DATA.seatingPlan[rIdx].desks.length;
  const newColName = `Dãy ${currentCount + 1}`;
  const studentPrompt = prompt(`Nhập tên bạn học sinh ngồi ở ${newColName}:`, "Học sinh mới");
  if (studentPrompt !== null) {
    APP_DATA.seatingPlan[rIdx].desks.push({
      id: `desk-${rIdx + 1}-${currentCount + 1}`,
      name: studentPrompt.trim() || `Bạn ${currentCount + 1}`,
      col: newColName
    });
    saveAppData();
    renderClassroomMap();
    triggerConfetti();
  }
};

window.deleteRow = function(rIdx) {
  if (confirm(`Bạn có chắc muốn xóa Hàng ${APP_DATA.seatingPlan[rIdx].row} khỏi sơ đồ lớp?`)) {
    APP_DATA.seatingPlan.splice(rIdx, 1);
    // Cập nhật lại số thứ tự hàng
    APP_DATA.seatingPlan.forEach((r, idx) => r.row = idx + 1);
    saveAppData();
    renderClassroomMap();
  }
};

window.openEditSeatModal = function(rIdx, dIdx) {
  const row = APP_DATA.seatingPlan[rIdx];
  if (!row || !row.desks[dIdx]) return;

  const desk = row.desks[dIdx];
  const seatModal = document.getElementById("edit-seat-modal");
  document.getElementById("edit-seat-row-idx").value = rIdx;
  document.getElementById("edit-seat-desk-idx").value = dIdx;
  document.getElementById("edit-seat-student-name").value = desk.name;
  document.getElementById("edit-seat-col-name").value = desk.col || `Dãy ${dIdx + 1}`;

  seatModal.classList.remove("hidden");
  lucide.createIcons();
};

// ==========================================================================
// 7. MỤC VIDEO KỶ NIỆM 12A1 (ADMIN TỰ THÊM, XÓA)
// ==========================================================================
function initVideos() {
  renderVideos();

  const addVideoBtn = document.getElementById("add-video-btn");
  const videoModal = document.getElementById("edit-video-modal");
  const closeVideoModal = document.getElementById("close-video-modal");
  const videoForm = document.getElementById("video-add-form");

  if (addVideoBtn && videoModal) {
    addVideoBtn.addEventListener("click", () => {
      videoForm.reset();
      videoModal.classList.remove("hidden");
    });
  }

  if (closeVideoModal && videoModal) {
    closeVideoModal.addEventListener("click", () => videoModal.classList.add("hidden"));
    videoModal.addEventListener("click", (e) => {
      if (e.target === videoModal) videoModal.classList.add("hidden");
    });
  }

  if (videoForm) {
    videoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("new-video-title").value.trim();
      let url = document.getElementById("new-video-url").value.trim();
      const desc = document.getElementById("new-video-desc").value.trim() || "Thước phim kỷ niệm 12A1.";
      const date = document.getElementById("new-video-date").value.trim() || new Date().toLocaleDateString("vi-VN");

      // Chuyển link youtube watch sang embed nếu cần
      if (url.includes("watch?v=")) {
        url = url.replace("watch?v=", "embed/");
      } else if (url.includes("youtu.be/")) {
        url = url.replace("youtu.be/", "www.youtube.com/embed/");
      }

      const newVideo = {
        id: `vid-${Date.now()}`,
        title,
        description: desc,
        url,
        date
      };

      if (!APP_DATA.videos) APP_DATA.videos = [];
      APP_DATA.videos.unshift(newVideo);
      saveAppData();
      renderVideos();
      videoModal.classList.add("hidden");
      triggerConfetti();
      alert("Đã thêm video mới thành công!");
    });
  }
}

function renderVideos() {
  const container = document.getElementById("videos-grid");
  if (!container) return;

  const isAdmin = CURRENT_USER && CURRENT_USER.role === "admin";
  const videos = APP_DATA.videos || [];

  if (videos.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-slate-400">
        <i data-lucide="film" class="w-12 h-12 mx-auto text-slate-600 mb-2"></i>
        <p class="text-sm">Chưa có video nào. Admin có thể bấm "+ Thêm Video Mới" để thêm!</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  container.innerHTML = videos.map(v => `
    <div class="rounded-2xl bg-slate-800 border border-slate-700 overflow-hidden shadow-lg flex flex-col relative group">
      ${isAdmin ? `
        <button onclick="deleteVideo('${v.id}')" class="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-lg bg-red-600/90 hover:bg-red-600 text-white text-[11px] font-bold shadow flex items-center gap-1 backdrop-blur-xs">
          <i data-lucide="trash-2" class="w-3 h-3"></i>
          <span>Xóa</span>
        </button>
      ` : ''}

      <!-- Iframe Video Embed -->
      <div class="relative w-full aspect-video bg-black">
        <iframe src="${v.url}" title="${v.title}" class="w-full h-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>

      <div class="p-4 sm:p-5 flex-grow flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between text-xs text-rose-400 mb-1">
            <span>🎬 Thước Phim 12A1</span>
            <span class="text-slate-400">${v.date}</span>
          </div>
          <h4 class="font-bold text-base text-white mt-1 leading-snug">${v.title}</h4>
          <p class="text-xs text-slate-300 mt-2 line-clamp-2">${v.description}</p>
        </div>
      </div>
    </div>
  `).join("");

  lucide.createIcons();
}

window.deleteVideo = function(id) {
  if (confirm("Bạn có chắc chắn muốn xóa video này không?")) {
    APP_DATA.videos = (APP_DATA.videos || []).filter(v => v.id !== id);
    saveAppData();
    renderVideos();
    triggerConfetti();
  }
};

// ==========================================================================
// 8. BỘ SƯU TẬP ẢNH KỶ YẾU (ADMIN & GUEST ĐƯỢC THÊM, SỬA, XÓA)
// ==========================================================================
let currentGalleryCategory = "all";

function initGallery() {
  renderGallery();

  // Filter album
  const filterBtns = document.querySelectorAll(".gallery-filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => {
        b.classList.remove("bg-rose-600", "text-white");
        b.classList.add("bg-white", "text-slate-700");
      });
      btn.classList.remove("bg-white", "text-slate-700");
      btn.classList.add("bg-rose-600", "text-white");

      currentGalleryCategory = btn.dataset.cat;
      renderGallery();
    });
  });

  // Tải ảnh nhanh từ máy tính
  const uploadInput = document.getElementById("custom-photo-upload");
  if (uploadInput) {
    uploadInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
          const newPhoto = {
            id: `photo-${Date.now()}`,
            category: "candid",
            title: file.name.split('.')[0] || "Ảnh kỷ niệm mới",
            description: "Khoảnh khắc vừa được thêm vào bộ sưu tập lớp 12A1.",
            image: event.target.result,
            date: "Vừa mới thêm"
          };
          APP_DATA.gallery.unshift(newPhoto);
          saveAppData();
          renderGallery();
          triggerConfetti();
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Quản lý ảnh (Admin & Guest)
  const managePhotoBtn = document.getElementById("manage-photo-btn");
  const photoModal = document.getElementById("edit-photo-modal");
  const closePhotoModal = document.getElementById("close-photo-modal");
  const photoForm = document.getElementById("photo-add-form");

  if (managePhotoBtn && photoModal) {
    managePhotoBtn.addEventListener("click", () => {
      photoForm.reset();
      photoModal.classList.remove("hidden");
    });
  }

  if (closePhotoModal && photoModal) {
    closePhotoModal.addEventListener("click", () => photoModal.classList.add("hidden"));
    photoModal.addEventListener("click", (e) => {
      if (e.target === photoModal) photoModal.classList.add("hidden");
    });
  }

  if (photoForm) {
    photoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("new-photo-title").value.trim();
      const category = document.getElementById("new-photo-cat").value;
      const urlInput = document.getElementById("new-photo-url").value.trim();
      const fileInput = document.getElementById("new-photo-file").files[0];
      const desc = document.getElementById("new-photo-desc").value.trim() || "Khoảnh khắc đẹp cùng 12A1.";
      const date = document.getElementById("new-photo-date").value.trim() || "Tháng 5/2026";

      function savePhotoWithImage(imgSrc) {
        const newPhoto = {
          id: `photo-${Date.now()}`,
          category,
          title,
          description: desc,
          image: imgSrc,
          date
        };
        APP_DATA.gallery.unshift(newPhoto);
        saveAppData();
        renderGallery();
        photoModal.classList.add("hidden");
        triggerConfetti();
        alert("Đã lưu ảnh mới thành công!");
      }

      if (fileInput) {
        const reader = new FileReader();
        reader.onload = function(event) {
          savePhotoWithImage(event.target.result);
        };
        reader.readAsDataURL(fileInput);
      } else if (urlInput) {
        savePhotoWithImage(urlInput);
      } else {
        alert("Vui lòng nhập link ảnh hoặc chọn tệp ảnh từ máy tính!");
      }
    });
  }

  // Lightbox Modal
  const lightbox = document.getElementById("lightbox-modal");
  const closeLightbox = document.getElementById("close-lightbox");
  if (closeLightbox && lightbox) {
    closeLightbox.addEventListener("click", () => lightbox.classList.add("hidden"));
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) lightbox.classList.add("hidden");
    });
  }
}

function renderGallery() {
  const container = document.getElementById("gallery-grid");
  if (!container) return;

  const canEditPhotos = CURRENT_USER && (CURRENT_USER.role === "admin" || CURRENT_USER.role === "guest");
  const filtered = APP_DATA.gallery.filter(photo => {
    return currentGalleryCategory === "all" || photo.category === currentGalleryCategory;
  });

  container.innerHTML = filtered.map(p => `
    <div class="polaroid-card group cursor-pointer relative" onclick="openLightbox('${p.image}', '${p.title.replace(/'/g, "\\'")}', '${p.description.replace(/'/g, "\\'")}', '${p.date}')">
      <div class="washi-tape washi-tape-pink"></div>
      
      <!-- Nút xóa ảnh cho Admin hoặc Guest -->
      ${canEditPhotos ? `
        <button onclick="event.stopPropagation(); deleteGalleryPhoto('${p.id}')" title="Xóa bức ảnh này" class="absolute top-2 right-2 z-20 w-7 h-7 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center text-xs shadow">
          <i data-lucide="trash" class="w-3.5 h-3.5"></i>
        </button>
      ` : ''}

      <div class="relative overflow-hidden rounded bg-slate-100 aspect-4/3 mb-2">
        <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
      </div>
      <h5 class="font-bold text-slate-800 text-sm truncate group-hover:text-rose-600 transition-colors">${p.title}</h5>
      <p class="text-xs text-slate-500 line-clamp-1 mt-0.5">${p.description}</p>
      <span class="text-[10px] text-rose-500 font-semibold mt-1 block">${p.date}</span>
    </div>
  `).join("");

  lucide.createIcons();
}

window.deleteGalleryPhoto = function(id) {
  if (confirm("Bạn có chắc chắn muốn xóa bức ảnh này không?")) {
    APP_DATA.gallery = APP_DATA.gallery.filter(p => p.id != id);
    saveAppData();
    renderGallery();
    triggerConfetti();
  }
};

window.openLightbox = function(src, title, desc, date) {
  const modal = document.getElementById("lightbox-modal");
  document.getElementById("lightbox-img").src = src;
  document.getElementById("lightbox-title").textContent = title;
  document.getElementById("lightbox-desc").textContent = desc;
  document.getElementById("lightbox-date").textContent = date;
  modal.classList.remove("hidden");
};

// ==========================================================================
// 9. DÒNG THỜI GIAN (TIMELINE) - ADMIN CRUD
// ==========================================================================
function initTimeline() {
  renderTimeline();

  const addTimelineBtn = document.getElementById("add-timeline-btn");
  const timelineModal = document.getElementById("edit-timeline-modal");
  const closeTimelineModal = document.getElementById("close-timeline-modal");
  const timelineForm = document.getElementById("timeline-form");

  if (addTimelineBtn && timelineModal) {
    addTimelineBtn.addEventListener("click", () => {
      // Reset form to add mode
      document.getElementById("edit-timeline-id").value = "";
      document.getElementById("timeline-modal-title").innerHTML = `<i data-lucide="plus-circle" class="w-5 h-5 text-rose-500"></i><span>Thêm Mốc Kỷ Niệm Mới</span>`;
      timelineForm.reset();
      timelineModal.classList.remove("hidden");
      lucide.createIcons();
    });
  }

  if (closeTimelineModal && timelineModal) {
    closeTimelineModal.addEventListener("click", () => timelineModal.classList.add("hidden"));
    timelineModal.addEventListener("click", (e) => {
      if (e.target === timelineModal) timelineModal.classList.add("hidden");
    });
  }

  if (timelineForm) {
    timelineForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const idVal = document.getElementById("edit-timeline-id").value.trim();
      const year = document.getElementById("edit-tl-year").value.trim();
      const tag = document.getElementById("edit-tl-tag").value.trim();
      const title = document.getElementById("edit-tl-title").value.trim();
      const image = document.getElementById("edit-tl-image").value.trim() ||
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80";
      const description = document.getElementById("edit-tl-desc").value.trim();

      if (!APP_DATA.timeline) APP_DATA.timeline = [];

      if (idVal) {
        // Chỉnh sửa
        const idx = APP_DATA.timeline.findIndex(t => String(t.id) === idVal);
        if (idx !== -1) {
          APP_DATA.timeline[idx] = { ...APP_DATA.timeline[idx], year, tag, title, image, description };
        }
      } else {
        // Thêm mới
        APP_DATA.timeline.push({
          id: `tl-${Date.now()}`,
          year,
          tag,
          title,
          image,
          description,
          icon: "star"
        });
      }

      saveAppData();
      renderTimeline();
      timelineModal.classList.add("hidden");
      triggerConfetti();
      alert("Đã lưu mốc kỷ niệm thành công!");
    });
  }
}

function renderTimeline() {
  const listEl = document.getElementById("timeline-list");
  if (!listEl) return;

  const isAdmin = CURRENT_USER && CURRENT_USER.role === "admin";
  const items = APP_DATA.timeline || [];

  if (items.length === 0) {
    listEl.innerHTML = `<div class="text-center py-12 text-slate-400"><p>Chưa có mốc kỷ niệm nào. Admin hãy thêm mốc đầu tiên!</p></div>`;
    return;
  }

  listEl.innerHTML = items.map((item, idx) => {
    const isEven = idx % 2 === 0;

    return `
      <div class="relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}">
        
        <!-- Điểm mốc chính giữa -->
        <div class="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-rose-500 border-4 border-white text-white items-center justify-center shadow-md z-10">
          <i data-lucide="${item.icon || 'star'}" class="w-4 h-4"></i>
        </div>

        <!-- Nội dung thẻ bên trái hoặc bên phải -->
        <div class="w-full md:w-1/2 ${isEven ? 'md:pl-10' : 'md:pr-10'}">
          <div class="polaroid-card hover:rotate-0 transition-transform relative">
            <div class="washi-tape washi-tape-pink"></div>

            <!-- Nút Admin Sửa / Xóa -->
            ${isAdmin ? `
              <div class="absolute top-3 right-3 z-20 flex items-center gap-1.5">
                <button onclick="editTimelineItem('${item.id}')" title="Sửa mốc này" class="px-2 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-white text-[11px] font-bold shadow flex items-center gap-1">
                  <i data-lucide="edit-2" class="w-3 h-3"></i>
                  <span>Sửa</span>
                </button>
                <button onclick="deleteTimelineItem('${item.id}')" title="Xóa mốc này" class="px-2 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white text-[11px] font-bold shadow flex items-center gap-1">
                  <i data-lucide="trash-2" class="w-3 h-3"></i>
                  <span>Xóa</span>
                </button>
              </div>
            ` : ''}

            <div class="overflow-hidden rounded-lg mb-3 max-h-56">
              <img src="${item.image}" alt="${item.title}" class="w-full h-48 sm:h-56 object-cover hover:scale-105 transition-transform duration-500" loading="lazy">
            </div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100">${item.year}</span>
              <span class="text-[11px] font-semibold text-slate-500">${item.tag}</span>
            </div>
            <h4 class="text-base sm:text-lg font-bold text-slate-800">${item.title}</h4>
            <p class="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-serif-quote">
              "${item.description}"
            </p>
          </div>
        </div>

      </div>
    `;
  }).join("");

  lucide.createIcons();
}

window.editTimelineItem = function(id) {
  const item = APP_DATA.timeline.find(t => String(t.id) === String(id));
  if (!item) return;

  const timelineModal = document.getElementById("edit-timeline-modal");
  document.getElementById("edit-timeline-id").value = item.id;
  document.getElementById("timeline-modal-title").innerHTML = `<i data-lucide="edit" class="w-5 h-5 text-amber-500"></i><span>Sửa Mốc: ${item.title}</span>`;
  document.getElementById("edit-tl-year").value = item.year;
  document.getElementById("edit-tl-tag").value = item.tag;
  document.getElementById("edit-tl-title").value = item.title;
  document.getElementById("edit-tl-image").value = item.image;
  document.getElementById("edit-tl-desc").value = item.description;

  timelineModal.classList.remove("hidden");
  lucide.createIcons();
};

window.deleteTimelineItem = function(id) {
  const item = APP_DATA.timeline.find(t => String(t.id) === String(id));
  if (!item) return;

  if (confirm(`Bạn có chắc chắn muốn xóa mốc kỷ niệm "${item.title}" không?`)) {
    APP_DATA.timeline = APP_DATA.timeline.filter(t => String(t.id) !== String(id));
    saveAppData();
    renderTimeline();
    triggerConfetti();
  }
};

// ==========================================================================
// 10. BẢNG LƯU BÚT & LỜI NHẮN
// ==========================================================================
function initGuestbook() {
  renderGuestbook();

  const openBtn = document.getElementById("open-note-modal-btn");
  const closeBtn = document.getElementById("close-note-modal");
  const modal = document.getElementById("note-modal");
  const form = document.getElementById("note-form");

  if (openBtn && modal) {
    openBtn.addEventListener("click", () => modal.classList.remove("hidden"));
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.add("hidden");
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const author = document.getElementById("note-author").value.trim();
      const role = document.getElementById("note-role").value.trim() || "Thành viên 12A1";
      const tag = document.getElementById("note-tag").value;
      const colorVal = document.querySelector('input[name="note-color"]:checked')?.value || "yellow";
      const content = document.getElementById("note-content").value.trim();

      const colorMap = {
        yellow: "bg-amber-100 border-amber-300 text-amber-900",
        rose: "bg-rose-100 border-rose-300 text-rose-900",
        blue: "bg-sky-100 border-sky-300 text-sky-900",
        emerald: "bg-emerald-100 border-emerald-300 text-emerald-900"
      };

      const newNote = {
        id: `note-${Date.now()}`,
        author,
        role,
        color: colorMap[colorVal] || colorMap.yellow,
        tag,
        date: new Date().toLocaleDateString("vi-VN"),
        content
      };

      const savedNotes = JSON.parse(localStorage.getItem("12a1_guestbook") || "[]");
      savedNotes.unshift(newNote);
      localStorage.setItem("12a1_guestbook", JSON.stringify(savedNotes));

      form.reset();
      modal.classList.add("hidden");
      renderGuestbook();
      triggerConfetti();
    });
  }
}

function renderGuestbook() {
  const container = document.getElementById("notes-grid");
  if (!container) return;

  const isAdmin = CURRENT_USER && CURRENT_USER.role === "admin";
  const savedNotes = JSON.parse(localStorage.getItem("12a1_guestbook") || "[]");
  const allNotes = [...savedNotes, ...APP_DATA.initialNotes];

  if (allNotes.length === 0) {
    container.innerHTML = `<div class="col-span-full text-center py-12 text-slate-400"><p>Chưa có lưu bút nào. Hãy là người đầu tiên viết!</p></div>`;
    return;
  }

  container.innerHTML = allNotes.map(n => `
    <div class="sticky-note p-6 rounded-2xl border ${n.color} relative shadow-md">
      <div class="pin-tack"></div>

      <!-- Nút xóa ghi chú cho Admin -->
      ${isAdmin ? `
        <button onclick="deleteGuestbookNote('${n.id}')" title="Xóa ghi chú này" class="absolute top-3 right-3 w-7 h-7 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow text-xs z-20" style="top:12px;right:12px;">
          <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
        </button>
      ` : ''}

      <div class="flex items-center justify-between mb-3">
        <span class="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/70 border border-current">
          ${n.tag}
        </span>
        <span class="text-[11px] font-medium opacity-80">${n.date}</span>
      </div>
      <p class="font-handwriting text-xl sm:text-2xl leading-relaxed mb-4">
        "${n.content}"
      </p>
      <div class="border-t border-current/20 pt-3 flex items-center justify-between">
        <div>
          <h5 class="font-bold text-sm leading-tight">${n.author}</h5>
          <span class="text-[11px] opacity-75">${n.role}</span>
        </div>
        <i data-lucide="heart" class="w-4 h-4 opacity-70"></i>
      </div>
    </div>
  `).join("");

  lucide.createIcons();
}

window.deleteGuestbookNote = function(id) {
  if (confirm("Bạn có chắc chắn muốn xóa lưu bút này không?")) {
    const savedNotes = JSON.parse(localStorage.getItem("12a1_guestbook") || "[]");
    const filtered = savedNotes.filter(n => n.id !== id);
    localStorage.setItem("12a1_guestbook", JSON.stringify(filtered));

    // Cũng xóa khỏi initialNotes trong APP_DATA nếu là note mặc định
    if (APP_DATA.initialNotes) {
      APP_DATA.initialNotes = APP_DATA.initialNotes.filter(n => n.id !== id);
      saveAppData();
    }

    renderGuestbook();
  }
};

// ==========================================================================
// 11. MỤC BẢO MẬT: PKD (MẬT KHẨU: taoyeuconmemay1999)
// ==========================================================================
function initPKD() {
  const lockForm = document.getElementById("pkd-lock-form");
  const passInput = document.getElementById("pkd-pass-input");
  const toggleBtn = document.getElementById("toggle-pkd-pass");
  const toggleIcon = document.getElementById("toggle-pkd-pass-icon");
  const errorAlert = document.getElementById("pkd-error-alert");
  const lockedView = document.getElementById("pkd-locked-view");
  const unlockedView = document.getElementById("pkd-unlocked-view");
  const lockAgainBtn = document.getElementById("pkd-lock-again-btn");

  if (!lockedView || !unlockedView) return;

  if (sessionStorage.getItem("pkd_unlocked") === "true") {
    unlockPKDView();
  }

  if (toggleBtn && passInput) {
    toggleBtn.addEventListener("click", () => {
      const isPassword = passInput.type === "password";
      passInput.type = isPassword ? "text" : "password";
      if (toggleIcon) {
        toggleIcon.setAttribute("data-lucide", isPassword ? "eye-off" : "eye");
        lucide.createIcons();
      }
    });
  }

  if (lockForm) {
    lockForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const enteredPass = passInput.value.trim();

      if (enteredPass === APP_DATA.pkd.password) {
        sessionStorage.setItem("pkd_unlocked", "true");
        if (errorAlert) errorAlert.classList.add("hidden");
        unlockPKDView();
        triggerConfetti();
        passInput.value = "";
      } else {
        if (errorAlert) {
          errorAlert.classList.remove("hidden");
          errorAlert.classList.add("animate-shake");
          setTimeout(() => errorAlert.classList.remove("animate-shake"), 600);
        }
      }
    });
  }

  // Admin bypass PKD lock
  const adminBypassBtn = document.getElementById("admin-bypass-pkd-btn");
  if (adminBypassBtn) {
    adminBypassBtn.addEventListener("click", () => {
      sessionStorage.setItem("pkd_unlocked", "true");
      unlockPKDView();
      triggerConfetti();
    });
  }

  if (lockAgainBtn) {
    lockAgainBtn.addEventListener("click", () => {
      sessionStorage.removeItem("pkd_unlocked");
      unlockedView.classList.add("hidden");
      lockedView.classList.remove("hidden");
      if (passInput) passInput.value = "";
    });
  }

  // Admin edit PKD modal
  const editPKDBtn = document.getElementById("edit-pkd-btn");
  const pkdModal = document.getElementById("edit-pkd-modal");
  const closePKDModal = document.getElementById("close-pkd-modal");
  const pkdEditForm = document.getElementById("pkd-edit-form");

  if (editPKDBtn && pkdModal) {
    editPKDBtn.addEventListener("click", () => {
      const profile = APP_DATA.pkd.profile || {};
      const stats = profile.stats || {};
      document.getElementById("edit-pkd-name").value = profile.fullName || "";
      document.getElementById("edit-pkd-role").value = profile.role || "";
      document.getElementById("edit-pkd-birthday").value = profile.birthday || "";
      document.getElementById("edit-pkd-password").value = APP_DATA.pkd.password || "";
      document.getElementById("edit-pkd-title").value = profile.title || "";
      document.getElementById("edit-pkd-avatar").value = profile.avatar || "";
      document.getElementById("edit-pkd-slogan").value = profile.slogan || "";
      document.getElementById("edit-pkd-bio").value = profile.biography || "";
      document.getElementById("edit-pkd-iq").value = stats.iq || "";
      document.getElementById("edit-pkd-humor").value = stats.humor || "";
      document.getElementById("edit-pkd-loyalty").value = stats.loyalty || "";
      document.getElementById("edit-pkd-crush").value = stats.crush || "";
      document.getElementById("edit-pkd-memories").value = (profile.specialMemories || []).join("\n");
      pkdModal.classList.remove("hidden");
      lucide.createIcons();
    });
  }

  if (closePKDModal && pkdModal) {
    closePKDModal.addEventListener("click", () => pkdModal.classList.add("hidden"));
    pkdModal.addEventListener("click", (e) => {
      if (e.target === pkdModal) pkdModal.classList.add("hidden");
    });
  }

  if (pkdEditForm) {
    pkdEditForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!APP_DATA.pkd) APP_DATA.pkd = {};
      if (!APP_DATA.pkd.profile) APP_DATA.pkd.profile = {};
      if (!APP_DATA.pkd.profile.stats) APP_DATA.pkd.profile.stats = {};

      APP_DATA.pkd.profile.fullName = document.getElementById("edit-pkd-name").value.trim();
      APP_DATA.pkd.profile.role = document.getElementById("edit-pkd-role").value.trim();
      APP_DATA.pkd.profile.birthday = document.getElementById("edit-pkd-birthday").value.trim();
      APP_DATA.pkd.profile.title = document.getElementById("edit-pkd-title").value.trim();
      APP_DATA.pkd.profile.avatar = document.getElementById("edit-pkd-avatar").value.trim();
      APP_DATA.pkd.profile.slogan = document.getElementById("edit-pkd-slogan").value.trim();
      APP_DATA.pkd.profile.biography = document.getElementById("edit-pkd-bio").value.trim();
      APP_DATA.pkd.profile.stats.iq = document.getElementById("edit-pkd-iq").value.trim();
      APP_DATA.pkd.profile.stats.humor = document.getElementById("edit-pkd-humor").value.trim();
      APP_DATA.pkd.profile.stats.loyalty = document.getElementById("edit-pkd-loyalty").value.trim();
      APP_DATA.pkd.profile.stats.crush = document.getElementById("edit-pkd-crush").value.trim();

      const memoriesRaw = document.getElementById("edit-pkd-memories").value.trim();
      APP_DATA.pkd.profile.specialMemories = memoriesRaw
        ? memoriesRaw.split("\n").map(m => m.trim()).filter(Boolean)
        : [];

      const newPass = document.getElementById("edit-pkd-password").value.trim();
      if (newPass) APP_DATA.pkd.password = newPass;

      saveAppData();
      renderPKDProfile();
      pkdModal.classList.add("hidden");
      triggerConfetti();
      alert("Đã cập nhật hồ sơ PKD thành công!");
    });
  }

  // Tải ảnh vào album PKD (qua file picker nhanh)
  const uploadInput = document.getElementById("pkd-photo-upload");
  if (uploadInput) {
    uploadInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
          const newPhoto = {
            id: `pkd-custom-${Date.now()}`,
            title: file.name.split('.')[0] || "Ảnh kỷ niệm PKD",
            description: "Khoảnh khắc vừa được thêm vào kho bí mật PKD.",
            image: event.target.result,
            date: "Vừa mới thêm"
          };
          if (!APP_DATA.pkd.photos) APP_DATA.pkd.photos = [];
          APP_DATA.pkd.photos.unshift(newPhoto);
          saveAppData();
          renderPKDGallery();
          triggerConfetti();
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Thêm/Sửa ảnh PKD qua Modal
  const addPKDPhotoBtn = document.getElementById("add-pkd-photo-btn");
  const pkdPhotoModal = document.getElementById("edit-pkd-photo-modal");
  const closePKDPhotoModal = document.getElementById("close-pkd-photo-modal");
  const pkdPhotoForm = document.getElementById("pkd-photo-form");

  if (addPKDPhotoBtn && pkdPhotoModal) {
    addPKDPhotoBtn.addEventListener("click", () => {
      document.getElementById("edit-pkd-photo-id").value = "";
      document.getElementById("pkd-photo-modal-title").innerHTML = `<i data-lucide="image-plus" class="w-5 h-5 text-amber-400"></i><span>Thêm Ảnh Vào Album PKD</span>`;
      pkdPhotoForm.reset();
      pkdPhotoModal.classList.remove("hidden");
      lucide.createIcons();
    });
  }

  if (closePKDPhotoModal && pkdPhotoModal) {
    closePKDPhotoModal.addEventListener("click", () => pkdPhotoModal.classList.add("hidden"));
    pkdPhotoModal.addEventListener("click", (e) => {
      if (e.target === pkdPhotoModal) pkdPhotoModal.classList.add("hidden");
    });
  }

  if (pkdPhotoForm) {
    pkdPhotoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const idVal = document.getElementById("edit-pkd-photo-id").value.trim();
      const title = document.getElementById("edit-pkd-photo-title").value.trim();
      const urlInput = document.getElementById("edit-pkd-photo-url").value.trim();
      const fileInput = document.getElementById("edit-pkd-photo-file").files[0];
      const desc = document.getElementById("edit-pkd-photo-desc").value.trim() || "Khoảnh khắc kỷ niệm của PKD.";
      const date = document.getElementById("edit-pkd-photo-date").value.trim() || "Tháng 5/2026";

      function savePKDPhotoWithImage(imgSrc) {
        if (!APP_DATA.pkd.photos) APP_DATA.pkd.photos = [];
        if (idVal) {
          const idx = APP_DATA.pkd.photos.findIndex(p => String(p.id) === idVal);
          if (idx !== -1) {
            APP_DATA.pkd.photos[idx] = {
              ...APP_DATA.pkd.photos[idx],
              title,
              description: desc,
              date,
              ...(imgSrc ? { image: imgSrc } : {})
            };
          }
        } else {
          APP_DATA.pkd.photos.unshift({
            id: `pkd-${Date.now()}`,
            title,
            description: desc,
            image: imgSrc || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80",
            date
          });
        }
        saveAppData();
        renderPKDGallery();
        pkdPhotoModal.classList.add("hidden");
        triggerConfetti();
        alert("Đã lưu ảnh album PKD thành công!");
      }

      if (fileInput) {
        const reader = new FileReader();
        reader.onload = function(event) {
          savePKDPhotoWithImage(event.target.result);
        };
        reader.readAsDataURL(fileInput);
      } else if (urlInput) {
        savePKDPhotoWithImage(urlInput);
      } else if (idVal) {
        // Giữ nguyên ảnh cũ nếu chỉ sửa text
        savePKDPhotoWithImage(null);
      } else {
        alert("Vui lòng nhập link ảnh (URL) hoặc chọn tệp ảnh!");
      }
    });
  }

  // Gửi lời nhắn riêng cho PKD
  const msgForm = document.getElementById("pkd-message-form");
  if (msgForm) {
    msgForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const sender = document.getElementById("pkd-msg-sender").value.trim();
      const nickname = document.getElementById("pkd-msg-nickname").value.trim() || "Thành viên 12A1";
      const content = document.getElementById("pkd-msg-content").value.trim();

      const savedMsgs = JSON.parse(localStorage.getItem("pkd_private_messages") || "[]");
      savedMsgs.unshift({
        id: `pkd-msg-${Date.now()}`,
        sender,
        nickname,
        content,
        date: new Date().toLocaleDateString("vi-VN")
      });
      localStorage.setItem("pkd_private_messages", JSON.stringify(savedMsgs));

      msgForm.reset();
      renderPKDMessages();
      triggerConfetti();
    });
  }
}

function unlockPKDView() {
  const lockedView = document.getElementById("pkd-locked-view");
  const unlockedView = document.getElementById("pkd-unlocked-view");

  if (lockedView && unlockedView) {
    lockedView.classList.add("hidden");
    unlockedView.classList.remove("hidden");
    renderPKDProfile();
    renderPKDGallery();
    renderPKDMessages();
  }
}

function renderPKDProfile() {
  const profile = APP_DATA.pkd.profile;
  if (!profile) return;

  const avatar = document.getElementById("pkd-bio-avatar");
  const name = document.getElementById("pkd-bio-name");
  const role = document.getElementById("pkd-bio-role");
  const bday = document.getElementById("pkd-bio-birthday");
  const title = document.getElementById("pkd-bio-title");
  const desc = document.getElementById("pkd-bio-desc");
  const slogan = document.getElementById("pkd-bio-slogan");
  const memoriesList = document.getElementById("pkd-bio-memories");

  if (avatar) avatar.src = profile.avatar;
  if (name) name.textContent = profile.fullName;
  if (role) role.textContent = profile.role;
  if (bday) bday.textContent = `🎂 ${profile.birthday}`;
  if (title) title.textContent = profile.title;
  if (desc) desc.textContent = profile.biography;
  if (slogan) slogan.textContent = `"${profile.slogan}"`;

  if (profile.stats) {
    const iq = document.getElementById("pkd-stat-iq");
    const humor = document.getElementById("pkd-stat-humor");
    const loyalty = document.getElementById("pkd-stat-loyalty");
    const crush = document.getElementById("pkd-stat-crush");

    if (iq) iq.textContent = profile.stats.iq;
    if (humor) humor.textContent = profile.stats.humor;
    if (loyalty) loyalty.textContent = profile.stats.loyalty;
    if (crush) crush.textContent = profile.stats.crush;
  }

  if (memoriesList && profile.specialMemories) {
    memoriesList.innerHTML = profile.specialMemories.map(m => `
      <li class="flex items-start gap-2 bg-slate-900/40 p-2.5 rounded-xl border border-slate-700/50">
        <span class="text-rose-400 font-bold">✦</span>
        <span>${m}</span>
      </li>
    `).join("");
  }

  lucide.createIcons();
}

function renderPKDGallery() {
  const container = document.getElementById("pkd-gallery-grid");
  if (!container) return;

  const canEdit = true; // Trong mục PKD sau khi mở khóa, hoặc khi là Admin/User đều có quyền sửa album PKD
  const photos = APP_DATA.pkd.photos || [];

  if (photos.length === 0) {
    container.innerHTML = `<div class="col-span-full text-center py-8 text-slate-400 text-sm">Chưa có bức ảnh nào trong album PKD. Bấm "+ Thêm Ảnh PKD" để thêm ảnh đầu tiên!</div>`;
    return;
  }

  container.innerHTML = photos.map(p => `
    <div class="polaroid-card group cursor-pointer relative" onclick="openLightbox('${p.image}', '${p.title.replace(/'/g, "\\'")}', '${p.description.replace(/'/g, "\\'")}', '${p.date}')">
      <div class="washi-tape washi-tape-pink"></div>

      <!-- Nút Sửa & Xóa ảnh PKD -->
      <div class="absolute top-2 right-2 z-20 flex items-center gap-1">
        <button onclick="event.stopPropagation(); editPKDPhoto('${p.id}')" title="Sửa bức ảnh này" class="w-7 h-7 rounded-full bg-amber-500 hover:bg-amber-400 text-white flex items-center justify-center text-xs shadow">
          <i data-lucide="edit-2" class="w-3.5 h-3.5"></i>
        </button>
        <button onclick="event.stopPropagation(); deletePKDPhoto('${p.id}')" title="Xóa bức ảnh này" class="w-7 h-7 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center text-xs shadow">
          <i data-lucide="trash" class="w-3.5 h-3.5"></i>
        </button>
      </div>

      <div class="relative overflow-hidden rounded bg-slate-100 aspect-4/3 mb-2">
        <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
      </div>
      <h5 class="font-bold text-slate-800 text-sm truncate group-hover:text-rose-600 transition-colors">${p.title}</h5>
      <p class="text-xs text-slate-500 line-clamp-1 mt-0.5">${p.description}</p>
      <span class="text-[10px] text-rose-500 font-semibold mt-1 block">${p.date}</span>
    </div>
  `).join("");

  lucide.createIcons();
}

window.editPKDPhoto = function(id) {
  const photo = (APP_DATA.pkd.photos || []).find(p => String(p.id) === String(id));
  if (!photo) return;

  const modal = document.getElementById("edit-pkd-photo-modal");
  document.getElementById("edit-pkd-photo-id").value = photo.id;
  document.getElementById("pkd-photo-modal-title").innerHTML = `<i data-lucide="edit-3" class="w-5 h-5 text-amber-400"></i><span>Sửa Ảnh: ${photo.title}</span>`;
  document.getElementById("edit-pkd-photo-title").value = photo.title || "";
  document.getElementById("edit-pkd-photo-url").value = photo.image || "";
  document.getElementById("edit-pkd-photo-desc").value = photo.description || "";
  document.getElementById("edit-pkd-photo-date").value = photo.date || "";

  modal.classList.remove("hidden");
  lucide.createIcons();
};

window.deletePKDPhoto = function(id) {
  if (confirm("Bạn có chắc chắn muốn xóa bức ảnh này khỏi album PKD không?")) {
    APP_DATA.pkd.photos = (APP_DATA.pkd.photos || []).filter(p => String(p.id) !== String(id));
    saveAppData();
    renderPKDGallery();
    triggerConfetti();
  }
};

function renderPKDMessages() {
  const container = document.getElementById("pkd-messages-list");
  if (!container) return;

  const savedMsgs = JSON.parse(localStorage.getItem("pkd_private_messages") || "[]");
  const sampleMsg = [
    {
      sender: "Tập thể 12A1",
      nickname: "Gia đình 12A1",
      content: "Cảm ơn PKD vì đã luôn là nguồn năng lượng tích cực và người bạn tuyệt vời của cả lớp trong suốt 3 năm qua!",
      date: "Kỷ Niệm"
    }
  ];

  const allMsgs = [...savedMsgs, ...sampleMsg];

  container.innerHTML = allMsgs.map(m => `
    <div class="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-700/60 flex flex-col gap-1">
      <div class="flex items-center justify-between text-xs">
        <span class="font-bold text-rose-400">${m.sender} <span class="font-normal text-slate-400">(${m.nickname})</span></span>
        <span class="text-[11px] text-slate-500">${m.date}</span>
      </div>
      <p class="text-xs sm:text-sm text-slate-300 font-handwriting text-base mt-1">"${m.content}"</p>
    </div>
  `).join("");
}

// ==========================================================================
// 12. HỘP THỜI GIAN & ĐẾM NGƯỢC (ADMIN CÓ THỂ SỬA TIÊU ĐỀ, MÔ TẢ, NGÀY HẸN)
// ==========================================================================
function initTimeCapsule() {
  // Render tiêu đề & mô tả từ APP_DATA nếu có
  renderCapsuleInfo();

  // Đồng hồ đếm ngược
  let countdownInterval = null;

  function startCountdown() {
    const targetDateStr = APP_DATA.capsule && APP_DATA.capsule.targetDate
      ? APP_DATA.capsule.targetDate
      : "2036-06-30T09:00:00";
    const targetDate = new Date(targetDateStr).getTime();

    if (countdownInterval) clearInterval(countdownInterval);

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance <= 0) return;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const dEl = document.getElementById("countdown-days");
      const hEl = document.getElementById("countdown-hours");
      const mEl = document.getElementById("countdown-minutes");
      const sEl = document.getElementById("countdown-seconds");

      if (dEl) dEl.textContent = days;
      if (hEl) hEl.textContent = String(hours).padStart(2, "0");
      if (mEl) mEl.textContent = String(minutes).padStart(2, "0");
      if (sEl) sEl.textContent = String(seconds).padStart(2, "0");
    }

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
  }

  startCountdown();

  // Form gửi lời hứa
  const capsuleForm = document.getElementById("capsule-form");
  if (capsuleForm) {
    capsuleForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const sender = document.getElementById("capsule-sender").value.trim();
      const promise = document.getElementById("capsule-promise").value.trim();

      const promises = JSON.parse(localStorage.getItem("12a1_capsule_promises") || "[]");
      promises.push({ id: `promise-${Date.now()}`, sender, promise, time: new Date().toISOString() });
      localStorage.setItem("12a1_capsule_promises", JSON.stringify(promises));

      capsuleForm.reset();
      triggerConfetti();
      alert(`✨ Cảm ơn ${sender}! Lời hứa của bạn đã được niêm phong an toàn vào chiếc hộp thời gian 12A1.`);
    });
  }

  // Admin: Sửa hộp thời gian
  const editCapsuleBtn = document.getElementById("edit-capsule-btn");
  const capsuleModal = document.getElementById("edit-capsule-modal");
  const closeCapsuleModal = document.getElementById("close-capsule-modal");
  const capsuleEditForm = document.getElementById("capsule-edit-form");

  if (editCapsuleBtn && capsuleModal) {
    editCapsuleBtn.addEventListener("click", () => {
      const cap = APP_DATA.capsule || {};
      document.getElementById("edit-cap-title").value = cap.title || "Hộp Kỷ Niệm 10 Năm Sau";
      document.getElementById("edit-cap-desc").value = cap.desc || "Hẹn gặp lại nhau vào ngày 30/06/2036 tại chính cổng trường thân quen!";
      document.getElementById("edit-cap-date").value = (cap.targetDate || "2036-06-30T09:00:00").substring(0, 10);
      capsuleModal.classList.remove("hidden");
      renderAdminPromises();
      lucide.createIcons();
    });
  }

  if (closeCapsuleModal && capsuleModal) {
    closeCapsuleModal.addEventListener("click", () => capsuleModal.classList.add("hidden"));
    capsuleModal.addEventListener("click", (e) => {
      if (e.target === capsuleModal) capsuleModal.classList.add("hidden");
    });
  }

  if (capsuleEditForm) {
    capsuleEditForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!APP_DATA.capsule) APP_DATA.capsule = {};
      APP_DATA.capsule.title = document.getElementById("edit-cap-title").value.trim();
      APP_DATA.capsule.desc = document.getElementById("edit-cap-desc").value.trim();
      const dateVal = document.getElementById("edit-cap-date").value;
      APP_DATA.capsule.targetDate = dateVal ? `${dateVal}T09:00:00` : "2036-06-30T09:00:00";

      saveAppData();
      renderCapsuleInfo();
      startCountdown();
      capsuleModal.classList.add("hidden");
      triggerConfetti();
      alert("Đã cập nhật hộp thời gian thành công!");
    });
  }
}

function renderCapsuleInfo() {
  const cap = APP_DATA.capsule || {};
  const titleEl = document.getElementById("capsule-title");
  const descEl = document.getElementById("capsule-desc");
  if (titleEl && cap.title) titleEl.textContent = cap.title;
  if (descEl && cap.desc) descEl.textContent = cap.desc;
}

function renderAdminPromises() {
  const container = document.getElementById("admin-promises-list");
  const countEl = document.getElementById("promises-count");
  if (!container) return;

  const promises = JSON.parse(localStorage.getItem("12a1_capsule_promises") || "[]");
  if (countEl) countEl.textContent = `${promises.length} lời hứa`;

  if (promises.length === 0) {
    container.innerHTML = `<div class="text-center py-6 text-slate-400 text-sm">Chưa có lời hứa nào được gửi vào hộp.</div>`;
    return;
  }

  container.innerHTML = promises.map((p, idx) => `
    <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-xs font-bold text-rose-600">${p.sender}</span>
          <span class="text-[10px] text-slate-400">${new Date(p.time).toLocaleDateString("vi-VN")}</span>
        </div>
        <p class="text-xs text-slate-600 line-clamp-2">${p.promise}</p>
      </div>
      <button onclick="deletePromise(${idx})" class="flex-shrink-0 w-7 h-7 rounded-full bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center" title="Xóa lời hứa này">
        <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
      </button>
    </div>
  `).join("");

  lucide.createIcons();
}

window.deletePromise = function(idx) {
  if (confirm("Bạn có chắc muốn xóa lời hứa này không?")) {
    const promises = JSON.parse(localStorage.getItem("12a1_capsule_promises") || "[]");
    promises.splice(idx, 1);
    localStorage.setItem("12a1_capsule_promises", JSON.stringify(promises));
    renderAdminPromises();
  }
};

// ==========================================================================
// 13. NHẠC NỀN & HIỆU ỨNG HOA ANH ĐÀO & CONFETTI
// ==========================================================================
function initMusicPlayer() {
  const audio = document.getElementById("bg-audio");
  const musicBtn = document.getElementById("music-btn");
  const soundWave = document.getElementById("sound-wave-bars");
  const btnText = document.getElementById("music-btn-text");

  if (!audio || !musicBtn) return;
  let isPlaying = false;

  musicBtn.addEventListener("click", () => {
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      soundWave.classList.add("paused");
      btnText.textContent = "Bật Nhạc";
    } else {
      audio.play().then(() => {
        isPlaying = true;
        soundWave.classList.remove("paused");
        btnText.textContent = "Tắt Nhạc";
      }).catch(err => {
        console.warn("Autoplay blocked or audio load error:", err);
      });
    }
  });
}

let isSakuraEnabled = true;

function initSakuraCanvas() {
  const canvas = document.getElementById("sakura-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petals = [];
  const petalCount = 30;

  class Petal {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * -height;
      this.size = Math.random() * 8 + 7;
      this.speedX = Math.random() * 1.5 - 0.75;
      this.speedY = Math.random() * 1.2 + 0.8;
      this.angle = Math.random() * Math.PI * 2;
      this.spin = (Math.random() - 0.5) * 0.02;
      this.color = Math.random() > 0.4 ? "rgba(251, 113, 133, 0.65)" : "rgba(254, 205, 211, 0.75)";
    }
    update() {
      this.x += this.speedX + Math.sin(this.angle) * 0.5;
      this.y += this.speedY;
      this.angle += this.spin;

      if (this.y > height || this.x < -20 || this.x > width + 20) {
        this.reset();
        this.y = -10;
      }
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size, this.size * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < petalCount; i++) {
    petals.push(new Petal());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    if (isSakuraEnabled) {
      petals.forEach(p => {
        p.update();
        p.draw();
      });
    }
    requestAnimationFrame(animate);
  }

  animate();

  const toggleBtn = document.getElementById("sakura-toggle-btn");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      isSakuraEnabled = !isSakuraEnabled;
      toggleBtn.classList.toggle("bg-pink-100", isSakuraEnabled);
      toggleBtn.classList.toggle("opacity-50", !isSakuraEnabled);
    });
  }
}

function initConfetti() {
  const btn = document.getElementById("confetti-btn");
  if (btn) {
    btn.addEventListener("click", () => triggerConfetti());
  }
}

function triggerConfetti() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#f59e0b', '#38bdf8', '#a855f7']
    });
  }
}

function initMobileNav() {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileNav = document.getElementById("mobile-nav");

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", () => {
      mobileNav.classList.toggle("hidden");
      mobileNav.classList.toggle("flex");
    });

    mobileNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileNav.classList.add("hidden");
        mobileNav.classList.remove("flex");
      });
    });
  }
}
