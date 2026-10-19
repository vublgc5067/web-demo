// Dữ liệu kỉ niệm lớp 12A1 - Bạn có thể dễ dàng chỉnh sửa thông tin tại file này!
const CLASS_DATA = {
  info: {
    className: "12A1",
    schoolName: "THPT Chuyên / THPT Thanh Xuân",
    academicYears: "2023 - 2026",
    slogan: "Một ngày là 12A1 - Mãi mãi là thanh xuân của nhau!",
    establishedDate: "2023-09-05",
    graduationDate: "2026-06-30",
    totalStudents: 40,
    quote: "Ba năm cấp ba trôi qua nhanh như một cái chớp mắt. Nhưng nụ cười của bạn bè và bài học của thầy cô sẽ còn đọng lại suốt một đời."
  },

  // Giáo viên chủ nhiệm
  teacher: {
    name: "Cô Nguyễn Thu Hà",
    title: "Giáo viên Chủ nhiệm & Dạy môn Ngữ Văn",
    nickname: "Mẹ hiền 12A1 ❤️",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80",
    message: "Gửi 40 thiên thần nhỏ của cô! 3 năm đồng hành cùng các em là khoảng thời gian rực rỡ và đáng nhớ nhất trong sự nghiệp dạy học của cô. Dù các em có bay xa đến đâu, hãy nhớ 12A1 luôn là mái nhà ấm áp chào đón các em trở về. Chúc các em luôn tự tin, kiên định và hạnh phúc trên con đường mình đã chọn!",
    phone: "0987.xxx.xxx",
    quote: "Các em hãy sống rực rỡ như những đoá hoa mùa hạ!"
  },

  // Danh sách học sinh mẫu (đầy đủ các tổ, chức vụ, biệt danh siêu vui)
  students: [
    {
      id: 1,
      name: "Nguyễn Minh Đức",
      nickname: "Đức 'Lớp Trưởng' 👑",
      role: "Lớp trưởng gương mẫu",
      group: "Tổ 1",
      seat: "Bàn 1 - Dãy 1",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80",
      quote: "Hò hét cả lớp trật tự suốt 3 năm, giờ im ắng quá lại thấy nhớ mọi người...",
      dream: "Kỹ sư Trí tuệ Nhân tạo (AI)",
      funnyTitle: "Chuyên gia đòi nợ quỹ lớp",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      hobbies: "Bóng rổ, Đàn guitar, Cày code"
    },
    {
      id: 2,
      name: "Trần Thảo Linh",
      nickname: "Linh 'Bí Thư' 🌸",
      role: "Bí thư Đoàn",
      group: "Tổ 1",
      seat: "Bàn 1 - Dãy 2",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80",
      quote: "Cảm ơn vì đã cùng mình vẽ nên những năm tháng thanh xuân tươi đẹp nhất!",
      dream: "Nhà ngoại giao / Giảng viên",
      funnyTitle: "Trùm tổ chức văn nghệ & phong trào",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      hobbies: "Múa truyền thống, Đọc sách, Viết nhật ký"
    },
    {
      id: 3,
      name: "Lê Hoàng Long",
      nickname: "Long 'Cây Hài' 🎭",
      role: "Phó Bí thư kiêm Cây hài",
      group: "Tổ 2",
      seat: "Bàn cuối - Dãy 1",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
      quote: "Đi học có thể quên tập vở, nhưng tuyệt đối không được quên tấu hài cho cả lớp cười!",
      dream: "Doanh nhân Khởi nghiệp",
      funnyTitle: "Thánh ngủ gật không bao giờ bị bắt",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      hobbies: "Ăn vặt căn tin, Chơi game, Kể chuyện cười"
    },
    {
      id: 4,
      name: "Phạm Hà My",
      nickname: "My 'Thủ Quỹ' 💰",
      role: "Lớp phó Lao động & Thủ quỹ",
      group: "Tổ 2",
      seat: "Bàn 2 - Dãy 2",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80",
      quote: "Tiền quỹ còn 50k, cả lớp hẹn nhau liên hoan trà sữa nhé!",
      dream: "Chuyên gia Phân tích Tài chính",
      funnyTitle: "Tay hòm chìa khóa quyền lực nhất lớp",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      hobbies: "Shopping, Tính nhẩm siêu tốc, Nấu ăn"
    },
    {
      id: 5,
      name: "Đỗ Tuấn Kiệt",
      nickname: "Kiệt 'Thần Toán' 📐",
      role: "Lớp phó Học tập",
      group: "Tổ 3",
      seat: "Bàn 1 - Dãy 3",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
      quote: "Bài toán khó nhất cuộc đời không phải tích phân, mà là cách giữ trọn vẹn tình bạn 12A1.",
      dream: "Bác sĩ Ngoại khoa",
      funnyTitle: "Cứu tinh 15 phút truy bài",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      hobbies: "Giải Rubik, Chơi cờ vua, Nghe nhạc Lofi"
    },
    {
      id: 6,
      name: "Vũ Phương Anh",
      nickname: "Anh 'Họa Sĩ' 🎨",
      role: "Tổ trưởng Tổ 1",
      group: "Tổ 1",
      seat: "Bàn 2 - Dãy 1",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=80",
      quote: "Mỗi ngày đến trường là một bức tranh đầy màu sắc của chúng mình.",
      dream: "Kiến trúc sư / Thiết kế Đồ họa",
      funnyTitle: "Chủ nhân báo tường đạt giải Nhất toàn trường",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      hobbies: "Vẽ manga, Chụp ảnh film, Đi dạo ngắm hoàng hôn"
    },
    {
      id: 7,
      name: "Ngô Quốc Bảo",
      nickname: "Bảo 'Cầu Thủ' ⚽",
      role: "Thành viên tích cực",
      group: "Tổ 3",
      seat: "Bàn 3 - Dãy 3",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=80",
      quote: "Sân trường rực nắng, tiếng reo hò của các bạn nữ 12A1 sẽ là kỷ niệm tôi mang theo mãi.",
      dream: "Huấn luyện viên Thể thao",
      funnyTitle: "Tiền đạo vàng trong làng đá banh trường",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      hobbies: "Bóng đá, Gym, Phượt"
    },
    {
      id: 8,
      name: "Bùi Mai Anh",
      nickname: "Mai Anh 'Hát Hay' 🎤",
      role: "Tổ phó Tổ 2",
      group: "Tổ 2",
      seat: "Bàn 3 - Dãy 2",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
      quote: "Nếu có ước muốn trong cuộc đời này, hãy nhớ về bài ca lớp chúng mình cùng hát.",
      dream: "Ca sĩ / Nhà sản xuất âm nhạc",
      funnyTitle: "Giọng ca oanh vàng giờ giải lao",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      hobbies: "Cover nhạc, Chơi Ukulele, Làm podcast"
    },
    {
      id: 9,
      name: "Trịnh Quang Huy",
      nickname: "Huy 'Gamer' 🎮",
      role: "Tổ trưởng Tổ 4",
      group: "Tổ 4",
      seat: "Bàn cuối - Dãy 4",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&auto=format&fit=crop&q=80",
      quote: "Thắng bại tại kỹ năng, nhưng tình bạn 12A1 là bất tử!",
      dream: "Lập trình viên Game",
      funnyTitle: "Gánh team Liên Quân sau giờ tan học",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      hobbies: "Esports, Review đồ công nghệ, Bơi lội"
    },
    {
      id: 10,
      name: "Hoàng Khánh Vy",
      nickname: "Vy 'TikToker' ✨",
      role: "Tổ phó Tổ 4",
      group: "Tổ 4",
      seat: "Bàn 2 - Dãy 4",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80",
      quote: "Đừng quên bấm like cho thanh xuân của chúng mình nhé!",
      dream: "Content Creator / Nhà Báo",
      funnyTitle: "Nữ hoàng lưu giữ khoảnh khắc dìm hàng của lớp",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      hobbies: "Quay Vlog, Makeup, Du lịch trải nghiệm"
    },
    {
      id: 11,
      name: "Dương Minh Khang",
      nickname: "Khang 'Vật Lý' ⚡",
      role: "Thành viên",
      group: "Tổ 3",
      seat: "Bàn 2 - Dãy 3",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80",
      quote: "Vạn vật đều có trọng lực, còn tôi luôn bị hút về phía 12A1.",
      dream: "Kỹ sư Hàng không Vũ trụ",
      funnyTitle: "Chiến thần mạch điện & thí nghiệm",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      hobbies: "Lắp ráp robot, Đọc sách khoa học, Ngắm sao"
    },
    {
      id: 12,
      name: "Chu Bảo Ngọc",
      nickname: "Ngọc 'Bánh Bèo' 🍬",
      role: "Tổ trưởng Tổ 3",
      group: "Tổ 3",
      seat: "Bàn 1 - Dãy 4",
      avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&auto=format&fit=crop&q=80",
      quote: "Học giỏi hay không không quan trọng, quan trọng là hộp bút luôn đủ 36 màu!",
      dream: "Biên tập viên Thời trang",
      funnyTitle: "Cửa hàng văn phòng phẩm di động của lớp",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      hobbies: "Trang trí sổ Bullet Journal, Làm bánh, Chụp ảnh flatlay"
    }
  ],

  // Sơ đồ vị trí ngồi trong lớp học (Hỗ trợ Admin tự thêm ô, đổi tên, thêm hàng)
  seatingPlan: [
    {
      row: 1,
      desks: [
        { id: "desk-1-1", name: "Nguyễn Minh Đức", col: "Dãy 1" },
        { id: "desk-1-2", name: "Trần Thảo Linh", col: "Dãy 2" },
        { id: "desk-1-3", name: "Đỗ Tuấn Kiệt", col: "Dãy 3" },
        { id: "desk-1-4", name: "Chu Bảo Ngọc", col: "Dãy 4" }
      ]
    },
    {
      row: 2,
      desks: [
        { id: "desk-2-1", name: "Vũ Phương Anh", col: "Dãy 1" },
        { id: "desk-2-2", name: "Phạm Hà My", col: "Dãy 2" },
        { id: "desk-2-3", name: "Dương Minh Khang", col: "Dãy 3" },
        { id: "desk-2-4", name: "Hoàng Khánh Vy", col: "Dãy 4" }
      ]
    },
    {
      row: 3,
      desks: [
        { id: "desk-3-1", name: "Nguyễn Văn Hùng", col: "Dãy 1" },
        { id: "desk-3-2", name: "Bùi Mai Anh", col: "Dãy 2" },
        { id: "desk-3-3", name: "Ngô Quốc Bảo", col: "Dãy 3" },
        { id: "desk-3-4", name: "Lê Nhật Nam", col: "Dãy 4" }
      ]
    },
    {
      row: 4,
      desks: [
        { id: "desk-4-1", name: "Lê Hoàng Long", col: "Dãy 1" },
        { id: "desk-4-2", name: "Trần Bảo An", col: "Dãy 2" },
        { id: "desk-4-3", name: "Vũ Hải Đăng", col: "Dãy 3" },
        { id: "desk-4-4", name: "Trịnh Quang Huy", col: "Dãy 4" }
      ]
    }
  ],

  // Dòng thời gian 3 năm thanh xuân
  timeline: [
    {
      year: "05/09/2023",
      title: "Ngày Đầu Gặp Gỡ - Lớp 10 Khai Giảng",
      tag: "Lớp 10",
      icon: "school",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&auto=format&fit=crop&q=80",
      description: "40 con người từ những ngôi trường khác nhau, ánh mắt ngượng ngùng bước vào phòng học tầng 3. Ai ngờ sau này lại thân nhau đến mức chia đôi từng gói mì tôm."
    },
    {
      year: "26/03/2024",
      title: "Hội Trại Thanh Niên Rực Rỡ",
      tag: "Lớp 10",
      icon: "tent",
      image: "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=700&auto=format&fit=crop&q=80",
      description: "Cả lớp thức trắng đêm dựng trại, vẽ cổng trại 12A1 bằng tre nứa. Đêm lửa trại hát vang những bài ca bất tận, ai nấy đều lem luốc nhưng nụ cười rạng rỡ."
    },
    {
      year: "20/11/2024",
      title: "Món Quà Bất Ngờ Tri Ân Cô Chủ Nhiệm",
      tag: "Lớp 11",
      icon: "heart",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&auto=format&fit=crop&q=80",
      description: "Cả lớp giả vờ có xích mích để cô hốt hoảng bước vào lớp, rồi đồng thanh hát vang bài 'Người Thầy' và tặng cô bức tranh tập thể 12A1. Cô đã khóc vì xúc động."
    },
    {
      year: "15/01/2025",
      title: "Chuyến Dã Ngoại Cuối Cấp Đầy Kỷ Niệm",
      tag: "Lớp 11",
      icon: "camera",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=700&auto=format&fit=crop&q=80",
      description: "Chuyến đi xa đầu tiên và duy nhất của đại gia đình 12A1. Cùng nhau nướng BBQ, chơi team building, ngồi vòng tròn tâm sự đến 3 giờ sáng bên bờ biển."
    },
    {
      year: "25/04/2026",
      title: "Chụp Ảnh Kỷ Yếu - Lưu Giữ Thanh Xuân",
      tag: "Lớp 12",
      icon: "sparkles",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=700&auto=format&fit=crop&q=80",
      description: "Tà áo trắng bay trong gió sân trường, bộ ảnh cử nhân đỏ rực. Dù chụp dưới cái nắng hè gay gắt nhưng ai cũng cố gắng tươi cười để có những khung hình đẹp nhất."
    },
    {
      year: "28/05/2026",
      title: "Lễ Bế Giảng - Chiếc Áo Trắng Đầy Chữ Ký",
      tag: "Lớp 12",
      icon: "graduation-cap",
      image: "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?w=700&auto=format&fit=crop&q=80",
      description: "Tiếng trống bế giảng cuối cùng vang lên. Ôm nhau bật khóc nức nở, viết vội những dòng lưu bút lên lưng áo bạn. Tạm biệt thời học sinh ngây ngô để bước vào đời!"
    }
  ],

  // Thư viện ảnh kỉ niệm
  gallery: [
    {
      id: 1,
      category: "yearbook",
      title: "Tập thể 12A1 trong tà áo trắng",
      description: "Bức ảnh kỷ yếu đầy đủ nhất trước bậc thềm cổng trường thân yêu.",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80",
      date: "Tháng 4/2026"
    },
    {
      id: 2,
      category: "candid",
      title: "Những giấc ngủ trưa yên bình",
      description: "Bàn học mát rượi gió quạt trần, ngủ gật sau giờ học căng thẳng.",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80",
      date: "Tháng 10/2024"
    },
    {
      id: 3,
      category: "fun",
      title: "Biệt đội ăn vặt căn tin",
      description: "Trà sữa, bánh tráng trộn, xoài lắc... những món ăn nuôi lớn tình bạn.",
      image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&auto=format&fit=crop&q=80",
      date: "Tháng 3/2025"
    },
    {
      id: 4,
      category: "events",
      title: "Cháy hết mình tại Hội diễn Văn nghệ",
      description: "Tiết mục múa đương đại 12A1 giành giải Nhất trong tiếng vỗ tay rền vang.",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80",
      date: "Tháng 11/2025"
    },
    {
      id: 5,
      category: "yearbook",
      title: "Nụ cười rạng rỡ tuổi 18",
      description: "Ánh mắt trong veo, nụ cười tươi tắn không vướng chút âu lo.",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&auto=format&fit=crop&q=80",
      date: "Tháng 4/2026"
    },
    {
      id: 6,
      category: "candid",
      title: "Góc hành lang ngập nắng",
      description: "Những giờ ra chơi đứng tựa lan can ngắm nhìn sân trường rơi đầy lá phượng.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80",
      date: "Tháng 5/2025"
    },
    {
      id: 7,
      category: "events",
      title: "Giải bóng đá vô địch khối 12",
      description: "Khoảnh khắc nâng chiếc cúp vô địch bóng đá nam của 12A1.",
      image: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=800&auto=format&fit=crop&q=80",
      date: "Tháng 12/2025"
    },
    {
      id: 8,
      category: "fun",
      title: "Tuyển tập những khoảnh khắc 'bá đạo'",
      description: "Những pha tạo dáng khó đỡ mà sau 10 năm nhìn lại vẫn ôm bụng cười.",
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&auto=format&fit=crop&q=80",
      date: "Tháng 2/2026"
    }
  ],

  // Lưu bút mẫu (những ghi chú ban đầu)
  initialNotes: [
    {
      id: "note-1",
      author: "Nguyễn Minh Đức (Lớp trưởng)",
      role: "Lớp trưởng",
      color: "bg-amber-100 border-amber-300 text-amber-900",
      tag: "Xúc động",
      date: "28/05/2026",
      content: "Cảm ơn 39 người anh em đã chịu đựng tiếng thét 'Trật tự nào cả lớp!' của tôi suốt 3 năm. Mong rằng tất cả chúng ta sẽ đỗ vào nguyện vọng 1 và thành công trên con đường tương lai!"
    },
    {
      id: "note-2",
      author: "Trần Thảo Linh (Bí thư)",
      role: "Bí thư",
      color: "bg-rose-100 border-rose-300 text-rose-900",
      tag: "Thanh xuân",
      date: "28/05/2026",
      content: "Có những người chỉ xuất hiện trong 3 năm học trò, nhưng lại để lại vết hằn sâu sắc trong trái tim suốt cả đời. Yêu 12A1 của tôi rất nhiều! Mãi bên nhau nhé ❤️"
    },
    {
      id: "note-3",
      author: "Lê Hoàng Long",
      role: "Cây hài 12A1",
      color: "bg-blue-100 border-blue-300 text-blue-900",
      tag: "Hài hước",
      date: "28/05/2026",
      content: "Ai còn giữ bút của tui thì trả đi nha, lên đại học không ai cho mượn đâu! Hẹn gặp lại mọi người ở buổi họp lớp 5 năm nữa, lúc đó đứa nào giàu phải khao trà sữa!"
    },
    {
      id: "note-4",
      author: "Đỗ Tuấn Kiệt",
      role: "Lớp phó Học tập",
      color: "bg-emerald-100 border-emerald-300 text-emerald-900",
      tag: "Tri thức",
      date: "29/05/2026",
      content: "Chúc cho tất cả các bạn làm bài thi đại học thật bình tĩnh, khoanh lụi trúng phóc, điểm thi rực rỡ mang vinh quang về cho 12A1 và trường của chúng ta!"
    },
    {
      id: "note-5",
      author: "Cô Nguyễn Thu Hà",
      role: "GVCN yêu quý",
      color: "bg-purple-100 border-purple-300 text-purple-900",
      tag: "Thầy cô",
      date: "30/05/2026",
      content: "Cô sẽ nhớ mãi tiếng cười đùa vang dội mỗi giờ ra chơi của 12A1. Đừng quên cô và đừng quên mái trường này nhé các con. Cánh cửa tương lai đang rộng mở đón các con!"
    },
    {
      id: "note-6",
      author: "Phạm Hà My (Thủ quỹ)",
      role: "Thủ quỹ",
      color: "bg-yellow-100 border-yellow-300 text-yellow-900",
      tag: "Kỷ niệm",
      date: "30/05/2026",
      content: "Sau hôm nay không còn ai réo tên 'My ơi còn tiền mua phấn không' nữa rồi. Tự nhiên thấy buồn ghê gớm. Chúc 12A1 chúng mình ai nấy đều thành công và hạnh phúc!"
    }
  ],

  // Playlist nhạc học trò thanh xuân nhẹ nhàng
  musicPlaylist: [
    {
      title: "Ngây Ngô - Lofi Piano Instrumental",
      artist: "Thanh xuân học trò",
      url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
    },
    {
      title: "Kỷ Niệm Mái Trường - Acoustic Melody",
      artist: "Nostalgic Vibe",
      url: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=sweet-love-109404.mp3"
    },
    {
      title: "Giấc Mơ Tuổi 18 - Gentle Piano",
      artist: "Melodic Memories",
      url: "https://cdn.pixabay.com/download/audio/2021/08/04/audio_3d183f3cc6.mp3?filename=relaxing-piano-music-11110.mp3"
    }
  ],

  // Khu vực lưu trữ đặc biệt: PKD (Cần mật khẩu bảo vệ)
  pkd: {
    password: "taoyeuconmemay1999",
    profile: {
      fullName: "Phan Khánh Duy (PKD)",
      title: "Hồ Sơ Bí Mật • Nhân Vật Huyền Thoại 12A1 🕶️",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
      birthday: "19/09/2006",
      role: "Thành viên cốt cán • Chiến thần 12A1",
      slogan: "Dù đi khắp bốn phương trời, tình nghĩa anh em 12A1 vẫn là số 1!",
      biography: "PKD - chàng trai mang năng lượng đặc biệt và cá tính nhất của tập thể 12A1. Luôn xuất hiện trong những thời khắc quan trọng nhất của lớp với phong thái điềm tĩnh nhưng không kém phần 'lầy lội'. Từng nắm giữ nhiều bí mật động trời của các thành viên trong lớp và là cầu nối tình bạn không thể thiếu suốt 3 năm thanh xuân vườn trường.",
      specialMemories: [
        "Chuyên gia giải cứu đồng đội trong những pha bị gọi lên bảng bất ngờ.",
        "Nắm giữ bộ sưu tập ảnh dìm hàng độc quyền không bao giờ công khai.",
        "Cây văn nghệ ngẫu hứng và chân sút cừ khôi của đội bóng 12A1."
      ],
      stats: {
        iq: "200+ (lúc làm bài thi)",
        humor: "Vô cực 😂",
        loyalty: "100% với 12A1",
        crush: "Bí mật quốc gia 🤫"
      }
    },
    photos: [
      {
        id: "pkd-1",
        title: "Khoảnh khắc xuất thần của PKD",
        description: "Bức ảnh kỷ niệm ghi lại nụ cười phong trần đặc trưng.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80",
        date: "Tháng 4/2026"
      },
      {
        id: "pkd-2",
        title: "Góc nghiêng thần thánh",
        description: "Giờ ra chơi bên hành lang ngập nắng của lớp 12A1.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
        date: "Tháng 12/2025"
      },
      {
        id: "pkd-3",
        title: "Chiến thần phong trào 12A1",
        description: "Cháy hết mình tại các hoạt động thể thao & dã ngoại.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80",
        date: "Tháng 11/2025"
      },
      {
        id: "pkd-4",
        title: "Những buổi chiều tan học",
        description: "Cùng anh em trà sữa, chém gió sau những giờ ôn thi căng thẳng.",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80",
        date: "Tháng 3/2026"
      }
    ]
  },

  // Danh sách Video kỷ niệm 12A1
  videos: [
    {
      id: "vid-1",
      title: "MV Kỷ Yếu 12A1 - Những Năm Tháng Rực Rỡ",
      description: "Thước phim kỷ yếu đong đầy nước mắt và nụ cười của 40 thành viên 12A1.",
      url: "https://www.youtube.com/embed/Ede_j2n0wF8",
      thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80",
      date: "28/05/2026"
    },
    {
      id: "vid-2",
      title: "Hội Diễn Văn Nghệ 26/3 - Tiết Mục Giải Nhất",
      description: "Tiết mục múa và đồng ca bùng nổ của 12A1 trên sân khấu trường.",
      url: "https://www.youtube.com/embed/7r147mI30Xk",
      thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80",
      date: "26/03/2026"
    },
    {
      id: "vid-3",
      title: "Tổng Hợp Những Trò Đùa Bá Đạo Giờ Ra Chơi",
      description: "Tuyển tập những pha tấu hài và quay lén siêu lầy lội của 12A1.",
      url: "https://www.youtube.com/embed/zpOULjyy-n8",
      thumbnail: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&auto=format&fit=crop&q=80",
      date: "15/04/2026"
    }
  ],

  // Hệ thống tài khoản phân quyền quản trị
  accounts: {
    admin: {
      username: "admin",
      password: "lygiahieu123",
      displayName: "Lý Gia Hiếu (Admin)",
      role: "admin",
      canEditAll: true,
      canEditPhotos: true,
      canEditSeating: true
    },
    guest: {
      username: "guest",
      password: "12A1",
      displayName: "Guest (Khách 12A1)",
      role: "guest",
      canEditAll: false,
      canEditPhotos: true,
      canEditSeating: false
    }
  }
};

