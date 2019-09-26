const PDFDocument = require('pdfkit');
const fs = require('fs');
const doc = new PDFDocument;
const uuidv1 = require('uuid/v1');
let HEIGHT = 0;

try { fs.mkdirSync('pdf') } catch {}

module.exports = (session) => {
    try {
        console.log(session);
        const uuid = uuidv1();
        
        doc.image('./nota.jpg', -120, -40, {
            fit: [850, 850],
            align: 'center',
            valign: 'center'
        });
        
        doc.font('fonts/NanumGothic-Regular.ttf');
        doc.fontSize(10);
        
        HEIGHT = 88;
        // doc.text(session.username || '', 230, HEIGHT);
        // doc.text(session.usernameEn || '', 430, HEIGHT);
        
        HEIGHT = 118; 
        doc.text('2004년 11월 19일', 200, HEIGHT);
        doc.text('남', 450, HEIGHT);
        
        HEIGHT = 148;
        doc.text('080-1234-5678', 200, HEIGHT);
        doc.text('010-1234-5678', 415, HEIGHT);
        
        HEIGHT = 180;
        doc.text('경기도 성남시 분당구 삼평동 698 판교테크노밸리 스타트업 캠퍼스 ', 200, HEIGHT);
        
        HEIGHT = 210;
        doc.text('admin@example.com', 200, HEIGHT);
        doc.text('아니요', 415, HEIGHT);
        
        HEIGHT = 242;
        doc.text(session.school4_name + ' ' + session.school4_major || '', 160, HEIGHT);
        
        HEIGHT = 305;
        doc.text(session.school1_name || '', -340, HEIGHT, { align: 'center' });
        doc.text(session.school1_graduatedate || '', 100, HEIGHT, { align: 'center' });
        doc.text('서울시', 365, HEIGHT, { align: 'center' });
        doc.text('해당없음', 520, HEIGHT - 6, { align: 'center' });
         
        HEIGHT = 335;
        doc.text(session.school2_name || '', -340, HEIGHT, { align: 'center' });
        doc.text(session.school2_graduatedate || '', 100, HEIGHT, { align: 'center' });
        doc.text('서울시', 365, HEIGHT, { align: 'center' });
        doc.text('해당없음', 520, HEIGHT - 6, { align: 'center' });
        
        HEIGHT = 365;
        doc.text(session.school3_name || '', -340, HEIGHT, { align: 'center' });
        doc.text(session.school3_graduatedate || '', 100, HEIGHT, { align: 'center' });
        doc.text('서울시', 365, HEIGHT, { align: 'center' });
        doc.text('해당없음', 520, HEIGHT - 6, { align: 'center' });
        
        HEIGHT = 395;
        doc.text(session.school4_name || '', -340, HEIGHT, { align: 'center' });
        doc.text(session.school4_graduatedate || '', 100, HEIGHT, { align: 'center' });
        doc.text('서울시', 365, HEIGHT, { align: 'center' });
        doc.text(session.school4_major || '', 520, HEIGHT - 5, { align: 'center' });
        
        HEIGHT = 432;
        doc.text('10년', 160, HEIGHT);
        
        HEIGHT = 495;
        doc.text(session.work1_date || '', -170, HEIGHT, { align: 'center' });
        doc.text(session.work1_name || '', 195, HEIGHT, { align: 'center' });
        doc.text(session.work1_majorwork || '', 348, HEIGHT, { align: 'center' });
        doc.text(session.work1_position || '', 520, HEIGHT - 6, { align: 'center' });
         
        HEIGHT = 525;
        
        // HEIGHT = 555;
        // doc.text('2012년 11월 ~', -170, HEIGHT, { align: 'center' });
        // doc.text('Cloudus', 195, HEIGHT, { align: 'center' });
        // doc.text('제주도', 348, HEIGHT, { align: 'center' });
        // doc.text('해당없음', 520, HEIGHT - 6, { align: 'center' });
        
        // HEIGHT = 650;
        // doc.text('2012년 11월 ~ 2018년 2월', -250, HEIGHT, { align: 'center' });
        // doc.text('Stella IT', 140, HEIGHT, { align: 'center' });
        // doc.text('해당없음', 464, HEIGHT, { align: 'center' });
        
        // HEIGHT = 680;
        // doc.text('2012년 11월 ~', -250, HEIGHT, { align: 'center' });
        // doc.text('Cloudus', 140, HEIGHT, { align: 'center' });
        // doc.text('해당없음', 464, HEIGHT, { align: 'center' });
        
        doc.pipe(fs.createWriteStream(`pdf/${uuid}.pdf`))
        doc.end();  
        return uuid;
    } catch(err) {
        return 'default';
    }
}
