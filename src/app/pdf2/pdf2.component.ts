import { Component, OnInit } from '@angular/core';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf2',
  templateUrl: './pdf2.component.html',
  styleUrls: ['./pdf2.component.scss']
})
export class Pdf2Component implements OnInit {

  value: any;

  constructor(private httpClient: HttpClient ,private route: ActivatedRoute ,private sanitizer: DomSanitizer) { }

  ngOnInit(){this.fillForm}

    async fillForm() {
      const formUrl = './../../assets/pdf/_C559-Application for Export Bill M bill.pdf'

      const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
    
      const pdfDoc = await PDFDocument.load(formPdfBytes)
    
      const form = pdfDoc.getForm()
      const pages = pdfDoc.getPages()
      const firstpage = pages[0]

      const text1 = form.createTextField('favorite0')
      text1.setText('  xyz')
      text1.addToPage(firstpage, { 
        x: 156,
        y: 752,
        width: 250,
        height: 12,
        borderWidth: 0,
        //backgroundColor: rgb(255, 255, 255)
      })


      const text2 = form.createTextField('favorite1')
      text2.setText(" X")
      text2.addToPage(firstpage, { 
        x: 482,
        y: 752,
        width: 20,
        height: 13,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const textf3 = form.createTextField('favorite2')
      textf3.setText(" X")
      textf3.addToPage(firstpage, { 
        x: 510,
        y: 752,
        width: 20,
        height: 13,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text4 = form.createTextField('favorite3')
      text4.setText(" X")
      text4.addToPage(firstpage, { 
        x: 539,
        y: 752,
        width: 15,
        height: 13,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text5 = form.createTextField('favorite4')
      text5.setText(" X")
      text5.addToPage(firstpage, { 
        x: 570,
        y: 752,
        width: 12,
        height: 13,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      //exporter

      const text6 = form.createTextField('favorite5')
      text6.setText(" xyz")
      text6.addToPage(firstpage, { 
        x: 18,
        y: 684,
        width: 295,
        height: 14,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text7 = form.createTextField('favorite6')
      text7.setText('  xyz')
      text7.addToPage(firstpage, { 
        x: 18,
        y: 665,
        width: 295,
        height: 14,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text8 = form.createTextField('favorite7')
      text8.setText('  xyz')
      text8.addToPage(firstpage, { 
        x: 18,
        y: 646,
        width: 295,
        height: 14,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text9 = form.createTextField('favorite8')
      text9.setText('  xyz')
      text9.addToPage(firstpage, { 
        x: 18,
        y: 628,
        width: 295,
        height: 14,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text10 = form.createTextField('favorite9')
      text10.setText('  xyz')
      text10.addToPage(firstpage, { 
        x: 18,
        y: 612,
        width: 295,
        height: 14,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text11 = form.createTextField('favorite10')
      text11.setText('  xyz')
      text11.addToPage(firstpage, { 
        x: 18,
        y: 594,
        width: 295,
        height: 14,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      //buyer

      const text12 = form.createTextField('favorite11')
      text12.setText('  xyz')
      text12.addToPage(firstpage, { 
        x: 320,
        y: 684,
        width: 255,
        height: 14,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text13 = form.createTextField('favorite12')
      text13.setText('  xyz')
      text13.addToPage(firstpage, { 
        x: 320,
        y: 665,
        width: 255,
        height: 14,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text14 = form.createTextField('favorite13')
      text14.setText('  xyz')
      text14.addToPage(firstpage, { 
        x: 320,
        y: 646,
        width: 255,
        height: 14,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text15 = form.createTextField('favorite14')
      text15.setText('  xyz')
      text15.addToPage(firstpage, { 
        x: 320,
        y: 628,
        width: 255,
        height: 14,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text16 = form.createTextField('favorite15')
      text16.setText('  xyz')
      text16.addToPage(firstpage, { 
        x: 320,
        y: 612,
        width: 255,
        height: 14,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text17 = form.createTextField('favorite16')
      text17.setText('  xyz')
      text17.addToPage(firstpage, { 
        x: 320,
        y: 594,
        width: 255,
        height: 14,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })
      
      //checkbox

      const checkbox1 = form.createCheckBox('check1')
      checkbox1.addToPage(firstpage, { 
        x: 150,
        y: 575,
        width: 8,
        height: 8,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const checkbox2 = form.createCheckBox('check2')
      checkbox2.addToPage(firstpage, { 
        x: 369,
        y: 575,
        width: 8,
        height: 8,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const checkbox3 = form.createCheckBox('check3')
      checkbox3.addToPage(firstpage, { 
        x: 570,
        y: 575,
        width: 8,
        height: 8,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })



      //draw bank details

      const text18 = form.createTextField('favorite17')
      text18.setText('  xyz')
      text18.addToPage(firstpage, { 
        x: 219,
        y: 553,
        width: 360,
        height: 14,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text19 = form.createTextField('favorite18')
      text19.setText('  xyz')
      text19.addToPage(firstpage, { 
        x: 219,
        y: 538,
        width: 360,
        height: 14,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text20 = form.createTextField('favorite19')
      text20.setText('  xyz')
      text20.addToPage(firstpage, { 
        x: 219,
        y: 521,
        width: 360,
        height: 14,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text21 = form.createTextField('favorite20')
      text21.setText('  xyz')
      text21.addToPage(firstpage, { 
        x: 219,
        y: 506,
        width: 360,
        height: 14,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text22 = form.createTextField('favorite21')
      text22.setText('  xyz')
      text22.addToPage(firstpage, { 
        x: 219,
        y: 491,
        width: 360,
        height: 14,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text23 = form.createTextField('favorite22')
      text23.setText('  xyz')
      text23.addToPage(firstpage, { 
        x: 219,
        y: 478,
        width: 360,
        height: 10,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      //checkbox

      const checkbox4 = form.createCheckBox('check4')
      checkbox4.addToPage(firstpage, { 
        x: 245,
        y: 456,
        width: 5,
        height: 5,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const checkbox5 = form.createCheckBox('check5')
      checkbox5.addToPage(firstpage, { 
        x: 453,
        y: 463,
        width: 5,
        height: 5,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      //text

      const text24 = form.createTextField('favorite23')
      text24.setText('  xyz')
      text24.addToPage(firstpage, { 
        x: 219,
        y: 412,
        width: 360,
        height: 18,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text25 = form.createTextField('favorite24')
      text25.setText('  xyz')
      text25.addToPage(firstpage, { 
        x: 219,
        y: 390,
        width: 360,
        height: 16,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      //checkbox

      const checkbox6 = form.createCheckBox('check6')
      checkbox6.addToPage(firstpage, { 
        x: 389,
        y: 375,
        width: 8,
        height: 8,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const checkbox7 = form.createCheckBox('check7')
      checkbox7.addToPage(firstpage, { 
        x: 550,
        y: 375,
        width: 8,
        height: 8,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      // firx

      const text26 = form.createTextField('favorite25')
      text26.setText('  xyz')
      text26.addToPage(firstpage, { 
        x: 128,
        y: 348,
        width: 187,
        height: 20,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text27 = form.createTextField('favorite26')
      text27.setText('  xyz')
      text27.addToPage(firstpage, { 
        x: 128,
        y: 324,
        width: 187,
        height: 18,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text28 = form.createTextField('favorite27')
      text28.setText('  xyz')
      text28.addToPage(firstpage, { 
        x: 421,
        y: 348,
        width: 160,
        height: 20,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text29 = form.createTextField('favorite28')
      text29.setText('  xyz')
      text29.addToPage(firstpage, { 
        x: 421,
        y: 324,
        width: 160,
        height: 18,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      //bill details

      const text30 = form.createTextField('favorite29')
      text30.setText('  xyz')
      text30.addToPage(firstpage, { 
        x: 128,
        y: 287,
        width: 140,
        height: 18,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text31 = form.createTextField('favorite30')
      text31.setText('  xyz')
      text31.addToPage(firstpage, { 
        x: 128,
        y: 266,
        width: 140,
        height: 18,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      
      const text32 = form.createTextField('favorite31')
      text32.setText('  xyz')
      text32.addToPage(firstpage, { 
        x: 388,
        y: 287,
        width: 188,
        height: 18,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      
      const text33 = form.createTextField('favorite32')
      text33.setText('  xyz')
      text33.addToPage(firstpage, { 
        x: 388,
        y: 266,
        width: 188,
        height: 18,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      //checkbox

      const checkbox8 = form.createCheckBox('check8')
      checkbox8.addToPage(firstpage, { 
        x: 141,
        y: 251,
        width: 5,
        height: 5,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const checkbox9 = form.createCheckBox('check9')
      checkbox9.addToPage(firstpage, { 
        x: 288,
        y: 251,
        width: 5,
        height: 5,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text01 = form.createTextField('favorite01')
      text01.setText('  xyz')
      text01.addToPage(firstpage, { 
        x: 393,
        y: 253,
        width: 30,
        height: 10,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })   
      
      const text02 = form.createTextField('favorite02')
      text02.setText('  xyz')
      text02.addToPage(firstpage, { 
        x: 453,
        y: 242,
        width: 60,
        height: 10,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })   

      // description of goods

      const text34 = form.createTextField('favorite33')
      text34.setText('  xyz')
      text34.addToPage(firstpage, { 
        x: 128,
        y: 211,
        width: 250,
        height: 20,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text35 = form.createTextField('favorite34')
      text35.setText('  xyz')
      text35.addToPage(firstpage, { 
        x: 128,
        y: 190,
        width: 140,
        height: 18,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text36 = form.createTextField('favorite35')
      text36.setText('  xyz')
      text36.addToPage(firstpage, { 
        x: 448,
        y: 211,
        width: 132,
        height: 18,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text37 = form.createTextField('favorite36')
      text37.setText('  xyz')
      text37.addToPage(firstpage, { 
        x: 388,
        y: 190,
        width: 188,
        height: 18,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text38 = form.createTextField('favorite37')
      text38.setText('  xyz')
      text38.addToPage(firstpage, { 
        x: 275,
        y: 170,
        width: 300,
        height: 18,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text39 = form.createTextField('favorite38')
      text39.setText('  xyz')
      text39.addToPage(firstpage, { 
        x: 275,
        y: 146,
        width: 300,
        height: 18,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text40 = form.createTextField('favorite39')
      text40.setText('  xyz')
      text40.addToPage(firstpage, { 
        x: 128,
        y: 126,
        width: 140,
        height: 18,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text41 = form.createTextField('favorite40')
      text41.setText('  xyz')
      text41.addToPage(firstpage, { 
        x: 388,
        y: 126,
        width: 188,
        height: 18,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      //table1

      const text42 = form.createTextField('favorite41')
      text42.setText('  xyz')
      text42.addToPage(firstpage, { 
        x: 97,
        y: 62,
        width: 45,
        height: 14,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text43 = form.createTextField('favorite42')
      text43.setText('  xyz')
      text43.addToPage(firstpage, { 
        x: 148,
        y: 62,
        width: 50,
        height: 14,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text44 = form.createTextField('favorite43')
      text44.setText('  xyz')
      text44.addToPage(firstpage, { 
        x: 206,
        y: 62,
        width: 65,
        height: 14,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text45 = form.createTextField('favorite44')
      text45.setText('  xyz')
      text45.addToPage(firstpage, { 
        x: 276,
        y: 62,
        width: 41,
        height: 14,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text46 = form.createTextField('favorite45')
      text46.setText('  xyz')
      text46.addToPage(firstpage, { 
        x: 320,
        y: 62,
        width: 45,
        height: 14,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text47 = form.createTextField('favorite46')
      text47.setText('  xyz')
      text47.addToPage(firstpage, { 
        x: 370,
        y: 62,
        width: 33,
        height: 14,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text48 = form.createTextField('favorite47')
      text48.setText('  xyz')
      text48.addToPage(firstpage, { 
        x: 408,
        y: 62,
        width: 80,
        height: 14,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text49 = form.createTextField('favorite48')
      text49.setText('  xyz')
      text49.addToPage(firstpage, { 
        x: 492,
        y: 62,
        width: 50,
        height: 14,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text50 = form.createTextField('favorite49')
      text50.setText('  xyz')
      text50.addToPage(firstpage, { 
        x: 547,
        y: 62,
        width: 33,
        height: 14,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text51 = form.createTextField('favorite50')
      text51.setText('  xyz')
      text51.addToPage(firstpage, { 
        x: 97,
        y: 51,
        width: 45,
        height: 9,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text52 = form.createTextField('favorite51')
      text52.setText('  xyz')
      text52.addToPage(firstpage, { 
        x: 148,
        y: 51,
        width: 50,
        height: 9,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text53 = form.createTextField('favorite52')
      text53.setText('  xyz')
      text53.addToPage(firstpage, { 
        x: 206,
        y: 51,
        width: 65,
        height: 9,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text54 = form.createTextField('favorite53')
      text54.setText('  xyz')
      text54.addToPage(firstpage, { 
        x: 276,
        y: 51,
        width: 41,
        height: 9,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text55 = form.createTextField('favorite54')
      text55.setText('  xyz')
      text55.addToPage(firstpage, { 
        x: 320,
        y: 51,
        width: 45,
        height: 9,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text56 = form.createTextField('favorite55')
      text56.setText('  xyz')
      text56.addToPage(firstpage, { 
        x: 370,
        y: 51,
        width: 33,
        height: 9,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text57 = form.createTextField('favorite56')
      text57.setText('  xyz')
      text57.addToPage(firstpage, { 
        x: 408,
        y: 51,
        width: 80,
        height: 9,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text58 = form.createTextField('favorite57')
      text58.setText('  xyz')
      text58.addToPage(firstpage, { 
        x: 492,
        y: 51,
        width: 50,
        height: 9,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text59 = form.createTextField('favorite58')
      text59.setText('  xyz')
      text59.addToPage(firstpage, { 
        x: 547,
        y: 51,
        width: 33,
        height: 9,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      //table2

      
      const text60 = form.createTextField('favorite59')
      text60.setText(" X")
      text60.addToPage(firstpage, { 
        x: 135,
        y: 10,
        width: 30,
        height: 25,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text61 = form.createTextField('favorite60')
      text61.setText(" X")
      text61.addToPage(firstpage, { 
        x: 167,
        y: 10,
        width: 30,
        height: 25,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text62 = form.createTextField('favorite61')
      text62.setText(" X")
      text62.addToPage(firstpage, { 
        x: 201,
        y: 10,
        width: 30,
        height: 25,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text63 = form.createTextField('favorite62')
      text63.setText(" X")
      text63.addToPage(firstpage, { 
        x: 235,
        y: 10,
        width: 30,
        height: 25,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text64 = form.createTextField('favorite63')
      text64.setText(" X")
      text64.addToPage(firstpage, { 
        x: 266,
        y: 10,
        width: 30,
        height: 25,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text65 = form.createTextField('favorite64')
      text65.setText(" X")
      text65.addToPage(firstpage, { 
        x: 300,
        y: 10,
        width: 30,
        height: 25,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text66 = form.createTextField('favorite65')
      text66.setText(" X")
      text66.addToPage(firstpage, { 
        x: 331,
        y: 10,
        width: 30,
        height: 25,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text67 = form.createTextField('favorite66')
      text67.setText(" X")
      text67.addToPage(firstpage, { 
        x: 363,
        y: 10,
        width: 30,
        height: 25,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text68 = form.createTextField('favorite67')
      text68.setText(" X")
      text68.addToPage(firstpage, { 
        x: 397,
        y: 10,
        width: 34,
        height: 25,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text69 = form.createTextField('favorite68')
      text69.setText(" X")
      text69.addToPage(firstpage, { 
        x: 434,
        y: 10,
        width: 30,
        height: 25,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text70 = form.createTextField('favorite69')
      text70.setText(" X")
      text70.addToPage(firstpage, { 
        x: 469,
        y: 10,
        width: 27,
        height: 25,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text71 = form.createTextField('favorite70')
      text71.setText(" X")
      text71.addToPage(firstpage, { 
        x: 501,
        y: 10,
        width: 28,
        height: 25,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text72 = form.createTextField('favorite71')
      text72.setText(" X")
      text72.addToPage(firstpage, { 
        x: 534,
        y: 10,
        width: 28,
        height: 25,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })

      const text73 = form.createTextField('favorite72')
      text73.setText(" X")
      text73.addToPage(firstpage, { 
        x: 565,
        y: 10,
        width: 15,
        height: 25,
        borderWidth: 0,
        // backgroundColor: rgb(255, 255, 255)
      })
    
      const pdfBytes = await pdfDoc.save()
      console.log(pdfBytes,"pdf")
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
    // const dlnk: any = document.getElementById("dwnldLnk");
    // dlnk.href = x;
    // dlnk.download = 'file.pdf';
    // dlnk.click();
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
