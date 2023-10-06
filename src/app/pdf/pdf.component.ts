import { Component, OnInit } from '@angular/core';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent implements OnInit {
  value: any;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit() { this.fillForm }

  async fillForm() {
    const formUrl = './../assets/DXB.pdf'


    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())

    // const marioUrl = 'https://pdf-lib.js.org/assets/small_mario.png'
    // const marioImageBytes = await fetch(marioUrl).then(res => res.arrayBuffer())

    // const emblemUrl = 'https://pdf-lib.js.org/assets/mario_emblem.png'
    // const emblemImageBytes = await fetch(emblemUrl).then(res => res.arrayBuffer())

    const pdfDoc = await PDFDocument.load(formPdfBytes)
    // const page = pdfDoc.context()






    // const marioImage = await pdfDoc.embedPng(marioImageBytes)
    // const emblemImage = await pdfDoc.embedPng(emblemImageBytes)

    const form = pdfDoc.getForm()
    const pages = pdfDoc.getPages()
    const firstpage = pages[0]
    firstpage.drawText('dfgdfg',
      {
        x: 190, y: 730, size: 10
      })
    firstpage.drawText('ARX',
      {
        x: 320,
        y: 710,
        size: 10
      })
    firstpage.drawText('OIR',
      {
        x: 540,
        y: 710,
        size: 10
      })

    firstpage.drawText('ANAPPADIKKAL TRADING CO. PVT LTD',
      {
        x: 190,
        y: 680,
        size: 10
      })
    firstpage.drawText('0',
      {
        x: 160, y: 660, size: 10
      })
    firstpage.drawText('1',
      {
        x: 190, y: 660, size: 10
      })
    firstpage.drawText('1',
      {
        x: 220, y: 660, size: 10
      })
    firstpage.drawText('6',
      {
        x: 250, y: 660, size: 10
      })
    firstpage.drawText('1',
      {
        x: 270, y: 660, size: 10
      })
    firstpage.drawText('1',
      {
        x: 300, y: 660, size: 10
      })
    firstpage.drawText('1',
      {
        x: 330, y: 660, size: 10
      })
    firstpage.drawText('1',
      {
        x: 360, y: 660, size: 10
      })
    firstpage.drawText('1',
      {
        x: 390, y: 660, size: 10
      })
    firstpage.drawText('1',
      {
        x: 420, y: 660, size: 10
      })
    firstpage.drawText('1',
      {
        x: 450, y: 660, size: 10
      })
    firstpage.drawText('1',
      {
        x: 480, y: 660, size: 10
      })
    firstpage.drawText('1',
      {
        x: 510, y: 660, size: 10
      })
    firstpage.drawText('1',
      {
        x: 540, y: 660, size: 10
      })
    firstpage.drawText('EXPORT',
      {
        x: 200, y: 640, size: 10
      })
    firstpage.drawText('C/SDW',
      {
        x: 480, y: 640, size: 10
      })
    firstpage.drawText('BC',
      {
        x: 160, y: 590, size: 10
      })
    firstpage.drawText('BA',
      {
        x: 160, y: 570, size: 10
      })
    firstpage.drawText('Bill Amount in Words',
      {
        x: 370, y: 580, size: 10
      })
    firstpage.drawText('Empty',
      {
        x: 160, y: 550, size: 10
      })
    firstpage.drawText('Remitter Address',
      {
        x: 160, y: 510, size: 10
      })
    firstpage.drawText('POR',
      {
        x: 160, y: 460, size: 10
      })
    firstpage.drawText('PC',
      {
        x: 450, y: 460, size: 10
      })
    // please mention theexpected date of shipment
    firstpage.drawText('1',
      {
        x: 290, y: 420, size: 10
      })
    firstpage.drawText('2',
      {
        x: 340, y: 420, size: 10
      })
    firstpage.drawText('3',
      {
        x: 370, y: 420, size: 10
      })
    firstpage.drawText('4',
      {
        x: 400, y: 420, size: 10
      })
    firstpage.drawText('5',
      {
        x: 440, y: 420, size: 10
      })
    firstpage.drawText('6',
      {
        x: 480, y: 420, size: 10
      })
    firstpage.drawText('7',
      {
        x: 510, y: 420, size: 10
      })
    firstpage.drawText('8',
      {
        x: 540, y: 420, size: 10
      })

    // Details of accounts for crediting the received amount
    //line1
    firstpage.drawText('1',
      {
        x: 280, y: 370, size: 10
      })
    firstpage.drawText('2',
      {
        x: 300, y: 370, size: 10
      })
    firstpage.drawText('3',
      {
        x: 320, y: 370, size: 10
      })
    firstpage.drawText('4',
      {
        x: 340, y: 370, size: 10
      })
    firstpage.drawText('5',
      {
        x: 360, y: 370, size: 10
      })
    firstpage.drawText('6',
      {
        x: 380, y: 370, size: 10
      })
    firstpage.drawText('7',
      {
        x: 400, y: 370, size: 10
      })
    firstpage.drawText('8',
      {
        x: 430, y: 370, size: 10
      })
    firstpage.drawText('9',
      {
        x: 450, y: 370, size: 10
      })
    firstpage.drawText('10',
      {
        x: 460, y: 370, size: 10
      })
    firstpage.drawText('11',
      {
        x: 485, y: 370, size: 10
      })
    firstpage.drawText('12',
      {
        x: 510, y: 370, size: 10
      })
    firstpage.drawText('13',
      {
        x: 525, y: 370, size: 10
      })
    firstpage.drawText('14',
      {
        x: 545, y: 370, size: 10
      })
    //line2
    firstpage.drawText('1',
      {
        x: 280, y: 340, size: 10
      })
    firstpage.drawText('2',
      {
        x: 300, y: 340, size: 10
      })
    firstpage.drawText('3',
      {
        x: 320, y: 340, size: 10
      })
    firstpage.drawText('4',
      {
        x: 340, y: 340, size: 10
      })
    firstpage.drawText('5',
      {
        x: 360, y: 340, size: 10
      })
    firstpage.drawText('6',
      {
        x: 380, y: 340, size: 10
      })
    firstpage.drawText('7',
      {
        x: 400, y: 340, size: 10
      })
    firstpage.drawText('8',
      {
        x: 430, y: 340, size: 10
      })
    firstpage.drawText('9',
      {
        x: 450, y: 340, size: 10
      })
    firstpage.drawText('10',
      {
        x: 460, y: 340, size: 10
      })
    firstpage.drawText('11',
      {
        x: 485, y: 340, size: 10
      })
    firstpage.drawText('12',
      {
        x: 510, y: 340, size: 10
      })
    firstpage.drawText('13',
      {
        x: 525, y: 340, size: 10
      })
    firstpage.drawText('14',
      {
        x: 545, y: 340, size: 10
      })
    //line3
    firstpage.drawText('1',
      {
        x: 280, y: 310, size: 10
      })
    firstpage.drawText('2',
      {
        x: 300, y: 310, size: 10
      })
    firstpage.drawText('3',
      {
        x: 320, y: 310, size: 10
      })
    firstpage.drawText('4',
      {
        x: 340, y: 310, size: 10
      })
    firstpage.drawText('5',
      {
        x: 360, y: 310, size: 10
      })
    firstpage.drawText('6',
      {
        x: 380, y: 310, size: 10
      })
    firstpage.drawText('7',
      {
        x: 400, y: 310, size: 10
      })
    firstpage.drawText('8',
      {
        x: 430, y: 310, size: 10
      })
    firstpage.drawText('9',
      {
        x: 450, y: 310, size: 10
      })
    firstpage.drawText('10',
      {
        x: 460, y: 310, size: 10
      })
    firstpage.drawText('11',
      {
        x: 485, y: 310, size: 10
      })
    firstpage.drawText('12',
      {
        x: 510, y: 310, size: 10
      })
    firstpage.drawText('13',
      {
        x: 525, y: 310, size: 10
      })
    firstpage.drawText('14',
      {
        x: 545, y: 310, size: 10
      })
    //line4
    firstpage.drawText('1',
      {
        x: 280, y: 280, size: 10
      })
    firstpage.drawText('2',
      {
        x: 300, y: 280, size: 10
      })
    firstpage.drawText('3',
      {
        x: 320, y: 280, size: 10
      })
    firstpage.drawText('4',
      {
        x: 340, y: 280, size: 10
      })
    firstpage.drawText('5',
      {
        x: 360, y: 280, size: 10
      })
    firstpage.drawText('6',
      {
        x: 380, y: 280, size: 10
      })
    firstpage.drawText('7',
      {
        x: 400, y: 280, size: 10
      })
    firstpage.drawText('8',
      {
        x: 430, y: 280, size: 10
      })
    firstpage.drawText('9',
      {
        x: 450, y: 280, size: 10
      })
    firstpage.drawText('10',
      {
        x: 460, y: 280, size: 10
      })
    firstpage.drawText('11',
      {
        x: 485, y: 280, size: 10
      })
    firstpage.drawText('12',
      {
        x: 510, y: 280, size: 10
      })
    firstpage.drawText('13',
      {
        x: 525, y: 280, size: 10
      })
    firstpage.drawText('14',
      {
        x: 545, y: 280, size: 10
      })
    //line5
    firstpage.drawText('1',
      {
        x: 280, y: 260, size: 10
      })
    firstpage.drawText('2',
      {
        x: 300, y: 260, size: 10
      })
    firstpage.drawText('3',
      {
        x: 320, y: 260, size: 10
      })
    firstpage.drawText('4',
      {
        x: 340, y: 260, size: 10
      })
    firstpage.drawText('5',
      {
        x: 360, y: 260, size: 10
      })
    firstpage.drawText('6',
      {
        x: 380, y: 260, size: 10
      })
    firstpage.drawText('7',
      {
        x: 400, y: 260, size: 10
      })
    firstpage.drawText('8',
      {
        x: 430, y: 260, size: 10
      })
    firstpage.drawText('9',
      {
        x: 450, y: 260, size: 10
      })
    firstpage.drawText('10',
      {
        x: 460, y: 260, size: 10
      })
    firstpage.drawText('11',
      {
        x: 485, y: 260, size: 10
      })
    firstpage.drawText('12',
      {
        x: 510, y: 260, size: 10
      })
    firstpage.drawText('13',
      {
        x: 525, y: 260, size: 10
      })
    firstpage.drawText('14',
      {
        x: 545, y: 260, size: 10
      })
    //line 6
    firstpage.drawText('1',
      {
        x: 280, y: 220, size: 10
      })
    firstpage.drawText('2',
      {
        x: 300, y: 220, size: 10
      })
    firstpage.drawText('3',
      {
        x: 320, y: 220, size: 10
      })
    firstpage.drawText('4',
      {
        x: 340, y: 220, size: 10
      })
    firstpage.drawText('5',
      {
        x: 360, y: 220, size: 10
      })
    firstpage.drawText('6',
      {
        x: 380, y: 220, size: 10
      })
    firstpage.drawText('7',
      {
        x: 400, y: 220, size: 10
      })
    firstpage.drawText('8',
      {
        x: 430, y: 220, size: 10
      })
    firstpage.drawText('9',
      {
        x: 450, y: 220, size: 10
      })
    firstpage.drawText('10',
      {
        x: 460, y: 220, size: 10
      })
    firstpage.drawText('11',
      {
        x: 485, y: 220, size: 10
      })
    firstpage.drawText('12',
      {
        x: 510, y: 220, size: 10
      })
    firstpage.drawText('13',
      {
        x: 525, y: 220, size: 10
      })
    firstpage.drawText('14',
      {
        x: 545, y: 220, size: 10
      })


    // *WE AUTHORISE YOU TO CONVERT THE UNUTILISED PORTION OF CAPTIONED INWARD REMITTANCE CREDITED 

    firstpage.drawText('FCM',
      {
        x: 170, y: 150, size: 10
      })
    firstpage.drawText('FCA',
      {
        x: 170, y: 125, size: 10
      })
    firstpage.drawText('FCu',
      {
        x: 170, y: 100, size: 10
      })
    // Booking date
    firstpage.drawText('1',
      {
        x: 420, y: 150, size: 10
      })
    firstpage.drawText('2',
      {
        x: 430, y: 150, size: 10
      })
    firstpage.drawText('3',
      {
        x: 450, y: 150, size: 10
      })
    firstpage.drawText('4',
      {
        x: 470, y: 150, size: 10
      })
    firstpage.drawText('5',
      {
        x: 490, y: 150, size: 10
      })
    firstpage.drawText('6',
      {
        x: 500, y: 150, size: 10
      })
    firstpage.drawText('7',
      {
        x: 520, y: 150, size: 10
      })
    firstpage.drawText('8',
      {
        x: 540, y: 150, size: 10
      })
    // Due date
    firstpage.drawText('1',
      {
        x: 420, y: 125, size: 10
      })
    firstpage.drawText('2',
      {
        x: 430, y: 125, size: 10
      })
    firstpage.drawText('3',
      {
        x: 450, y: 125, size: 10
      })
    firstpage.drawText('4',
      {
        x: 470, y: 125, size: 10
      })
    firstpage.drawText('5',
      {
        x: 490, y: 125, size: 10
      })
    firstpage.drawText('6',
      {
        x: 500, y: 125, size: 10
      })
    firstpage.drawText('7',
      {
        x: 520, y: 125, size: 10
      })
    firstpage.drawText('8',
      {
        x: 540, y: 125, size: 10
      })
    firstpage.drawText('ERP',
      {
        x: 430, y: 100, size: 10
      })



    const pdfBytes = await pdfDoc.save()
    console.log(pdfBytes, "pdf")
    console.log(pdfBytes, "pdf")
    var base64String = this._arrayBufferToBase64(pdfBytes)

    console.log(base64String);
    const x = 'data:application/pdf;base64,' + base64String;
    console.log(x);
    this.value = this.sanitizer.bypassSecurityTrustResourceUrl(x);
    const link: any = document.createElement("a");
    link.id = "dwnldLnk";
    link.style = "display:none;";
    document.body.appendChild(link);
    const dlnk: any = document.getElementById("dwnldLnk");
    dlnk.href = x;
    dlnk.download = 'file.pdf';
    dlnk.click();
  }

  _arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}