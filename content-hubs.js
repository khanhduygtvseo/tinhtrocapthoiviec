// Nội dung hub khu vực và ngành nghề. Số liệu duy nhất dùng trên site nằm ở SITE (members, companies).

const SITE = {
  name: 'CareerViet',
  legal: 'Công ty Cổ phần Giải pháp CareerViet',
  email: 'contact@careerviet.vn',
  hcm: { label: 'Trụ sở chính', addr: 'Tầng 6, Tòa nhà VNO, 139 Pasteur, Phường Xuân Hòa, TP. Hồ Chí Minh', tel: '(84.28) 3822 6060', telHref: '+842838226060' },
  hn: { label: 'Văn phòng Hà Nội', addr: 'Tầng 17, Tòa nhà VIT Tower, 519 Kim Mã, Phường Giảng Võ, Hà Nội', tel: '(84.24) 7305 6060', telHref: '+842473056060' },
  members: 5000000,
  companies: 20000,
  updated: '2026-10-19',
  updatedVN: '19/10/2026',
};

const REGIONS = [
  { group: 'Miền Bắc', items: [
    { slug: 'ha-noi', name: 'Hà Nội', tier: 'city', img: 'khu-vuc-do-thi', tag: 'Thủ đô' },
    { slug: 'hai-phong', name: 'Hải Phòng', tier: 'city', img: 'khu-vuc-cang', tag: 'Thành phố cảng' },
    { slug: 'quang-ninh', name: 'Quảng Ninh', tier: 'province', img: 'khu-vuc-bien', tag: 'Tỉnh ven biển' },
  ] },
  { group: 'Miền Trung', items: [
    { slug: 'da-nang', name: 'Đà Nẵng', tier: 'city', img: 'khu-vuc-cau', tag: 'Du lịch và công nghệ' },
    { slug: 'hue', name: 'Huế', tier: 'city', img: 'khu-vuc-nui', tag: 'Cố đô' },
    { slug: 'thanh-hoa', name: 'Thanh Hóa', tier: 'province', img: 'khu-vuc-kinh-te-bien', tag: 'Khu kinh tế Nghi Sơn' },
  ] },
  { group: 'Miền Nam', items: [
    { slug: 'ho-chi-minh', name: 'TP. Hồ Chí Minh', tier: 'city', img: 'khu-vuc-song', tag: 'Trung tâm kinh tế' },
    { slug: 'dong-nai', name: 'Đồng Nai', tier: 'province', img: 'khu-vuc-khu-cong-nghiep', tag: 'Tỉnh công nghiệp' },
    { slug: 'can-tho', name: 'Cần Thơ', tier: 'city', img: 'khu-vuc-ruong', tag: 'Đồng bằng sông Cửu Long' },
  ] },
];

const INDUSTRIES = [
  { slug: 'kinh-doanh-ban-hang', name: 'Kinh doanh - Bán hàng', icon: 'icon-kinh-doanh', jobs: [
    ['Nhân viên kinh doanh', 'Tìm khách mới, tư vấn sản phẩm và theo dõi đơn hàng đến khi giao xong.'],
    ['Nhân viên bán hàng', 'Tiếp khách tại điểm bán, giới thiệu sản phẩm và xử lý thanh toán.'],
    ['Tư vấn qua điện thoại', 'Gọi cho khách hàng để giới thiệu và chốt dịch vụ hoặc sản phẩm.'],
    ['Trưởng nhóm kinh doanh', 'Chia việc, theo dõi kết quả cả nhóm và hỗ trợ đồng đội ở các hợp đồng khó.'],
    ['Quản lý khu vực', 'Phụ trách một địa bàn và điều phối đội ngũ bán hàng, hệ thống phân phối.'],
  ] },
  { slug: 'tiep-thi-marketing', name: 'Tiếp thị - Marketing', icon: 'icon-marketing', jobs: [
    ['Chuyên viên digital marketing', 'Chạy quảng cáo trực tuyến, theo dõi chi phí và kết quả từng chiến dịch.'],
    ['Chuyên viên nội dung', 'Lên ý tưởng, viết bài cho website, mạng xã hội và email.'],
    ['Chuyên viên SEO', 'Tối ưu website để hiển thị tốt hơn trên công cụ tìm kiếm.'],
    ['Thiết kế đồ họa', 'Tạo hình ảnh, ấn phẩm và bộ nhận diện cho thương hiệu.'],
    ['Quản lý thương hiệu', 'Định hướng hình ảnh thương hiệu và điều phối hoạt động truyền thông.'],
  ] },
  { slug: 'hanh-chinh-thu-ky', name: 'Hành chính - Thư ký', icon: 'icon-nhan-su', jobs: [
    ['Nhân viên hành chính', 'Giữ hồ sơ, văn phòng phẩm, lịch họp và các việc hỗ trợ hằng ngày.'],
    ['Thư ký giám đốc', 'Sắp xếp lịch làm việc, tài liệu và liên lạc cho lãnh đạo.'],
    ['Lễ tân', 'Đón khách, chuyển cuộc gọi và hướng dẫn khách đến đúng bộ phận.'],
    ['Nhân viên nhân sự tổng hợp', 'Hỗ trợ tuyển dụng, chấm công, hồ sơ nhân viên và bảo hiểm.'],
    ['Trợ lý hành chính', 'Soạn văn bản, tổng hợp báo cáo và theo dõi tiến độ công việc của phòng.'],
  ] },
  { slug: 'ke-toan-kiem-toan', name: 'Kế toán - Kiểm toán', icon: 'icon-ke-toan', jobs: [
    ['Kế toán viên', 'Ghi chứng từ và theo dõi công nợ, kho hoặc tiền lương theo phần hành được giao.'],
    ['Kế toán thuế', 'Lập tờ khai, đối chiếu hóa đơn và làm việc với cơ quan thuế.'],
    ['Kế toán tổng hợp', 'Gom số liệu các phần hành để lập báo cáo tài chính.'],
    ['Kiểm toán viên', 'Kiểm tra sổ sách, báo cáo của khách hàng và nêu ý kiến độc lập.'],
    ['Kế toán trưởng', 'Tổ chức bộ máy kế toán và chịu trách nhiệm về báo cáo tài chính.'],
  ] },
  { slug: 'cong-nghe-thong-tin', name: 'Công nghệ thông tin', icon: 'icon-cntt', jobs: [
    ['Lập trình viên', 'Viết, kiểm tra và bảo trì mã nguồn của phần mềm, website hoặc ứng dụng.'],
    ['Kiểm thử phần mềm', 'Xây kịch bản kiểm thử và báo lỗi trước khi sản phẩm đến tay người dùng.'],
    ['Quản trị hệ thống', 'Vận hành máy chủ, mạng và các dịch vụ nội bộ của doanh nghiệp.'],
    ['Phân tích nghiệp vụ', 'Làm việc với bộ phận kinh doanh rồi mô tả yêu cầu cho nhóm kỹ thuật.'],
    ['Hỗ trợ kỹ thuật', 'Giải đáp và xử lý sự cố máy tính, phần mềm cho người dùng.'],
  ] },
  { slug: 'logistics-kho-van', name: 'Logistics - Kho vận', icon: 'icon-logistics', jobs: [
    ['Nhân viên xuất nhập khẩu', 'Chuẩn bị bộ chứng từ, khai báo và theo dõi lô hàng qua cửa khẩu.'],
    ['Nhân viên chứng từ', 'Lập, kiểm tra và lưu chứng từ vận chuyển, giao nhận.'],
    ['Điều phối vận tải', 'Sắp xe, tài xế và tuyến đường để hàng đến đúng hẹn.'],
    ['Nhân viên kho', 'Nhập, xuất, kiểm đếm và sắp xếp hàng hóa trong kho.'],
    ['Quản lý kho', 'Điều hành hoạt động kho, kiểm soát tồn kho và an toàn lao động.'],
  ] },
  { slug: 'xay-dung', name: 'Xây dựng', icon: 'icon-xay-dung', jobs: [
    ['Kỹ sư xây dựng', 'Triển khai bản vẽ, theo dõi tiến độ và chất lượng thi công.'],
    ['Giám sát công trình', 'Kiểm tra công việc của nhà thầu tại hiện trường so với hồ sơ thiết kế.'],
    ['Kỹ sư dự toán', 'Bóc khối lượng và lập dự toán chi phí cho công trình.'],
    ['Giám sát an toàn', 'Kiểm tra điều kiện an toàn lao động và nhắc nhở các đội thi công.'],
    ['Quản lý dự án', 'Điều phối nhân lực, ngân sách và tiến độ của một dự án xây dựng.'],
  ] },
  { slug: 'ngan-hang-tai-chinh', name: 'Ngân hàng - Tài chính', icon: 'icon-ngan-hang', jobs: [
    ['Giao dịch viên', 'Làm giao dịch tại quầy, đối chiếu chứng từ và hướng dẫn khách hàng.'],
    ['Chuyên viên tín dụng', 'Nhận hồ sơ vay, phân tích và đề xuất phương án cho vay.'],
    ['Chuyên viên thẩm định', 'Đánh giá tài sản, phương án kinh doanh và rủi ro của hồ sơ vay.'],
    ['Quan hệ khách hàng', 'Chăm sóc nhóm khách hàng được giao và giới thiệu sản phẩm phù hợp.'],
    ['Kiểm soát nội bộ', 'Rà soát việc tuân thủ quy trình và đề xuất cách cải thiện.'],
  ] },
];

// Mỗi khu vực: intro 2 câu + 3 đoạn (tổng 150–300 chữ), viết riêng cho từng nơi
const REGION_TEXT = {
  'ha-noi': {
    intro: 'Hà Nội vừa là thủ đô vừa là nơi tập trung nhiều cơ quan, trường đại học và trụ sở doanh nghiệp. Bạn có thể xem nhanh các nhóm việc làm thường gặp ở đây trước khi bắt đầu tìm tin.',
    body: [
      'Khu vực nội đô nghiêng về công việc văn phòng: hành chính, kế toán, kinh doanh, truyền thông, nhân sự và công nghệ thông tin. Trường học, bệnh viện và cơ quan nhà nước tạo thêm một nhóm việc làm quen thuộc cho người muốn môi trường làm việc ổn định.',
      'Ở các huyện ven và những tỉnh giáp ranh, khu công nghiệp lại cần nhân sự sản xuất, kho vận, bảo trì và kiểm tra chất lượng. Nếu nhà và nơi làm cách xa nhau, hãy hỏi trước giờ vào ca, xe đưa đón và chi phí đi lại, vì quãng đường mỗi ngày ảnh hưởng trực tiếp đến sức khỏe và ngân sách.',
      'Khi so sánh tin tuyển dụng, nên xem địa chỉ làm việc cụ thể thay vì chỉ nhìn tên quận. Người mới ra trường có thể tìm vị trí thực tập hoặc tập sự để làm quen, còn người đã đi làm nên chuẩn bị sẵn phần mô tả kết quả ở những vị trí trước.',
    ],
  },
  'hai-phong': {
    intro: 'Hải Phòng là thành phố cảng lớn của miền Bắc, nơi vận tải biển, công nghiệp và logistics gắn chặt với nhau. Phần dưới đây tóm tắt các nhóm việc làm nổi bật và vài điều đáng hỏi khi chọn nơi làm.',
    body: [
      'Hoạt động cảng kéo theo nhu cầu về xuất nhập khẩu, chứng từ, điều phối vận tải, kho bãi và khai thác cảng. Cạnh đó là đóng tàu, cơ khí và các nhà máy trong khu công nghiệp, nơi cần kỹ thuật viên, công nhân vận hành và nhân viên kiểm tra chất lượng.',
      'Làm trong chuỗi logistics thường phải làm việc với hãng tàu, hải quan và khách nước ngoài, nên tiếng Anh và kỹ năng bảng tính là hai điểm cộng dễ thấy. Ở vị trí vận hành, làm theo ca khá phổ biến, vì vậy hãy hỏi rõ giờ giấc và cách tính tiền làm thêm.',
      'Nhiều nhà máy nằm cách trung tâm một đoạn. Xe đưa đón, bữa ăn ca và chỗ ở cho người ở xa là những điều nên hỏi ngay trong buổi phỏng vấn. Người mới có thể bắt đầu từ chứng từ hoặc kho để quen quy trình rồi mới chọn một mảng chuyên sâu.',
    ],
  },
  'quang-ninh': {
    intro: 'Quảng Ninh nổi tiếng với vịnh Hạ Long, đồng thời có cảng biển, khai thác than và cửa khẩu biên giới. Trang này gom lại các nhóm việc làm chính của tỉnh.',
    body: [
      'Du lịch quanh vịnh tạo nhu cầu đều đặn về lễ tân, buồng phòng, bếp, điều hành tour, hướng dẫn viên và chăm sóc khách. Lượng khách đổi theo mùa nên số tin tuyển trong ngành này cũng lên xuống theo từng thời điểm của năm.',
      'Ngoài du lịch, tỉnh còn có khai thác than, cảng biển, khu công nghiệp và hoạt động thương mại qua cửa khẩu Móng Cái. Các lĩnh vực này cần kỹ sư, kỹ thuật viên, nhân viên vận hành, kế toán, giao nhận và làm thủ tục xuất nhập khẩu.',
      'Với ngành dịch vụ, hãy chuẩn bị ngoại ngữ và hỏi rõ loại hợp đồng, thu nhập lúc thấp điểm, chế độ ăn ở. Với vị trí kỹ thuật và vận hành, nên để ý chế độ an toàn lao động, ca kíp và phụ cấp đặc thù. Đọc kỹ hợp đồng trước khi ký cũng giúp tránh hiểu nhầm về thu nhập.',
    ],
  },
  'da-nang': {
    intro: 'Đà Nẵng là đô thị biển của miền Trung, nơi du lịch, dịch vụ và công nghệ cùng phát triển. Dưới đây là các nhóm việc làm phổ biến để bạn hình dung thị trường tại đây.',
    body: [
      'Du lịch và lưu trú là nhóm tuyển dụng quen thuộc, từ lễ tân, buồng phòng, nhà hàng đến điều hành tour và chăm sóc khách. Song song, các công ty phần mềm và dịch vụ công nghệ thông tin tuyển lập trình viên, kiểm thử, quản trị hệ thống và nhân viên hỗ trợ kỹ thuật.',
      'Cảng biển và các khu công nghiệp mở thêm việc cho logistics, sản xuất và kỹ thuật. Những vị trí phục vụ khách quốc tế hoặc làm cho khách hàng nước ngoài thường yêu cầu ngoại ngữ, nên chuẩn bị kỹ năng này sẽ giúp hồ sơ nổi bật hơn.',
      'Thành phố gọn nên thời gian di chuyển thường ngắn hơn ở các đô thị lớn, nhưng số công ty cũng ít hơn. Hãy mở rộng tìm kiếm sang các vị trí tương đương và cân nhắc tính thời vụ của du lịch khi chọn loại hợp đồng.',
    ],
  },
  'hue': {
    intro: 'Huế là cố đô với quần thể di sản, các trường đại học và bệnh viện lớn của miền Trung. Phần này tóm tắt những nhóm việc làm thường gặp tại thành phố.',
    body: [
      'Du lịch văn hóa gắn với di sản, ẩm thực và lễ hội là lĩnh vực nổi bật, với các vị trí lưu trú, nhà hàng, lữ hành, hướng dẫn viên và bán hàng lưu niệm. Công việc nhóm này thường cần giao tiếp tốt và ngoại ngữ cơ bản.',
      'Giáo dục và y tế là nhóm việc ổn định khác, gồm giảng dạy, nghiên cứu, điều dưỡng, kỹ thuật viên xét nghiệm và các vị trí hành chính hỗ trợ. Ngoài ra còn có việc ở những doanh nghiệp chế biến, thương mại và dịch vụ quy mô vừa, nhỏ.',
      'Tin tuyển dụng ở Huế thường không nhiều bằng các đô thị lớn, nên cần theo dõi đều đặn và chuẩn bị sẵn hồ sơ để ứng tuyển nhanh. Nếu muốn làm theo mùa du lịch, hãy hỏi rõ thời hạn hợp đồng và chế độ khi hết mùa cao điểm.',
    ],
  },
  'thanh-hoa': {
    intro: 'Thanh Hóa là tỉnh lớn của miền Trung, có khu kinh tế Nghi Sơn, bãi biển Sầm Sơn và nhiều khu công nghiệp. Trang này tóm tắt các nhóm việc làm chính của địa phương.',
    body: [
      'Khu kinh tế Nghi Sơn có cảng biển, nhà máy lọc hóa dầu, nhiệt điện và xi măng. Các đơn vị này cần kỹ sư, kỹ thuật viên vận hành, nhân viên an toàn, bảo trì, kho bãi, kế toán và hành chính. Bên cạnh đó là các khu công nghiệp tuyển công nhân may mặc, giày da, lắp ráp và nhân viên kiểm tra chất lượng.',
      'Du lịch biển ở Sầm Sơn tạo thêm việc cho khách sạn, nhà hàng, lễ tân, buồng phòng, điều hành tour và chăm sóc khách. Lượng khách tăng mạnh vào mùa hè nên số tin tuyển cũng đổi theo mùa; hãy hỏi rõ thời hạn hợp đồng và thu nhập khi hết mùa cao điểm.',
      'Tỉnh rộng, nhà máy nằm rải rác nên quãng đường đi làm đáng được cân nhắc. Trước khi nhận việc, hãy hỏi về xe đưa đón, chỗ ở cho người ở xa, bữa ăn ca, cách tính tiền làm thêm giờ và phụ cấp. Với vị trí kỹ thuật và vận hành, nên xem kỹ chế độ an toàn lao động và ca kíp.',
    ],
  },
  'ho-chi-minh': {
    intro: 'TP. Hồ Chí Minh là trung tâm thương mại, tài chính và dịch vụ lớn của cả nước. Trang này nêu các nhóm việc làm chính và những điều nên lưu ý khi ứng tuyển.',
    body: [
      'Thành phố có nhu cầu tuyển ở hầu hết lĩnh vực: bán lẻ, ngân hàng và tài chính, công nghệ thông tin, logistics, truyền thông, giáo dục và dịch vụ. Khu trung tâm tập trung văn phòng công ty, còn các khu chế xuất và khu công nghiệp phía ven cần công nhân, kỹ thuật viên và nhân sự vận hành. Người mới có thể bắt đầu từ vị trí hỗ trợ hoặc bán hàng để làm quen với nhịp làm việc của thành phố.',
      'Lượng ứng viên lớn khiến nhà tuyển dụng chú ý đến kết quả cụ thể trong hồ sơ. Thay vì liệt kê đầu việc chung chung, hãy ghi rõ phạm vi phụ trách, công cụ đã dùng và điều đã đạt được ở từng vị trí trước.',
      'Quãng đường đi làm đáng được cân nhắc vì thành phố rộng và giờ cao điểm kéo dài. Ngoài mức thu nhập hằng tháng, hãy xem địa chỉ làm việc, giờ làm, chế độ phúc lợi và lộ trình tăng lương.',
    ],
  },
  'dong-nai': {
    intro: 'Đồng Nai là tỉnh công nghiệp lớn của miền Nam, liền kề TP. Hồ Chí Minh. Dưới đây là các nhóm việc làm chính của địa phương.',
    body: [
      'Các khu công nghiệp ở Biên Hòa, Nhơn Trạch và Long Thành thu hút nhiều nhà máy trong nước lẫn nước ngoài. Doanh nghiệp tại đây thường tuyển công nhân sản xuất, kỹ thuật viên, kiểm tra chất lượng, nhân viên kho, mua hàng và quản lý xưởng.',
      'Bên cạnh khối sản xuất là các vị trí hỗ trợ như kế toán, hành chính nhân sự, xuất nhập khẩu và phiên dịch. Công ty có vốn nước ngoài hay yêu cầu thêm ngoại ngữ, nên người biết tiếng Anh hoặc một ngoại ngữ khác sẽ có thêm lựa chọn.',
      'Vì sát TP. Hồ Chí Minh, nhiều người ở nơi này nhưng làm ở nơi kia. Trước khi nhận việc, hãy hỏi về xe đưa đón, ca làm, cách tính làm thêm giờ và phụ cấp. Người mới có thể khởi đầu ở vị trí vận hành hoặc hỗ trợ văn phòng, rồi tích lũy dần để lên tổ trưởng hay chuyên viên.',
    ],
  },
  'can-tho': {
    intro: 'Cần Thơ là trung tâm thương mại, giáo dục và y tế của Đồng bằng sông Cửu Long. Phần dưới đây điểm qua các nhóm việc làm thường gặp tại đây.',
    body: [
      'Giữ vai trò đầu mối của cả vùng, Cần Thơ có nhu cầu đều về bán hàng, chăm sóc khách hàng, ngân hàng, kế toán và hành chính văn phòng. Các doanh nghiệp chế biến nông sản, thủy sản và thực phẩm tuyển kỹ sư, kỹ thuật viên, nhân viên kinh doanh vùng và kiểm soát chất lượng.',
      'Trường đại học và bệnh viện lớn mở thêm việc cho giảng dạy, nghiên cứu, y tế và dịch vụ hỗ trợ. Du lịch sông nước với chợ nổi và vườn trái cây cũng tạo ra các vị trí lưu trú, hướng dẫn, ẩm thực và vận chuyển khách.',
      'Thị trường có quy mô vừa phải, nên hãy liên hệ trực tiếp doanh nghiệp và xem tin mới thường xuyên. Tin học văn phòng, ngoại ngữ và kinh nghiệm thực tế là lợi thế khi ứng tuyển vào các công ty lớn trong vùng; hãy so thu nhập với chi phí sinh hoạt tại chỗ để chọn nơi phù hợp.',
    ],
  },
};

const INDUSTRY_TEXT = {
  'kinh-doanh-ban-hang': {
    intro: 'Kinh doanh - Bán hàng là nhóm nghề có mặt ở hầu hết lĩnh vực và quy mô doanh nghiệp. Bạn có thể xem các vị trí chính dưới đây để chọn hướng đi.',
    body: [
      'Gần như doanh nghiệp nào cũng cần người giới thiệu sản phẩm và chăm sóc khách, nên công việc nhóm này xuất hiện ở nhiều nơi và nhiều hình thức: bán tại cửa hàng, đi thị trường, tư vấn qua điện thoại hoặc quản lý một nhóm bán hàng.',
      'Nhà tuyển dụng thường quan tâm đến giao tiếp, sự kiên trì và khả năng thuyết phục. Thu nhập ở nhiều vị trí gồm lương cố định cộng thưởng hoặc hoa hồng theo kết quả, vì vậy hãy đọc kỹ cách tính, chỉ tiêu và thời điểm ghi nhận doanh số trước khi nhận việc.',
      'Người mới có thể bắt đầu ở vị trí bán hàng hoặc tư vấn để làm quen sản phẩm và khách, sau đó lên trưởng nhóm hoặc quản lý khu vực. Ghi lại kết quả cụ thể như số khách đã chăm sóc hay mục tiêu đã đạt sẽ giúp hồ sơ thuyết phục hơn.',
    ],
  },
  'tiep-thi-marketing': {
    intro: 'Tiếp thị - Marketing gồm nhiều mảng việc, từ nội dung và quảng cáo đến thương hiệu. Phần này giúp bạn phân biệt các vị trí để chọn hướng phù hợp.',
    body: [
      'Marketing hiện chia thành nội dung, quảng cáo trực tuyến, SEO, mạng xã hội, thiết kế và nghiên cứu thị trường. Doanh nghiệp nhỏ thường dồn nhiều việc cho một người, còn công ty lớn tách thành các vị trí chuyên biệt với quy trình rõ hơn.',
      'Các kỹ năng được quan tâm gồm viết lách, đọc số liệu, dùng công cụ quảng cáo và báo cáo kết quả chiến dịch. Một bộ sản phẩm thật như bài viết, thiết kế hay báo cáo chiến dịch thường thuyết phục hơn những dòng mô tả chung chung.',
      'Nếu mới vào nghề, bạn có thể chọn một mảng để làm sâu trong một đến hai năm đầu rồi mở rộng sang mảng liên quan. Khi đọc tin tuyển, hãy chú ý phạm vi công việc, công cụ được dùng và cách công ty đo hiệu quả; trao đổi trước về thời gian làm việc lúc chiến dịch cao điểm cũng là điều nên làm.',
    ],
  },
  'hanh-chinh-thu-ky': {
    intro: 'Hành chính - Thư ký là nhóm công việc giữ cho văn phòng vận hành trơn tru mỗi ngày. Dưới đây là các vị trí chính và kỹ năng thường được yêu cầu.',
    body: [
      'Văn phòng nào cũng cần người giữ hồ sơ, tiếp khách, xếp lịch họp và kết nối các phòng ban, nên việc hành chính có ở hầu hết lĩnh vực. Các vị trí phổ biến gồm nhân viên hành chính, lễ tân, thư ký, trợ lý và nhân sự tổng hợp.',
      'Nhà tuyển dụng hay tìm người cẩn thận, giao tiếp lịch sự, dùng thành thạo công cụ văn phòng và biết xếp thứ tự ưu tiên. Với thư ký hoặc trợ lý cho lãnh đạo, khả năng giữ kín thông tin và ngoại ngữ thường là điểm cộng.',
      'Đây là nhóm nghề phù hợp để làm quen môi trường công sở. Từ hành chính, bạn có thể chuyển sang nhân sự, mua hàng hoặc quản lý văn phòng khi đã nắm quy trình của doanh nghiệp. Trong hồ sơ, hãy ghi rõ phần việc đã phụ trách và công cụ đã dùng.',
    ],
  },
  'ke-toan-kiem-toan': {
    intro: 'Kế toán - Kiểm toán có nhu cầu tuyển ở hầu hết doanh nghiệp. Hãy xem các vị trí chính dưới đây để nắm hướng đi trước khi tìm tin.',
    body: [
      'Doanh nghiệp nào cũng phải ghi sổ, kê khai thuế và lập báo cáo tài chính, nên công việc kế toán trải từ một phần hành như công nợ, kho, tiền lương cho đến kế toán tổng hợp, kế toán trưởng và kiểm toán viên.',
      'Yêu cầu thường gặp là nắm quy định kế toán và thuế đang áp dụng, dùng thành thạo phần mềm kế toán và bảng tính, cẩn thận với số liệu. Với kiểm toán, ứng viên còn cần chịu được áp lực thời gian vào mùa lập báo cáo và sẵn sàng làm tại đơn vị khách hàng.',
      'Người mới thường bắt đầu từ một phần hành để tích lũy rồi mở rộng sang tổng hợp, hoặc sang kiểm toán nếu thích học nhanh. Chứng chỉ nghề nghiệp là điểm cộng khi xét lên vị trí cao hơn. Hãy hỏi rõ quy trình chốt sổ cuối kỳ, vì giai đoạn này thường kéo theo làm thêm giờ.',
    ],
  },
  'cong-nghe-thong-tin': {
    intro: 'Công nghệ thông tin gồm nhiều nhóm việc như lập trình, kiểm thử và vận hành hệ thống. Phần này giúp bạn phân biệt các vị trí và chọn hướng phát triển.',
    body: [
      'Nhu cầu nhân sự công nghệ đến từ cả công ty phần mềm lẫn những doanh nghiệp ngành khác đang số hóa hoạt động. Các vị trí thường gặp gồm lập trình viên, kiểm thử, quản trị hệ thống, phân tích nghiệp vụ, quản lý sản phẩm và hỗ trợ kỹ thuật.',
      'Nhà tuyển dụng thường coi trọng sản phẩm đã làm, khả năng đọc tài liệu tiếng Anh và tinh thần tự học vì công cụ thay đổi nhanh. Hồ sơ nêu rõ dự án, vai trò của bạn và công nghệ đã dùng sẽ dễ gây chú ý hơn một danh sách ngôn ngữ lập trình.',
      'Người mới có thể bắt đầu bằng thực tập, kiểm thử hoặc hỗ trợ kỹ thuật để hiểu quy trình, rồi chuyên sâu một hướng. Khi so sánh lời mời, hãy xem công nghệ sử dụng, cách tổ chức nhóm và cơ hội đào tạo, không chỉ mức thu nhập.',
    ],
  },
  'logistics-kho-van': {
    intro: 'Logistics - Kho vận gồm các công việc điều phối hàng hóa, chứng từ và vận tải. Phần này giúp bạn hiểu các vị trí chính trước khi xem tin tuyển dụng.',
    body: [
      'Logistics gắn với sản xuất, thương mại và xuất nhập khẩu, nên nhu cầu nhân sự đổi theo nhịp của các ngành đó. Các vị trí phổ biến gồm xuất nhập khẩu, chứng từ, kho, điều phối vận tải và quản lý kho.',
      'Công việc đòi hỏi cẩn thận với chứng từ, nắm thời hạn giao nhận và biết phối hợp với hải quan, hãng vận tải, khách hàng. Tiếng Anh giao tiếp và kỹ năng bảng tính là hai lợi thế rõ, nhất là ở công ty giao nhận quốc tế.',
      'Một công việc có thể xuất hiện dưới nhiều tên gọi, nên hãy tìm bằng cả tiếng Việt, tiếng Anh và tên công đoạn như chứng từ, kho vận hay xuất nhập khẩu. Người mới thường khởi đầu từ chứng từ hoặc kho. Vì lịch giao nhận có thể kéo dài ngoài giờ hành chính, hãy hỏi rõ cách xếp ca và tính tiền làm thêm.',
    ],
  },
  'xay-dung': {
    intro: 'Xây dựng gồm các công việc từ thiết kế, dự toán đến thi công và giám sát. Dưới đây là các vị trí chính và yêu cầu thường gặp trong ngành.',
    body: [
      'Một công trình đi qua nhiều giai đoạn nên ngành có nhiều vị trí: kỹ sư thiết kế, dự toán, kỹ sư hiện trường, giám sát, an toàn lao động và quản lý dự án. Nhu cầu đổi theo nhịp đầu tư, nhưng công trình dân dụng, hạ tầng và nhà xưởng luôn cần người ở nhiều địa phương.',
      'Nhà tuyển dụng chú ý chuyên môn kỹ thuật, khả năng đọc bản vẽ, mức thành thạo phần mềm thiết kế hoặc dự toán và chứng chỉ hành nghề phù hợp. Việc ở hiện trường đòi hỏi sức khỏe, tinh thần trách nhiệm và sẵn sàng đi công tác xa.',
      'Người mới thường bắt đầu ở hiện trường hoặc giám sát để tích lũy, sau đó chuyên sâu sang dự toán hay quản lý dự án. Khi xem tin, hãy hỏi rõ địa điểm công trình, công tác phí, bảo hiểm và điều kiện an toàn lao động.',
    ],
  },
  'ngan-hang-tai-chinh': {
    intro: 'Ngân hàng - Tài chính gồm các vị trí giao dịch, tín dụng, thẩm định và chăm sóc khách hàng. Phần này tóm tắt các nhóm việc chính trong ngành.',
    body: [
      'Hệ thống ngân hàng và tổ chức tài chính có mạng lưới chi nhánh rộng nên nhu cầu nhân sự nằm ở nhiều tỉnh thành. Các vị trí phổ biến gồm giao dịch viên, tín dụng, thẩm định, quan hệ khách hàng cá nhân và doanh nghiệp, kiểm soát nội bộ và vận hành.',
      'Nền tảng tài chính, kế toán hoặc kinh tế, sự cẩn thận với số liệu và tinh thần tuân thủ quy trình là những yêu cầu thường gặp. Với vị trí kinh doanh, nhà tuyển dụng còn quan tâm đến khả năng phát triển khách hàng và hoàn thành chỉ tiêu.',
      'Người mới thường bắt đầu từ giao dịch viên hoặc hỗ trợ tín dụng để hiểu nghiệp vụ rồi lên chuyên viên và quản lý. Khi so sánh lời mời, hãy hỏi kỹ cách tính thưởng, chỉ tiêu doanh số và lộ trình thăng tiến; với vị trí giao dịch, cũng nên xác nhận giờ làm và ngày nghỉ hằng tuần của chi nhánh.',
    ],
  },
};

module.exports = { SITE, REGIONS, INDUSTRIES, REGION_TEXT, INDUSTRY_TEXT };

