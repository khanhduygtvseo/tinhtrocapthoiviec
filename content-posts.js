// Bài blog. Căn cứ: Bộ luật Lao động 2019, Nghị định 145/2020/NĐ-CP. Khối p dùng {{tool}} để chèn liên kết nội bộ tới công cụ.
const TABS = [
  { id: 'cac-loai-tro-cap', name: 'Các loại trợ cấp' },
  { id: 'cach-tinh', name: 'Cách tính' },
  { id: 'nghi-viec', name: 'Nghỉ việc và chấm dứt hợp đồng' },
];

const LAW_SRC = {
  blld: 'Bộ luật Lao động 2019 (Bộ luật số 45/2019/QH14)',
  nd145: 'Nghị định số 145/2020/NĐ-CP ngày 14/12/2020 của Chính phủ quy định chi tiết và hướng dẫn thi hành một số điều của Bộ luật Lao động về điều kiện lao động và quan hệ lao động',
  nd12: 'Nghị định số 12/2022/NĐ-CP ngày 17/01/2022 của Chính phủ quy định xử phạt vi phạm hành chính trong lĩnh vực lao động, bảo hiểm xã hội, người lao động Việt Nam đi làm việc ở nước ngoài theo hợp đồng',
};
const CHECKED = '19/10/2026';

const POSTS = [
  {
    slug: 'phan-biet-tro-cap-thoi-viec-mat-viec-that-nghiep', tab: 'cac-loai-tro-cap', cover: 'blog-phan-biet-tro-cap', published: '2026-10-05', read: 6,
    title: 'Trợ cấp thôi việc, trợ cấp mất việc làm và trợ cấp thất nghiệp khác nhau thế nào?',
    desc: 'Phân biệt ba khoản trợ cấp hay bị nhầm: ai trả, điều kiện, mức hưởng và căn cứ trong Bộ luật Lao động 2019.',
    summary: [
      'Trợ cấp thôi việc và trợ cấp mất việc làm do người sử dụng lao động trả; trợ cấp thất nghiệp lấy từ quỹ bảo hiểm thất nghiệp.',
      'Cả hai khoản của doanh nghiệp đều đòi hỏi làm việc thường xuyên từ đủ 12 tháng trở lên.',
      'Trợ cấp thôi việc: nửa tháng lương cho mỗi năm làm việc. Trợ cấp mất việc làm: một tháng lương cho mỗi năm, thấp nhất hai tháng lương.',
    ],
    sections: [
      { h2: 'Trợ cấp thôi việc', blocks: [
        { p: 'Trợ cấp thôi việc được quy định tại Điều 46 Bộ luật Lao động 2019. Khi hợp đồng lao động chấm dứt thuộc các trường hợp luật liệt kê, người sử dụng lao động phải trả trợ cấp cho người lao động đã làm việc thường xuyên cho mình từ đủ 12 tháng trở lên. Mỗi năm làm việc được tính nửa tháng tiền lương.' },
        { p: 'Các trường hợp chấm dứt được trả trợ cấp thôi việc gồm hết hạn hợp đồng, hoàn thành công việc theo hợp đồng, hai bên thỏa thuận chấm dứt, một trong hai bên đơn phương chấm dứt đúng quy định, cùng một số trường hợp khác nêu ở Điều 34. Có hai ngoại lệ đáng nhớ: người lao động đã đủ điều kiện hưởng lương hưu, và người lao động tự ý bỏ việc từ 05 ngày làm việc liên tục trở lên mà không có lý do chính đáng.' },
      ] },
      { h2: 'Trợ cấp mất việc làm', blocks: [
        { p: 'Trợ cấp mất việc làm nằm ở Điều 47. Khoản này dành cho người lao động mất việc vì doanh nghiệp thay đổi cơ cấu, thay đổi công nghệ hoặc vì lý do kinh tế (Điều 42), hoặc vì doanh nghiệp chia, tách, hợp nhất, sáp nhập, bán, cho thuê, chuyển đổi loại hình hay chuyển nhượng quyền sở hữu, quyền sử dụng tài sản (Điều 43).' },
        { p: 'Điều kiện về thời gian vẫn là làm việc thường xuyên từ đủ 12 tháng trở lên. Mức trả là một tháng tiền lương cho mỗi năm làm việc, nhưng không thấp hơn hai tháng tiền lương. Vì vậy, người làm một năm vẫn nhận tối thiểu hai tháng lương nếu thuộc diện được hưởng.' },
      ] },
      { h2: 'Trợ cấp thất nghiệp là khoản riêng', blocks: [
        { p: 'Trợ cấp thất nghiệp không do công ty trả. Khoản này được chi từ quỹ bảo hiểm thất nghiệp theo pháp luật về việc làm, dựa trên thời gian đã đóng bảo hiểm thất nghiệp và cần đăng ký tại trung tâm dịch vụ việc làm. Mức hưởng và thời gian hưởng được quy định ở văn bản về việc làm và bảo hiểm thất nghiệp, nên hãy xem quy định đang có hiệu lực tại thời điểm bạn nộp hồ sơ.' },
      ] },
      { h2: 'Bảng so sánh nhanh', blocks: [
        { table: { head: ['Tiêu chí', 'Trợ cấp thôi việc', 'Trợ cấp mất việc làm', 'Trợ cấp thất nghiệp'], rows: [
          ['Căn cứ', 'Điều 46 Bộ luật Lao động 2019', 'Điều 47 Bộ luật Lao động 2019', 'Pháp luật về việc làm và bảo hiểm thất nghiệp'],
          ['Ai trả', 'Người sử dụng lao động', 'Người sử dụng lao động', 'Quỹ bảo hiểm thất nghiệp'],
          ['Điều kiện chính', 'Làm việc thường xuyên từ đủ 12 tháng; hợp đồng chấm dứt thuộc các trường hợp luật quy định', 'Làm việc thường xuyên từ đủ 12 tháng; mất việc do thay đổi cơ cấu, công nghệ, lý do kinh tế hoặc các trường hợp ở Điều 43', 'Có thời gian đóng bảo hiểm thất nghiệp theo quy định và đăng ký thất nghiệp'],
          ['Mức hưởng', 'Nửa tháng lương cho mỗi năm làm việc', 'Một tháng lương cho mỗi năm, thấp nhất hai tháng lương', 'Theo công thức của pháp luật về bảo hiểm thất nghiệp'],
        ] } },
      ] },
      { h2: 'Có nhận cùng lúc được không?', blocks: [
        { p: 'Trợ cấp thất nghiệp là quyền lợi độc lập, nên người đủ điều kiện có thể nhận song song với trợ cấp mất việc làm do doanh nghiệp trả. Riêng hai khoản trợ cấp của doanh nghiệp thì khoảng thời gian đã được trả một khoản sẽ bị trừ khi tính khoản sau, nên cùng một quãng làm việc không bị tính hai lần.' },
        { p: 'Nếu muốn ước tính số tiền, bạn có thể dùng {{tool}} ngay trên trang này, nhập thời gian làm việc, thời gian đã đóng bảo hiểm thất nghiệp và mức lương bình quân.' },
      ] },
    ],
    sources: [LAW_SRC.blld + ': Điều 34, 42, 43, 46, 47.'],
  },
  {
    slug: 'thoi-gian-lam-viec-de-tinh-tro-cap', tab: 'cach-tinh', cover: 'blog-thoi-gian-lam-viec', published: '2026-10-07', read: 6,
    title: 'Cách xác định thời gian làm việc để tính trợ cấp thôi việc, mất việc làm',
    desc: 'Công thức trừ thời gian bảo hiểm thất nghiệp, cách làm tròn tháng lẻ và ba ví dụ tính tay.',
    summary: [
      'Thời gian tính trợ cấp = tổng thời gian làm việc thực tế cho người sử dụng lao động, trừ thời gian đã tham gia bảo hiểm thất nghiệp và thời gian đã được trả trợ cấp thôi việc, trợ cấp mất việc làm.',
      'Tháng lẻ: từ 1 đến 6 tháng tính 1/2 năm, trên 6 tháng tính 1 năm.',
      'Điều kiện để được xét vẫn là làm việc thường xuyên từ đủ 12 tháng trở lên.',
    ],
    sections: [
      { h2: 'Công thức trừ thời gian', blocks: [
        { p: 'Theo khoản 2 Điều 46 Bộ luật Lao động 2019, thời gian làm việc để tính trợ cấp thôi việc là tổng thời gian người lao động đã làm việc thực tế cho người sử dụng lao động, trừ đi hai khoảng: thời gian đã tham gia bảo hiểm thất nghiệp, và thời gian đã được người sử dụng lao động chi trả trợ cấp thôi việc, trợ cấp mất việc làm. Trợ cấp mất việc làm tại Điều 47 dùng cùng cách tính này.' },
        { p: 'Lý do của việc trừ là thời gian đã đóng bảo hiểm thất nghiệp đã được quỹ bảo hiểm bảo vệ, còn thời gian từng được trả trợ cấp thì không nên được trả lần nữa. Người đã đi làm lâu năm nhưng đóng bảo hiểm thất nghiệp gần như suốt thời gian đó có thể còn rất ít thời gian để tính.' },
      ] },
      { h2: 'Những khoảng thời gian được tính là làm việc thực tế', blocks: [
        { p: 'Thời gian làm việc thực tế không chỉ là những ngày ngồi tại chỗ làm. Theo hướng dẫn của Chính phủ, thời gian này còn gồm các khoảng như:' },
        { ul: [
          'thời gian làm việc theo hợp đồng lao động;',
          'thời gian được người sử dụng lao động cử đi học mà vẫn hưởng lương;',
          'thời gian nghỉ ốm đau, thai sản theo quy định;',
          'thời gian nghỉ hằng tuần, nghỉ phép năm và nghỉ việc riêng có hưởng lương;',
          'thời gian ngừng việc không do lỗi của người lao động.',
        ] },
        { p: 'Khi chuẩn bị số liệu, bạn nên đối chiếu hợp đồng, quyết định nghỉ và sổ bảo hiểm xã hội để xác định chính xác ngày bắt đầu, ngày kết thúc và các khoảng nghỉ không hưởng lương nếu có.' },
      ] },
      { h2: 'Quy đổi tháng lẻ', blocks: [
        { p: 'Thời gian được tính theo năm đủ 12 tháng. Phần tháng lẻ được quy đổi theo điểm c khoản 3 Điều 8 Nghị định 145/2020/NĐ-CP: tháng lẻ ít hơn hoặc bằng 06 tháng tính bằng 1/2 năm, trên 06 tháng tính bằng 01 năm làm việc.' },
        { table: { head: ['Số tháng lẻ', 'Quy đổi'], rows: [['0 tháng', 'Không cộng thêm'], ['Từ 1 đến 6 tháng', 'Cộng 0,5 năm'], ['Từ 7 đến 11 tháng', 'Cộng 1 năm']] } },
      ] },
      { h2: 'Ba ví dụ tính tay', blocks: [
        { h3: 'Ví dụ 1: 5 năm 3 tháng, không có bảo hiểm thất nghiệp' },
        { p: 'Tổng thời gian 63 tháng. Không có khoản nào phải trừ. Phần dư 3 tháng nằm trong khoảng 1 đến 6 tháng nên cộng 0,5 năm. Thời gian tính trợ cấp là 5,5 năm.' },
        { h3: 'Ví dụ 2: 8 năm 4 tháng, đã đóng bảo hiểm thất nghiệp 3 năm' },
        { p: 'Tổng 100 tháng, trừ 36 tháng bảo hiểm thất nghiệp còn 64 tháng, tức 5 năm 4 tháng. Phần dư 4 tháng cộng 0,5 năm. Thời gian tính trợ cấp là 5,5 năm.' },
        { h3: 'Ví dụ 3: 7 năm 9 tháng, không có khoản nào phải trừ' },
        { p: 'Tổng 93 tháng, tức 7 năm 9 tháng. Phần dư 9 tháng lớn hơn 6 nên cộng 1 năm. Thời gian tính trợ cấp là 8 năm.' },
        { p: 'Để không phải tự nhẩm, bạn có thể nhập số tháng vào {{tool}}, công cụ sẽ trừ các khoản và quy đổi tháng lẻ giúp bạn.' },
      ] },
    ],
    sources: [LAW_SRC.blld + ': Điều 46, Điều 47.', LAW_SRC.nd145 + ': Điều 8.'],
  },
  {
    slug: 'tien-luong-lam-can-cu-tinh-tro-cap', tab: 'cach-tinh', cover: 'blog-tien-luong-can-cu', published: '2026-10-09', read: 5,
    title: 'Tiền lương làm căn cứ tính trợ cấp thôi việc, mất việc làm là bao nhiêu?',
    desc: 'Cách lấy bình quân tiền lương 6 tháng liền kề theo hợp đồng lao động, kèm ví dụ và điều cần làm khi bị trả thiếu.',
    summary: [
      'Mức lương để tính trợ cấp là bình quân tiền lương của 06 tháng liền kề theo hợp đồng lao động, trước thời điểm thôi việc hoặc mất việc làm.',
      'Cách tính: cộng lương 6 tháng rồi chia 6.',
      'Doanh nghiệp không trả hoặc trả thiếu có thể bị xử phạt hành chính và phải trả đủ kèm tiền lãi.',
    ],
    sections: [
      { h2: 'Quy định trong Bộ luật Lao động', blocks: [
        { p: 'Khoản 3 Điều 46 Bộ luật Lao động 2019 quy định tiền lương để tính trợ cấp thôi việc là tiền lương bình quân của 06 tháng liền kề theo hợp đồng lao động trước khi người lao động thôi việc. Trợ cấp mất việc làm tại Điều 47 cũng lấy mốc 06 tháng liền kề trước khi người lao động mất việc làm.' },
        { p: 'Chữ "liền kề" nghĩa là sáu tháng đứng sát ngay trước thời điểm chấm dứt hợp đồng, không phải sáu tháng bất kỳ hay sáu tháng có lương cao nhất.' },
      ] },
      { h2: 'Cách tính bình quân', blocks: [
        { p: 'Bạn cộng tiền lương của sáu tháng liền kề rồi chia cho 6. Ví dụ, nếu tổng tiền lương theo hợp đồng của sáu tháng cuối là 120 triệu đồng thì mức bình quân dùng để tính trợ cấp là 20 triệu đồng một tháng.' },
        { table: { head: ['Tháng', 'Tiền lương theo hợp đồng (triệu đồng)'], rows: [['Tháng 1', '18'], ['Tháng 2', '18'], ['Tháng 3', '20'], ['Tháng 4', '20'], ['Tháng 5', '22'], ['Tháng 6', '22']] } },
        { p: 'Cộng lại được 120 triệu đồng, chia 6 ra 20 triệu đồng. Nếu thời gian tính trợ cấp là 5,5 năm, trợ cấp thôi việc bằng 0,5 × 5,5 × 20 = 55 triệu đồng.' },
      ] },
      { h2: 'Nên đối chiếu những khoản nào', blocks: [
        { p: 'Cụm "theo hợp đồng lao động" khiến nhiều người băn khoăn về các khoản ngoài mức lương cơ bản. Theo Điều 90 Bộ luật Lao động 2019, tiền lương gồm mức lương theo công việc hoặc chức danh, phụ cấp lương và các khoản bổ sung khác. Bạn nên đọc hợp đồng, phụ lục và bảng lương của sáu tháng cuối để xem khoản nào được ghi là một phần của tiền lương và khoản nào là thưởng hay hỗ trợ riêng.' },
        { p: 'Nếu hợp đồng hoặc quy chế của công ty có mức trợ cấp cao hơn luật, bạn được hưởng theo thỏa thuận đó. Công cụ trên trang này chỉ tính theo mức tối thiểu của Bộ luật Lao động.' },
      ] },
      { h2: 'Khi doanh nghiệp không trả hoặc trả thiếu', blocks: [
        { p: 'Việc không trả, hoặc trả không đủ trợ cấp thôi việc và trợ cấp mất việc làm là hành vi bị xử phạt vi phạm hành chính theo Nghị định 12/2022/NĐ-CP. Ngoài tiền phạt, doanh nghiệp còn bị buộc trả đủ khoản trợ cấp cùng tiền lãi tính trên số tiền chưa trả.' },
        { p: 'Trước khi khiếu nại, bạn nên tự tính lại bằng {{tool}}, lưu bảng lương sáu tháng cuối, hợp đồng và quyết định chấm dứt để có căn cứ trao đổi với người sử dụng lao động hoặc cơ quan quản lý lao động.' },
      ] },
    ],
    sources: [LAW_SRC.blld + ': Điều 46, Điều 47, Điều 90.', LAW_SRC.nd12 + '.'],
  },
  {
    slug: 'cac-khoan-tien-nhan-khi-nghi-viec', tab: 'nghi-viec', cover: 'blog-khoan-tien-khi-nghi-viec', published: '2026-10-12', read: 6,
    title: 'Những khoản tiền người lao động được nhận khi nghỉ việc',
    desc: 'Danh sách các khoản có thể nhận khi hợp đồng chấm dứt, thời hạn thanh toán và giấy tờ cần nhận lại.',
    summary: [
      'Khi nghỉ việc, ngoài lương còn có thể nhận tiền ngày phép chưa nghỉ và trợ cấp thôi việc hoặc trợ cấp mất việc làm nếu đủ điều kiện.',
      'Hai bên phải thanh toán đầy đủ các khoản trong 14 ngày làm việc kể từ ngày chấm dứt hợp đồng; một số trường hợp có thể kéo dài nhưng không quá 30 ngày.',
      'Người lao động cũng cần được xác nhận thời gian đóng bảo hiểm xã hội và trả lại giấy tờ gốc đã giữ.',
    ],
    sections: [
      { h2: 'Tiền lương còn lại', blocks: [
        { p: 'Khoản đầu tiên là tiền lương của những ngày đã làm mà chưa được trả. Theo Điều 48 Bộ luật Lao động 2019, trong vòng 14 ngày làm việc kể từ ngày chấm dứt hợp đồng, hai bên có trách nhiệm thanh toán đầy đủ các khoản liên quan đến quyền lợi của mỗi bên.' },
        { p: 'Thời hạn này có thể kéo dài nhưng không quá 30 ngày trong một số trường hợp, ví dụ người sử dụng lao động chấm dứt hoạt động, thay đổi cơ cấu hoặc công nghệ, gặp khó khăn vì lý do kinh tế, hay phải chia, tách, hợp nhất, sáp nhập.' },
      ] },
      { h2: 'Tiền ngày phép năm chưa nghỉ', blocks: [
        { p: 'Theo khoản 3 Điều 113 Bộ luật Lao động 2019, người lao động thôi việc hoặc mất việc làm mà chưa nghỉ hoặc chưa nghỉ hết số ngày phép năm thì được người sử dụng lao động thanh toán tiền lương cho những ngày chưa nghỉ. Trước ngày nghỉ, bạn nên hỏi bộ phận nhân sự số ngày phép còn lại và ghi lại bằng văn bản.' },
      ] },
      { h2: 'Trợ cấp thôi việc hoặc trợ cấp mất việc làm', blocks: [
        { p: 'Người làm việc thường xuyên từ đủ 12 tháng trở lên có thể nhận trợ cấp thôi việc (Điều 46) hoặc trợ cấp mất việc làm (Điều 47), tùy lý do chấm dứt hợp đồng. Hai khoản này loại trừ nhau trong cùng một lần chấm dứt, vì mỗi lý do chấm dứt chỉ thuộc một điều luật.' },
        { p: 'Hãy ước tính số tiền bằng {{tool}} trước khi làm việc với bộ phận nhân sự, để biết con số tối thiểu theo luật.' },
      ] },
      { h2: 'Các khoản theo thỏa thuận riêng', blocks: [
        { p: 'Hợp đồng lao động, thỏa ước lao động tập thể hoặc quy chế của công ty có thể quy định thêm các khoản như thưởng, hoa hồng đã chốt hay hỗ trợ khi nghỉ việc. Đây là những khoản bạn được hưởng theo thỏa thuận, không phụ thuộc vào công thức trợ cấp trong luật.' },
      ] },
      { h2: 'Giấy tờ và bảo hiểm', blocks: [
        { p: 'Cũng theo Điều 48, người sử dụng lao động có trách nhiệm hoàn thành thủ tục xác nhận thời gian đóng bảo hiểm xã hội và trả lại bản chính giấy tờ khác nếu đã giữ của người lao động. Khi người lao động yêu cầu, người sử dụng lao động còn phải cung cấp bản sao các tài liệu liên quan đến quá trình làm việc của họ.' },
        { p: 'Trợ cấp thất nghiệp không nằm trong danh sách các khoản doanh nghiệp trả. Muốn nhận, bạn cần đủ điều kiện và nộp hồ sơ tại trung tâm dịch vụ việc làm theo quy định hiện hành.' },
      ] },
      { h2: 'Danh sách kiểm tra trước ngày nghỉ', blocks: [
        { ul: [
          'Xin bảng lương và bảng chấm công của sáu tháng cuối.',
          'Hỏi số ngày phép năm còn lại và cách tính tiền cho những ngày đó.',
          'Hỏi bằng văn bản về việc có trợ cấp thôi việc hay trợ cấp mất việc làm, mức tiền và ngày thanh toán.',
          'Ký biên bản bàn giao công việc, giữ một bản.',
          'Nhận lại giấy tờ gốc và xác nhận thời gian đóng bảo hiểm xã hội.',
        ] },
      ] },
    ],
    sources: [LAW_SRC.blld + ': Điều 46, Điều 47, Điều 48, Điều 113.'],
  },
  {
    slug: 'mat-viec-do-thay-doi-co-cau-cat-giam-nhan-su', tab: 'cac-loai-tro-cap', cover: 'blog-mat-viec-co-cau', published: '2026-10-14', read: 6,
    title: 'Bị cho thôi việc vì công ty thay đổi cơ cấu, cắt giảm nhân sự: nhận khoản nào?',
    desc: 'Giải thích vì sao trường hợp này nhận trợ cấp mất việc làm thay vì trợ cấp thôi việc, cùng mức trả và điều kiện.',
    summary: [
      'Khi công ty cho thôi việc vì thay đổi cơ cấu, công nghệ hoặc lý do kinh tế, người lao động nhận trợ cấp mất việc làm (Điều 47), không phải trợ cấp thôi việc.',
      'Mức trả là một tháng lương cho mỗi năm làm việc, thấp nhất hai tháng lương; điều kiện là làm việc thường xuyên từ đủ 12 tháng.',
      'Tiền lương tính trợ cấp là bình quân 06 tháng liền kề theo hợp đồng lao động.',
    ],
    sections: [
      { h2: 'Vì sao nhận trợ cấp mất việc làm', blocks: [
        { p: 'Điều 34 Bộ luật Lao động 2019 liệt kê các trường hợp chấm dứt hợp đồng. Trong đó, khoản 11 là trường hợp người sử dụng lao động cho người lao động thôi việc do thay đổi cơ cấu, công nghệ hoặc vì lý do kinh tế theo Điều 42, và trường hợp thuộc Điều 43 như chia, tách, hợp nhất, sáp nhập hay chuyển đổi doanh nghiệp.' },
        { p: 'Khoản 1 Điều 46 chỉ áp dụng trợ cấp thôi việc cho các khoản 1, 2, 3, 4, 6, 7, 9 và 10 của Điều 34, không có khoản 11. Vì vậy, người bị cắt giảm vì thay đổi cơ cấu nhận trợ cấp mất việc làm theo Điều 47.' },
      ] },
      { h2: 'Những tình huống thuộc Điều 42 và Điều 43', blocks: [
        { ul: [
          'Thay đổi cơ cấu tổ chức hoặc tổ chức lại lao động (một trường hợp thay đổi cơ cấu, công nghệ ở Điều 42).',
          'Thay đổi công nghệ khiến công việc cũ không còn nhu cầu.',
          'Khó khăn vì lý do kinh tế.',
          'Doanh nghiệp, hợp tác xã chia, tách, hợp nhất, sáp nhập; bán, cho thuê, chuyển đổi loại hình; chuyển nhượng quyền sở hữu hoặc quyền sử dụng tài sản (Điều 43).',
        ] },
      ] },
      { h2: 'Mức trả và cách tính', blocks: [
        { p: 'Theo Điều 47, mỗi năm làm việc được trả một tháng tiền lương, nhưng thấp nhất bằng hai tháng tiền lương. Thời gian tính trợ cấp là tổng thời gian làm việc thực tế, trừ thời gian đã tham gia bảo hiểm thất nghiệp và thời gian đã được trả trợ cấp thôi việc hoặc trợ cấp mất việc làm. Tiền lương là bình quân 06 tháng liền kề theo hợp đồng lao động trước khi mất việc.' },
        { p: 'Ví dụ: thời gian tính trợ cấp 3 năm, tiền lương bình quân 15 triệu đồng một tháng thì trợ cấp là 3 × 15 = 45 triệu đồng. Nếu thời gian tính trợ cấp chỉ 1 năm, mức trả vẫn là hai tháng lương, tức 30 triệu đồng.' },
      ] },
      { h2: 'Việc doanh nghiệp phải làm trước khi cho thôi việc', blocks: [
        { p: 'Khi cắt giảm nhiều lao động, người sử dụng lao động phải xây dựng phương án sử dụng lao động, trao đổi với tổ chức đại diện người lao động tại cơ sở và thông báo cho cơ quan quản lý lao động cấp tỉnh trước ít nhất 30 ngày. Bạn có thể hỏi bộ phận nhân sự về phương án này nếu thấy thông tin chưa rõ.' },
        { p: 'Sau khi chấm dứt hợp đồng, các khoản tiền phải được thanh toán trong 14 ngày làm việc; thời hạn có thể kéo dài nhưng không quá 30 ngày trong những trường hợp luật nêu. Chi tiết xem {{post:cac-khoan-tien-nhan-khi-nghi-viec}}.' },
      ] },
      { h2: 'Còn trợ cấp thất nghiệp thì sao', blocks: [
        { p: 'Trợ cấp mất việc làm do doanh nghiệp trả, còn trợ cấp thất nghiệp do quỹ bảo hiểm thất nghiệp chi trả. Người đủ điều kiện có thể nhận cả hai. Bạn có thể dùng {{tool}} để ước tính phần trợ cấp mất việc làm.' },
      ] },
    ],
    sources: [LAW_SRC.blld + ': Điều 34, 42, 43, 46, 47, 48.'],
  },
  {
    slug: 'don-phuong-cham-dut-hop-dong-co-duoc-tro-cap-thoi-viec', tab: 'nghi-viec', cover: 'blog-cham-dut-hop-dong', published: '2026-10-16', read: 6,
    title: 'Đơn phương chấm dứt hợp đồng lao động có được nhận trợ cấp thôi việc không?',
    desc: 'Các trường hợp người sử dụng lao động hoặc người lao động đơn phương chấm dứt hợp đồng và quyền nhận trợ cấp thôi việc.',
    summary: [
      'Hợp đồng bị đơn phương chấm dứt đúng quy định vẫn có thể được nhận trợ cấp thôi việc nếu làm việc thường xuyên từ đủ 12 tháng.',
      'Hai ngoại lệ chính: đủ điều kiện hưởng lương hưu, và tự ý bỏ việc từ 05 ngày làm việc liên tục trở lên không có lý do chính đáng.',
      'Người lao động đơn phương chấm dứt trái pháp luật không được trợ cấp thôi việc.',
    ],
    sections: [
      { h2: 'Người sử dụng lao động đơn phương chấm dứt đúng luật', blocks: [
        { p: 'Điều 36 Bộ luật Lao động 2019 cho phép người sử dụng lao động đơn phương chấm dứt hợp đồng trong những trường hợp xác định, ví dụ người lao động thường xuyên không hoàn thành công việc theo tiêu chí trong quy chế đánh giá của người sử dụng lao động. Đây là trường hợp ở khoản 10 Điều 34, nằm trong danh sách được trả trợ cấp thôi việc theo khoản 1 Điều 46.' },
        { p: 'Nghĩa là dù bị chấm dứt vì không hoàn thành công việc, người làm việc thường xuyên từ đủ 12 tháng vẫn có quyền nhận trợ cấp thôi việc, trừ hai ngoại lệ ở phần dưới.' },
      ] },
      { h2: 'Hai ngoại lệ không được nhận', blocks: [
        { ul: [
          'Người lao động đã đủ điều kiện hưởng lương hưu theo pháp luật về bảo hiểm xã hội.',
          'Người lao động tự ý bỏ việc mà không có lý do chính đáng từ 05 ngày làm việc liên tục trở lên (điểm e khoản 1 Điều 36).',
        ] },
        { p: 'Ngoài ra, trường hợp bị xử lý kỷ luật sa thải (khoản 8 Điều 34) không nằm trong danh sách các trường hợp được trả trợ cấp thôi việc ở Điều 46.' },
      ] },
      { h2: 'Thời hạn báo trước của người sử dụng lao động', blocks: [
        { p: 'Khoản 2 Điều 36 quy định thời hạn báo trước tùy loại hợp đồng:' },
        { table: { head: ['Loại hợp đồng', 'Báo trước tối thiểu'], rows: [
          ['Không xác định thời hạn', '45 ngày'],
          ['Xác định thời hạn từ 12 đến 36 tháng', '30 ngày'],
          ['Xác định thời hạn dưới 12 tháng', '03 ngày làm việc'],
        ] } },
        { p: 'Khoản 3 Điều 36 nêu trường hợp không cần báo trước, gồm người lao động không có mặt tại nơi làm việc sau thời hạn quy định ở Điều 31, hoặc tự ý bỏ việc từ 05 ngày làm việc liên tục trở lên.' },
      ] },
      { h2: 'Người lao động đơn phương chấm dứt', blocks: [
        { p: 'Khi người lao động chủ động xin nghỉ đúng quy định (khoản 9 Điều 34, Điều 35), người đó vẫn thuộc diện được trả trợ cấp thôi việc nếu làm đủ 12 tháng và không rơi vào hai ngoại lệ trên. Còn nếu đơn phương chấm dứt hợp đồng trái pháp luật thì theo Điều 40, người lao động không được trợ cấp thôi việc.' },
        { p: 'Vì vậy, trước khi gửi đơn nghỉ, hãy kiểm tra loại hợp đồng và thời hạn báo trước tương ứng, rồi gửi thông báo bằng văn bản để có bằng chứng.' },
      ] },
      { h2: 'Ai là người trả', blocks: [
        { p: 'Trợ cấp thôi việc do người sử dụng lao động trả, tức bên đã ký hợp đồng lao động với bạn. Khi muốn biết số tiền tối thiểu, hãy dùng {{tool}} và đối chiếu với bảng tính của công ty.' },
        { p: 'Trường hợp người sử dụng lao động chấm dứt hợp đồng trái pháp luật có quy định riêng tại Điều 41; nếu đang ở tình huống này, bạn nên hỏi cơ quan quản lý lao động hoặc luật sư để có hướng dẫn phù hợp.' },
      ] },
    ],
    sources: [LAW_SRC.blld + ': Điều 31, 34, 35, 36, 40, 41, 46.'],
  },
];

module.exports = { TABS, POSTS, LAW_SRC, CHECKED };

