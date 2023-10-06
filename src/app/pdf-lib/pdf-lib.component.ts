import { Component, OnInit } from '@angular/core';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-pdf-lib',
  templateUrl: './pdf-lib.component.html',
  styleUrls: ['./pdf-lib.component.scss']
})
export class PDfLibComponent implements OnInit {
  value: any;

  constructor(private httpClient: HttpClient ,private route: ActivatedRoute ,private sanitizer: DomSanitizer) { }
-
  ngOnInit(){this.fillForm}

    async fillForm() {
      const formUrl = './../../assets/pdf/DXB.pdf'

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
      const textField = form.createTextField('best.text')
      textField.setText('Exia')
      textField.addToPage(firstpage, {
      x: 150,y: 728,width: 400,
      height: 16,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const rocketField = form.createCheckBox('favorite.rocket')
      rocketField.addToPage( firstpage, { x: 320, y: 705 ,width:20,height:20,borderWidth: 0})
      
      const rocket1Field = form.createCheckBox('favorite.rocket1')
      rocket1Field.addToPage( firstpage, { x: 540, y: 705 ,width:20,height:20,borderWidth: 0})
      
      const text1Field = form.createTextField('best.text1')
      text1Field.setText('ANAPPADIKKAL TRADING CO. PVT LTD')
      text1Field.addToPage(firstpage, {
      x: 150,y: 680,width: 400,
      height: 16,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const text2Field = form.createTextField('best.text2')
      text2Field.setText('1')
      text2Field.addToPage(firstpage, {
      x: 155,y: 657,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const text3Field = form.createTextField('best.text3')
      text3Field.setText('2')
      text3Field.addToPage(firstpage, {
      x: 190,y: 657,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text4Field = form.createTextField('best.text4')
      text4Field.setText('3')
      text4Field.addToPage(firstpage, {
      x: 220,y: 657,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const text5Field = form.createTextField('best.text5')
      text5Field.setText('4')
      text5Field.addToPage(firstpage, {
      x: 250,y: 657,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const text6Field = form.createTextField('best.text6')
      text6Field.setText('5')
      text6Field.addToPage(firstpage, {
      x: 270,y: 657,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const text7Field = form.createTextField('best.text7')
      text7Field.setText('6')
      text7Field.addToPage(firstpage, {
      x: 300,y: 657,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const text8Field = form.createTextField('best.text8')
      text8Field.setText('7')
      text8Field.addToPage(firstpage, {
      x: 330,y: 657,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const text9Field = form.createTextField('best.text9')
      text9Field.setText('8')
      text9Field.addToPage(firstpage, {
      x: 330,y: 657,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
     
      const text10Field = form.createTextField('best.text10')
      text10Field.setText('9')
      text10Field.addToPage(firstpage, {
      x: 360,y: 657,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const text11Field = form.createTextField('best.text11')
      text11Field.setText('10')
      text11Field.addToPage(firstpage, {
      x: 390,y: 657,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text12Field = form.createTextField('best.text12')
      text12Field.setText('11')
      text12Field.addToPage(firstpage, {
      x: 420,y: 657,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const text13Field = form.createTextField('best.text13')
      text13Field.setText('12')
      text13Field.addToPage(firstpage, {
      x: 450,y: 657,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const text14Field = form.createTextField('best.text14')
      text14Field.setText('13')
      text14Field.addToPage(firstpage, {
      x: 480,y: 657,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const text15Field = form.createTextField('best.text15')
      text15Field.setText('14')
      text15Field.addToPage(firstpage, {
      x: 510,y: 657,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const text16Field = form.createTextField('best.text16')
      text16Field.setText('15')
      text16Field.addToPage(firstpage, {
      x: 540,y: 657,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const text17Field = form.createTextField('best.text17')
      text17Field.setText('Export')
      text17Field.addToPage(firstpage, {
      x: 192,y: 635,width: 75,
      height: 16,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const text18Field = form.createTextField('best.text18')
      text18Field.setText('C/SDW')
      text18Field.addToPage(firstpage, {
      x: 460,y: 635,width: 90,
      height: 16,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const text19Field = form.createTextField('best.text19')
      text19Field.setText('BC')
      text19Field.addToPage(firstpage, {
      x: 150,y: 590,width: 80,
      height: 16,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const text20Field = form.createTextField('best.text20')
      text20Field.setText('BA')
      text20Field.addToPage(firstpage, {
      x: 150,y: 565,width: 80,
      height: 16,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const text21Field = form.createTextField('best.text21')
      text21Field.setText('Bill amount in words')
      text21Field.addToPage(firstpage, {
      x: 340,y: 580,width: 220,
      height: 16,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const text22Field = form.createTextField('best.text22')
      text22Field.setText('Empty')
      text22Field.addToPage(firstpage, {
      x: 150,y: 540,width: 90,
      height: 16,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const text23Field = form.createTextField('best.text23')
      text23Field.setText('Remitter Address')
      text23Field.addToPage(firstpage, {
      x: 150,y: 500,width: 400,
      height: 16,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const text24Field = form.createTextField('best.text24')
      text24Field.setText('POR')
      text24Field.addToPage(firstpage, {
      x: 150,y: 450,width: 100,
      height: 16,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const text25Field = form.createTextField('best.text25')
      text25Field.setText('PC')
      text25Field.addToPage(firstpage, {
      x: 430,y: 450,width: 120,
      height: 16,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      
      // please mention theexpected date of shipment
      
      const text26Field = form.createTextField('best.text26')
      text26Field.setText('1')
      text26Field.addToPage(firstpage, {
      x: 290,y: 420,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text27Field = form.createTextField('best.text27')
      text27Field.setText('2')
      text27Field.addToPage(firstpage, {
      x: 327,y: 420,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const text28Field = form.createTextField('best.text28')
      text28Field.setText('3')
      text28Field.addToPage(firstpage, {
      x: 363,y: 420,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const text29Field = form.createTextField('best.text29')
      text29Field.setText('4')
      text29Field.addToPage(firstpage, {
      x: 401,y: 420,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text30Field = form.createTextField('best.text30')
      text30Field.setText('5')
      text30Field.addToPage(firstpage, {
      x: 434,y: 420,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text31Field = form.createTextField('best.text31')
      text31Field.setText('6')
      text31Field.addToPage(firstpage, {
      x: 471,y: 420,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text32Field = form.createTextField('best.text32')
      text32Field.setText('7')
      text32Field.addToPage(firstpage, {
      x: 505,y: 420,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text33Field = form.createTextField('best.text33')
      text33Field.setText('8')
      text33Field.addToPage(firstpage, {
      x: 540,y: 420,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      

      // Details of accounts for crediting the received amount
      //line1
      const text34Field = form.createTextField('best.text34')
      text34Field.setText('1')
      text34Field.addToPage(firstpage, {
      x:270 ,y: 375,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text35Field = form.createTextField('best.text35')
      text35Field.setText('2')
      text35Field.addToPage(firstpage, {
      x: 294,y: 375,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
 
      const text36Field = form.createTextField('best.text36')
      text36Field.setText('3')
      text36Field.addToPage(firstpage, {
      x:315 ,y: 375,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text37Field = form.createTextField('best.text37')
      text37Field.setText('4')
      text37Field.addToPage(firstpage, {
      x:337 ,y: 375,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const text38Field = form.createTextField('best.text38')
      text38Field.setText('5')
      text38Field.addToPage(firstpage, {
      x:359,y: 375,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text39Field = form.createTextField('best.text39')
      text39Field.setText('6')
      text39Field.addToPage(firstpage, {
      x:380,y: 375,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text40Field = form.createTextField('best.text40')
      text40Field.setText('7')
      text40Field.addToPage(firstpage, {
      x: 399,y: 375,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text41Field = form.createTextField('best.text41')
      text41Field.setText('8')
      text41Field.addToPage(firstpage, {
      x: 419,y: 375,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text42Field = form.createTextField('best.text42')
      text42Field.setText('9')
      text42Field.addToPage(firstpage, {
      x: 443,y: 375,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text43Field = form.createTextField('best.text43')
      text43Field.setText('10')
      text43Field.addToPage(firstpage, {
      x: 464,y: 375,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text44Field = form.createTextField('best.text44')
      text44Field.setText('11')
      text44Field.addToPage(firstpage, {
      x: 487,y: 375,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const text45Field = form.createTextField('best.text45')
      text45Field.setText('12')
      text45Field.addToPage(firstpage, {
      x: 507,y: 375,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text46Field = form.createTextField('best.text46')
      text46Field.setText('13')
      text46Field.addToPage(firstpage, {
      x: 528,y: 375,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text47Field = form.createTextField('best.text47')
      text47Field.setText('14')
      text47Field.addToPage(firstpage, {
      x: 549,y: 375,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      
      //line2
      const text48Field = form.createTextField('best.text48')
      text48Field.setText('1')
      text48Field.addToPage(firstpage, {
      x:270 ,y: 340,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text49Field = form.createTextField('best.text49')
      text49Field.setText('2')
      text49Field.addToPage(firstpage, {
      x: 294,y: 340,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
 
      const text50Field = form.createTextField('best.text50')
      text50Field.setText('3')
      text50Field.addToPage(firstpage, {
      x:315 ,y: 340,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text51Field = form.createTextField('best.text51')
      text51Field.setText('4')
      text51Field.addToPage(firstpage, {
      x:337 ,y: 340,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const text52Field = form.createTextField('best.text52')
      text38Field.setText('5')
      text38Field.addToPage(firstpage, {
      x:359,y: 340,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text53Field = form.createTextField('best.text53')
      text53Field.setText('6')
      text53Field.addToPage(firstpage, {
      x:380,y: 340,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text54Field = form.createTextField('best.text54')
      text54Field.setText('7')
      text54Field.addToPage(firstpage, {
      x: 399,y: 340,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text55Field = form.createTextField('best.text55')
      text55Field.setText('8')
      text55Field.addToPage(firstpage, {
      x: 419,y: 340,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text56Field = form.createTextField('best.text56')
      text56Field.setText('9')
      text56Field.addToPage(firstpage, {
      x: 443,y: 340,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text57Field = form.createTextField('best.text57')
      text57Field.setText('10')
      text57Field.addToPage(firstpage, {
      x: 464,y: 340,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text58Field = form.createTextField('best.text58')
      text58Field.setText('11')
      text58Field.addToPage(firstpage, {
      x: 487,y: 340,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const text59Field = form.createTextField('best.text59')
      text59Field.setText('12')
      text59Field.addToPage(firstpage, {
      x: 507,y: 340,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text60Field = form.createTextField('best.text60')
      text60Field.setText('13')
      text60Field.addToPage(firstpage, {
      x: 528,y: 340,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text61Field = form.createTextField('best.text61')
      text61Field.setText('14')
      text61Field.addToPage(firstpage, {
      x: 549,y: 340,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

     //line3
     const text62Field = form.createTextField('best.text62')
      text62Field.setText('1')
      text62Field.addToPage(firstpage, {
      x:270 ,y: 310,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text63Field = form.createTextField('best.text63')
      text63Field.setText('2')
      text63Field.addToPage(firstpage, {
      x: 294,y: 310,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
 
      const text64Field = form.createTextField('best.text64')
      text64Field.setText('3')
      text64Field.addToPage(firstpage, {
      x:315 ,y: 310,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text65Field = form.createTextField('best.text65')
      text65Field.setText('4')
      text65Field.addToPage(firstpage, {
      x:337 ,y: 310,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const text66Field = form.createTextField('best.text66')
      text66Field.setText('5')
      text66Field.addToPage(firstpage, {
      x:359,y: 310,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text67Field = form.createTextField('best.text67')
      text67Field.setText('6')
      text67Field.addToPage(firstpage, {
      x:380,y: 310,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text68Field = form.createTextField('best.text68')
      text68Field.setText('8')
      text68Field.addToPage(firstpage, {
      x: 399,y: 310,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text69Field = form.createTextField('best.text69')
      text69Field.setText('8')
      text69Field.addToPage(firstpage, {
      x: 419,y: 310,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text70Field = form.createTextField('best.text70')
      text70Field.setText('9')
      text70Field.addToPage(firstpage, {
      x: 443,y: 310,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text71Field = form.createTextField('best.text71')
      text71Field.setText('10')
      text71Field.addToPage(firstpage, {
      x: 464,y: 310,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text72Field = form.createTextField('best.text72')
      text72Field.setText('11')
      text72Field.addToPage(firstpage, {
      x: 487,y: 310,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const text73Field = form.createTextField('best.text73')
      text73Field.setText('12')
      text73Field.addToPage(firstpage, {
      x: 507,y: 310,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text74Field = form.createTextField('best.text74')
      text74Field.setText('13')
      text74Field.addToPage(firstpage, {
      x: 528,y: 310,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text75Field = form.createTextField('best.text75')
      text75Field.setText('14')
      text75Field.addToPage(firstpage, {
      x: 549,y: 310,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})


      //line4
      const text76Field = form.createTextField('best.text76')
      text76Field.setText('1')
      text76Field.addToPage(firstpage, {
      x:270 ,y: 280,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text77Field = form.createTextField('best.text77')
      text77Field.setText('2')
      text77Field.addToPage(firstpage, {
      x: 294,y: 280,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
 
      const text78Field = form.createTextField('best.text78')
      text78Field.setText('3')
      text78Field.addToPage(firstpage, {
      x:315 ,y: 280,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text79Field = form.createTextField('best.text79')
      text79Field.setText('4')
      text79Field.addToPage(firstpage, {
      x:337 ,y: 280,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const text80Field = form.createTextField('best.text80')
      text80Field.setText('5')
      text80Field.addToPage(firstpage, {
      x:359,y: 280,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text81Field = form.createTextField('best.text81')
      text81Field.setText('6')
      text81Field.addToPage(firstpage, {
      x:380,y: 280,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text82Field = form.createTextField('best.text82')
      text82Field.setText('8')
      text82Field.addToPage(firstpage, {
      x: 399,y: 280,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text83Field = form.createTextField('best.text83')
      text83Field.setText('8')
      text83Field.addToPage(firstpage, {
      x: 419,y: 280,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text84Field = form.createTextField('best.text84')
      text84Field.setText('9')
      text84Field.addToPage(firstpage, {
      x: 443,y: 280,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text85Field = form.createTextField('best.text85')
      text85Field.setText('10')
      text85Field.addToPage(firstpage, {
      x: 464,y: 280,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text86Field = form.createTextField('best.text86')
      text86Field.setText('11')
      text86Field.addToPage(firstpage, {
      x: 487,y: 280,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const text87Field = form.createTextField('best.text87')
      text87Field.setText('12')
      text87Field.addToPage(firstpage, {
      x: 507,y: 280,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text88Field = form.createTextField('best.text88')
      text88Field.setText('13')
      text88Field.addToPage(firstpage, {
      x: 528,y: 280,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text89Field = form.createTextField('best.text89')
      text89Field.setText('14')
      text89Field.addToPage(firstpage, {
      x: 549,y: 280,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      //line5
      const text90Field = form.createTextField('best.text90')
      text90Field.setText('1')
      text90Field.addToPage(firstpage, {
      x: 270,y: 250,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const text91Field = form.createTextField('best.text91')
      text91Field.setText('2')
      text91Field.addToPage(firstpage, {
      x: 294,y: 250,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
 
      const text92Field = form.createTextField('best.text92')
      text92Field.setText('3')
      text92Field.addToPage(firstpage, {
      x:315 ,y: 250,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text93Field = form.createTextField('best.text93')
      text93Field.setText('4')
      text93Field.addToPage(firstpage, {
      x:337 ,y: 250,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const text94Field = form.createTextField('best.text94')
      text94Field.setText('5')
      text94Field.addToPage(firstpage, {
      x:359,y: 250,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text95Field = form.createTextField('best.text95')
      text95Field.setText('6')
      text95Field.addToPage(firstpage, {
      x:380,y: 250,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text96Field = form.createTextField('best.text96')
      text96Field.setText('8')
      text96Field.addToPage(firstpage, {
      x: 399,y: 250,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text97Field = form.createTextField('best.text97')
      text97Field.setText('8')
      text97Field.addToPage(firstpage, {
      x: 419,y: 250,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text98Field = form.createTextField('best.text98')
      text98Field.setText('9')
      text98Field.addToPage(firstpage, {
      x: 443,y: 250,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const text99Field = form.createTextField('best.text99')
      text99Field.setText('10')
      text99Field.addToPage(firstpage, {
      x: 464,y: 250,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const texta1Field = form.createTextField('best.texta186')
      texta1Field.setText('11')
      texta1Field.addToPage(firstpage, {
      x: 487,y: 250,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const texta2Field = form.createTextField('best.texta2')
      texta2Field.setText('12')
      texta2Field.addToPage(firstpage, {
      x: 507,y: 250,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const texta3Field = form.createTextField('best.texta3')
      texta3Field.setText('13')
      texta3Field.addToPage(firstpage, {
      x: 528,y: 250,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const texta4Field = form.createTextField('best.texta4')
      texta4Field.setText('14')
      texta4Field.addToPage(firstpage, {
      x: 549,y: 250,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      //line 6

      const texta5Field = form.createTextField('best.texta5')
      texta5Field.setText('1')
      texta5Field.addToPage(firstpage, {
      x: 270,y: 220,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const texta6Field = form.createTextField('best.texta6')
      texta6Field.setText('2')
      texta6Field.addToPage(firstpage, {
      x: 294,y: 220,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
 
      const texta7Field = form.createTextField('best.texta7')
      texta7Field.setText('3')
      texta7Field.addToPage(firstpage, {
      x:315 ,y: 220,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const texta8Field = form.createTextField('best.texta8')
      texta8Field.setText('4')
      texta8Field.addToPage(firstpage, {
      x:337 ,y: 220,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const texta9Field = form.createTextField('best.texta9')
      texta9Field.setText('5')
      texta9Field.addToPage(firstpage, {
      x:359,y: 220,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const textb1Field = form.createTextField('best.textb1')
      textb1Field.setText('6')
      textb1Field.addToPage(firstpage, {
      x:380,y: 220,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const textb2Field = form.createTextField('best.textb2')
      textb2Field.setText('8')
      textb2Field.addToPage(firstpage, {
      x: 399,y: 220,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const textb3Field = form.createTextField('best.textb3')
      textb3Field.setText('8')
      textb3Field.addToPage(firstpage, {
      x: 419,y: 220,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const textb4Field = form.createTextField('best.textb4')
      textb4Field.setText('9')
      textb4Field.addToPage(firstpage, {
      x: 443,y: 220,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const textb5Field = form.createTextField('best.textb5')
      textb5Field.setText('10')
      textb5Field.addToPage(firstpage, {
      x: 464,y: 220,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const textb6Field = form.createTextField('best.texta1b6')
      textb6Field.setText('11')
      textb6Field.addToPage(firstpage, {
      x: 487,y: 220,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const textb7Field = form.createTextField('best.textb7')
      textb7Field.setText('12')
      textb7Field.addToPage(firstpage, {
      x: 507,y: 220,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const textb8Field = form.createTextField('best.textb8')
      textb8Field.setText('13')
      textb8Field.addToPage(firstpage, {
      x: 528,y: 220,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const textb9Field = form.createTextField('best.textb9')
      textb9Field.setText('14')
      textb9Field.addToPage(firstpage, {
      x: 550,y: 220,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const textc1Field = form.createTextField('best.textc1')
      textc1Field.setText('14')
      textc1Field.addToPage(firstpage, {
      x: 549,y: 220,width: 15,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      


      // *WE AUTHORISE YOU TO CONVERT THE UNUTILISED PORTION OF CAPTIONED INWARD REMITTANCE CREDITED 

      const textc2Field = form.createTextField('best.textc2')
      textc2Field.setText('FCM')
      textc2Field.addToPage(firstpage, {
      x: 160,y: 150,width: 110,
      height: 16,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const textc3Field = form.createTextField('best.textc3')
      textc3Field.setText('FCA')
      textc3Field.addToPage(firstpage, {
      x: 160,y: 125,width: 110,
      height: 16,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})


      const textc4Field = form.createTextField('best.textc4')
      textc4Field.setText('FCU')
      textc4Field.addToPage(firstpage, {
      x: 160,y: 100,width: 110,
      height: 16,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      
      // Booking date
      const textaField = form.createTextField('best.texta')
      textaField.setText('1')
      textaField.addToPage(firstpage, {
      x: 413,y: 150,width: 12,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const textbField = form.createTextField('best.textb')
      textbField.setText('2')
      textbField.addToPage(firstpage, {
      x: 430,y: 150,width: 12,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const textcField = form.createTextField('best.textc')
      textcField.setText('3')
      textcField.addToPage(firstpage, {
      x: 450,y: 150,width: 12,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const textdField = form.createTextField('best.textd')
      textdField.setText('4')
      textdField.addToPage(firstpage, {
      x: 467,y: 150,width: 12,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const texteField = form.createTextField('best.texte')
      texteField.setText('5')
      texteField.addToPage(firstpage, {
      x: 485,y: 150,width: 12,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const textfField = form.createTextField('best.textf')
      textfField.setText('6')
      textfField.addToPage(firstpage, {
      x: 503,y: 150,width: 12,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const textgField = form.createTextField('best.textg')
      textgField.setText('7')
      textgField.addToPage(firstpage, {
      x: 523,y: 150,width: 12,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const texthField = form.createTextField('best.texth')
      texthField.setText('8')
      texthField.addToPage(firstpage, {
      x: 539,y: 150,width: 12,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

     
      // Due date

      const textiField = form.createTextField('best.texti')
      textiField.setText('1')
      textiField.addToPage(firstpage, {
      x: 413,y: 125,width: 12,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const textjField = form.createTextField('best.textj')
      textjField.setText('2')
      textjField.addToPage(firstpage, {
      x: 430,y: 125,width: 12,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const textkField = form.createTextField('best.textk')
      textkField.setText('3')
      textkField.addToPage(firstpage, {
      x: 450,y: 125,width: 12,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const textlField = form.createTextField('best.textl')
      textlField.setText('4')
      textlField.addToPage(firstpage, {
      x: 467,y: 125,width: 12,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const textmField = form.createTextField('best.textm')
      textmField.setText('5')
      textmField.addToPage(firstpage, {
      x: 485,y: 125,width: 12,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const textnField = form.createTextField('best.textn')
      textnField.setText('6')
      textnField.addToPage(firstpage, {
      x: 503,y: 125,width: 12,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const textoField = form.createTextField('best.texto')
      textoField.setText('7')
      textoField.addToPage(firstpage, {
      x: 523,y: 125,width: 12,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})

      const textzField = form.createTextField('best.textz')
      textzField.setText('8')
      textzField.addToPage(firstpage, {
      x: 539,y: 125,width: 12,
      height: 15,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
      const textc5Field = form.createTextField('best.textc5')
      textc5Field.setText('ERP')
      textc5Field.addToPage(firstpage, {
      x: 420,y: 100,width: 130,
      height: 16,textColor: rgb(0, 0, 0),backgroundColor: rgb(1,1,1),borderWidth: 0,})
      
    
      
    
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

