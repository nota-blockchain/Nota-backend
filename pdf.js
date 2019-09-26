const PDFDocument = require('pdfkit');
const fs = require('fs');
const doc = new PDFDocument;

let HEIGHT = 0;
doc.image('./nota.jpg', -120, -40, {
    fit: [850, 850],
    align: 'center',
    valign: 'center'
});

doc.font('fonts/NanumGothic-Regular.ttf');
doc.fontSize(10);

HEIGHT = 88;
doc.text('엄다니엘', 230, HEIGHT);
doc.text('Daniel Uhm', 430, HEIGHT);

HEIGHT = 118; 
doc.text('2004년 11월 19일', 200, HEIGHT);
doc.text('남', 450, HEIGHT);

HEIGHT = 148;
doc.text('070-9563-7570', 200, HEIGHT);
doc.text('010-9563-7570', 415, HEIGHT);

HEIGHT = 180;
doc.text('경기도 화성시 동탄청계로 303-13, 1113동 401호', 200, HEIGHT);

HEIGHT = 210;
doc.text('danieluhm2004@gmail.com', 200, HEIGHT);
doc.text('아니요', 415, HEIGHT);

HEIGHT = 242;
doc.text('서울대학교 경영학과', 160, HEIGHT);

HEIGHT = 305;
doc.text('하귀일초등학교', -340, HEIGHT, { align: 'center' });
doc.text('2012년 11월 ~ 2018년 2월', 100, HEIGHT, { align: 'center' });
doc.text('제주도', 365, HEIGHT, { align: 'center' });
doc.text('해당없음', 520, HEIGHT - 6, { align: 'center' });
 
HEIGHT = 335;
doc.text('하귀일초등학교', -340, HEIGHT, { align: 'center' });
doc.text('2012년 11월 ~ 2018년 2월', 100, HEIGHT, { align: 'center' });
doc.text('제주도', 365, HEIGHT, { align: 'center' });
doc.text('해당없음', 520, HEIGHT - 6, { align: 'center' });

HEIGHT = 365;
doc.text('하귀일초등학교', -340, HEIGHT, { align: 'center' });
doc.text('2012년 11월 ~ 2018년 2월', 100, HEIGHT, { align: 'center' });
doc.text('제주도', 365, HEIGHT, { align: 'center' });
doc.text('해당없음', 520, HEIGHT - 6, { align: 'center' });

HEIGHT = 395;
doc.text('고려사이버대학교', -340, HEIGHT, { align: 'center' });
doc.text('2012년 11월 ~ 2018년 2월', 100, HEIGHT, { align: 'center' });
doc.text('제주도', 365, HEIGHT, { align: 'center' });
doc.text('경영학과', 520, HEIGHT - 5, { align: 'center' });

HEIGHT = 432;
doc.text('서울대학교 경영학과', 160, HEIGHT);

HEIGHT = 495;
doc.text('2012년 11월 ~ 2018년 2월', -170, HEIGHT, { align: 'center' });
doc.text('Mcraft', 195, HEIGHT, { align: 'center' });
doc.text('제주도', 348, HEIGHT, { align: 'center' });
doc.text('해당없음', 520, HEIGHT - 6, { align: 'center' });
 
HEIGHT = 525;
doc.text('2012년 11월 ~ 2018년 2월', -170, HEIGHT, { align: 'center' });
doc.text('Stella IT', 195, HEIGHT, { align: 'center' });
doc.text('제주도', 348, HEIGHT, { align: 'center' });
doc.text('해당없음', 520, HEIGHT - 6, { align: 'center' });

HEIGHT = 555;
doc.text('2012년 11월 ~', -170, HEIGHT, { align: 'center' });
doc.text('Cloudus', 195, HEIGHT, { align: 'center' });
doc.text('제주도', 348, HEIGHT, { align: 'center' });
doc.text('해당없음', 520, HEIGHT - 6, { align: 'center' });

HEIGHT = 650;
doc.text('2012년 11월 ~ 2018년 2월', -250, HEIGHT, { align: 'center' });
doc.text('Stella IT', 140, HEIGHT, { align: 'center' });
doc.text('해당없음', 464, HEIGHT, { align: 'center' });

HEIGHT = 680;
doc.text('2012년 11월 ~', -250, HEIGHT, { align: 'center' });
doc.text('Cloudus', 140, HEIGHT, { align: 'center' });
doc.text('해당없음', 464, HEIGHT, { align: 'center' });

doc.pipe(fs.createWriteStream('nota-new.pdf'))
doc.end();
