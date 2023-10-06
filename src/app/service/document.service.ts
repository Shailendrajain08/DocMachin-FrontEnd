import { Injectable } from '@angular/core';
import {HttpClient, HttpContext, HttpHeaders, HttpParams} from '@angular/common/http';
import { observable, Observable, of } from 'rxjs';
import { AppConfig } from '../../app/app.config';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  authToken: string;
  public headers;
  api_base: string;
  constructor(private http: HttpClient, public appconfig: AppConfig) {
    this.api_base = appconfig.apiUrl;
    console.log(this.api_base);
  }
  public loadFromLocalStorage() {
    const token = localStorage.getItem('token');
    this.authToken = token;
    return this.authToken;
  }
  showInvoice = false;
  draft;
  task;
  pdfData: any = [];
  item2: any;
  item1: any;

  // Inward inwardRemittance Advice

  getIrAdvice(user){
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({Authorization : this.authToken}),
    };
    let url = `${this.api_base}/irAdvice/get`;
    return this.http.get(url, httpOptions);
  }

  updateIrAdvice(user, _id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/irAdvice/update`,
      {
        _id: _id,
        master: user,
      },
      httpOptions
    );
  }

  updateByIrAdvice(data, _id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/irAdvice/updateByIrAdvice`,
      {
        _id: _id,
        master: data,
      },
      httpOptions
    );
  }

  updateByIr(data, _id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/irAdvice/updateIrAdvice`,
      {
        _id: _id,
        master: data,
      },
      httpOptions
    );
  }

  getIrAdviceByIrAdvice(billNo) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/irAdvice/getIrAdviceByIrAdvice`,
      {
        billNo: billNo,
      },
      httpOptions
    );
  }

  getIrAdviceByBillNo( billNo) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/irAdvice/getIrAdviceByBillNo`,
      {
        billNo: billNo,
      },
      httpOptions
    );
  }

  createEDPMS(payload) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/edpms/addEDPMS`,
      payload,
      httpOptions
    );
  }

  getEDPMS() {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    let url = `${this.api_base}/edpms/getEDPMS`;
    return this.http.get(url, httpOptions);
  }



  getMaster(user) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    let url = `${this.api_base}/master/get`;
    return this.http.get(url, httpOptions);
  }

  getMasterWithPipo(user){
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    let url = `${this.api_base}/master/mergePISb`;
    return this.http.get(url, httpOptions);
  }
  // getMaster1(): Observable<any[]> {
  //   let arrayMain = [];
  //   this.getMaster(1).subscribe(
  //     (res: any) => {
  //      let data:[] = res.data;
  //       console.log('hello the');
  //       // data.sort((a:any,b:any)=> a.);
  //       for (let value1 of data) {
  //         for (let value2 of this.item2) {
  //           for (let a of value2.pipo) {
  //             if (a == value1.pi_poNo) {
  //               const newVal = { ...value1 };
  //               newVal['sbno'] = value2.sbno;
  //               newVal['sbdate'] = value2.sbdate;
  //               newVal['portCode'] = value2.portCode;
  //               newVal['region'] = value2.countryOfFinaldestination;
  //               newVal['fobValue'] = value2.fobValue;

  //               // console.log("Hello Ranjit", a);
  //               // value1.sbno = value2.sbno
  //               // value1.sbdate = value2.sbdate
  //               arrayMain.push(newVal);
  //               // console.log("hello Sj", value2);
  //             }
  //           }
  //         }
  //       }
  //       console.log('Hello There', arrayMain);
  //       if (arrayMain.length > 0) {
  //         this.item1 = arrayMain;
  //       }

  //     },
  //     (err) => console.log(err)
  //   );
  //   return of(arrayMain);
  // }

  getBoe(user) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    let url = `${this.api_base}/boe/get`;
    return this.http.get(url, httpOptions);
  }

  updateMaster(user, _id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/master/update`,
      {
        _id: _id,
        master: user,
      },
      httpOptions
    );
  }

  // updateMasterBySb(user, sbno) {
  //   this.loadFromLocalStorage();
  //   console.log(this.authToken);
  //   const httpOptions = {
  //     headers: new HttpHeaders({ Authorization: this.authToken }),
  //   };
  //   return this.http.post(
  //     `${this.api_base}/master/updateBySb`,
  //     {
  //       sbno: sbno,
  //       master: user,
  //     },
  //     httpOptions
  //   );
  // }

  updateMasterBySb(user, sbno, _id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/master/updateBySb`,
      {
        master: user,
        sbno: sbno,
        _id: _id,

      },
      httpOptions
    );
  }

  updateIrInSb(user, sbno) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/master/updateIrInSb`,
      {
        master: user,
        sbno: sbno,
        // _id: _id,

      },
      httpOptions
    );
  }



  updateBoe(user, _id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/boe/update`,
      {
        _id: _id,
        master: user,
      },
      httpOptions
    );
  }

  updateBoeByBoe(user, _id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/boe/updateByBoe`,
      {
        _id: _id,
        master: user,
      },
      httpOptions
    );
  }

  getBoeByBoe(boeNumber) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/boe/getBoeByBoe`,
      {
        boeNumber: boeNumber,
      },
      httpOptions
    );
  }

  getBoeByBene(bene) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/boe/getBoeByBene`,
      {
        bene: bene,
      },
      httpOptions
    );
  }

  getPipoByBene(bene) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/pipo/getPipoByBene`,
      {
        bene: bene,
      },
      httpOptions
    );
  }

  getMasterBySb(sbno) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/master/getMasterBySb`,
      {
        sbno: sbno,
      },
      httpOptions
    );
  }

  public getPDF(data): Observable<any> {
    console.log('inside service');
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(`${this.api_base}/pdf/generate`, data, httpOptions);
  }

  addPipo(pipo) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };

    return this.http.post(
      `${this.api_base}/pipo/post`,
      { pipo: pipo },
      httpOptions
    );
  }

  getPipo() {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };

    return this.http.get(`${this.api_base}/pipo/get`, httpOptions);
  }


  getPipos(page,limit,commodity,location,buyer) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };

    return this.http.get(`${this.api_base}/pipo/getPipos?page=${page}&limit=${limit}&commodity=${commodity}&location=${location}&buyer=${buyer}`, httpOptions);
  }


  getPipoByPipoNo(id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/pipo/getSinglePipo`,
      {
        id: id,
      },
      httpOptions
    );
  }

  addThird(pipo) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };

    return this.http.post(
      `${this.api_base}/third/post`,
      { third: pipo },
      httpOptions
    );
  }

  getThird() {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };

    return this.http.get(`${this.api_base}/third/get`, httpOptions);
  }
  getThirdByThirdValue(id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/third/getSingleThird`,
      {
        id: id,
      },
      httpOptions
    );
  }

  updateThird(pipo, id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    console.log(pipo)
    console.log(id)
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/third/update`,
      {
        pipo: pipo,
        id: id
      },
      httpOptions
    );
  }

  // Get Credit Api

  addCredit(pipo) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };

    return this.http.post(
      `${this.api_base}/credit/post`,
      { credit: pipo },
      httpOptions
    );
  }

  getCredit() {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };

    return this.http.get(`${this.api_base}/credit/get`, httpOptions);
  }

  getCreditByCreditValue(id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/credit/getSingleCredit`,
      {
        id: id,
      },
      httpOptions
    );
  }

  updateCredit(pipo, id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    console.log(pipo)
    console.log(id)
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/credit/update`,
      {
        pipo: pipo,
        id: id
      },
      httpOptions
    );
  }
  //get blcopy refno and advice copy api
  addBlcopyref(pipo) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };

    return this.http.post(
      `${this.api_base}/blcopy/post`,
      { blcopy: pipo },
      httpOptions
    );
  }
  getBlcopyref() {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };

    return this.http.get(`${this.api_base}/blcopy/get`, httpOptions);
  }
  getBlcopyrefByblValue(id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/blcopy/getSingleSwift`,
      {
        id: id,
      },
      httpOptions
    );
  }
  updateBlcopyref(pipo, id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    console.log(pipo)
    console.log(id)
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/blcopy/update`,
      {
        pipo: pipo,
        id: id
      },
      httpOptions
    );
  }

  //get airway blcopy and advice copy api
  addAirwayBlcopyFile(pipo) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };

    return this.http.post(
      `${this.api_base}/airwayBlCopy/post`,
      { airwayBlCopy: pipo },
      httpOptions
    );
  }
  getAirwayBlcopy() {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };

    return this.http.get(`${this.api_base}/airwayBlCopy/get`, httpOptions);
  }

  getAirwayBlcopyByBlValue(id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/airwayBlCopy/getSingleAirwayBlcopy`,
      {
        id: id,
      },
      httpOptions
    );
  }

  updateAirwayBlcopy(pipo, id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    console.log(pipo)
    console.log(id)
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/airwayblcopy/update`,
      {
        pipo: pipo,
        id: id
      },
      httpOptions
    );
  }

  // Get Commercial Api

  addCommercial(pipo) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };

    return this.http.post(
      `${this.api_base}/commercial/post`,
      { commercial: pipo },
      httpOptions
    );
  }

  getCommercial() {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };

    return this.http.get(`${this.api_base}/commercial/get`, httpOptions);
  }

  getCommercialByCommercialValue(id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/commercial/getSingleCommercial`,
      {
        id: id,
      },
      httpOptions
    );
  }

  updateCommercial(pipo, id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    console.log(pipo)
    console.log(id)
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/commercial/update`,
      {
        pipo: pipo,
        id: id
      },
      httpOptions
    );
  }

  // Get BillExchange Api

  addBillExchange(pipo) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };

    return this.http.post(
      `${this.api_base}/billOfExchange/post`,
      { billOfExchange: pipo },
      httpOptions
    );
  }

  getBillExchange() {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };

    return this.http.get(`${this.api_base}/billOfExchange/get`, httpOptions);
  }

  getBillExchangeByBillExchangeValue(id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/billExchange/getSingleBillOfExchange`,
      {
        id: id,
      },
      httpOptions
    );
  }

  updateBillExchange(pipo, id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    console.log(pipo)
    console.log(id)
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/billOfExchange/update`,
      {
        pipo: pipo,
        id: id
      },
      httpOptions
    );
  }

    // Get Destruction Api

    addDestruction(pipo) {
      this.loadFromLocalStorage();
      console.log(this.authToken);
      const httpOptions = {
        headers: new HttpHeaders({ Authorization: this.authToken }),
      };

      return this.http.post(
        `${this.api_base}/destruction/post`,
        { destruction: pipo },
        httpOptions
      );
    }

    getDestruction() {
      this.loadFromLocalStorage();
      console.log(this.authToken);
      const httpOptions = {
        headers: new HttpHeaders({ Authorization: this.authToken }),
      };

      return this.http.get(`${this.api_base}/destruction/get`, httpOptions);
    }

    getDestructionByDestructionValue(id) {
      this.loadFromLocalStorage();
      console.log(this.authToken);
      const httpOptions = {
        headers: new HttpHeaders({ Authorization: this.authToken }),
      };
      return this.http.post(
        `${this.api_base}/destruction/getSingleDestruction`,
        {
          id: id,
        },
        httpOptions
      );
    }

    updateDestruction(pipo, id) {
      this.loadFromLocalStorage();
      console.log(this.authToken);
      console.log(pipo)
      console.log(id)
      const httpOptions = {
        headers: new HttpHeaders({ Authorization: this.authToken }),
      };
      return this.http.post(
        `${this.api_base}/destruction/update`,
        {
          pipo: pipo,
          id: id
        },
        httpOptions
      );
    }


       // Get Other Document Api

       addPackingList(pipo) {
        this.loadFromLocalStorage();
        console.log(this.authToken);
        const httpOptions = {
          headers: new HttpHeaders({ Authorization: this.authToken }),
        };

        return this.http.post(
          `${this.api_base}/packingList/post`,
          { packingList: pipo },
          httpOptions
        );
      }

      getPackingList() {
        this.loadFromLocalStorage();
        console.log(this.authToken);
        const httpOptions = {
          headers: new HttpHeaders({ Authorization: this.authToken }),
        };

        return this.http.get(`${this.api_base}/packingList/get`, httpOptions);
      }

      getPackingListByPackingListValue(id) {
        this.loadFromLocalStorage();
        console.log(this.authToken);
        const httpOptions = {
          headers: new HttpHeaders({ Authorization: this.authToken }),
        };
        return this.http.post(
          `${this.api_base}/packingList/getSinglepackingList`,
          {
            id: id,
          },
          httpOptions
        );
      }

      updatePackingList(pipo, id) {
        this.loadFromLocalStorage();
        console.log(this.authToken);
        console.log(pipo)
        console.log(id)
        const httpOptions = {
          headers: new HttpHeaders({ Authorization: this.authToken }),
        };
        return this.http.post(
          `${this.api_base}/packingList/update`,
          {
            pipo: pipo,
            id: id
          },
          httpOptions
        );
      }

  // get Swift Api
  addSwift(pipo) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };

    return this.http.post(
      `${this.api_base}/swift/post`,
      { swift: pipo },
      httpOptions
    );
  }
  getSwift() {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };

    return this.http.get(`${this.api_base}/swift/get`, httpOptions);
  }
  getSwiftBySwiftValue(id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/swift/getSingleSwift`,
      {
        id: id,
      },
      httpOptions
    );
  }
  updateSwift(pipo, id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    console.log(pipo)
    console.log(id)
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/swift/update`,
      {
        pipo: pipo,
        id: id
      },
      httpOptions
    );
  }

  //Get EBRC Api
  addEbrc(pipo) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };

    return this.http.post(
      `${this.api_base}/ebrc/post`,
      { ebrc: pipo },
      httpOptions
    );
  }
  getEbrc() {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };

    return this.http.get(`${this.api_base}/ebrc/get`, httpOptions);
  }
  getEbrcByEbrcValue(id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/ebrc/getSingleSwift`,
      {
        id: id,
      },
      httpOptions
    );
  }
  updateEbrc(pipo, id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    console.log(pipo)
    console.log(id)
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/ebrc/update`,
      {
        pipo: pipo,
        id: id
      },
      httpOptions
    );
  }

  // Get Debit Api

  addDebit(pipo) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };

    return this.http.post(
      `${this.api_base}/debit/post`,
      { debit: pipo },
      httpOptions
    );
  }

  getDebit() {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };

    return this.http.get(`${this.api_base}/debit/get`, httpOptions);
  }

  getDebitByDebitValue(id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/debit/getSingleDebit`,
      {
        id: id,
      },
      httpOptions
    );
  }

  updateDebit(pipo, id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    console.log(pipo)
    console.log(id)
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/debit/update`,
      {
        pipo: pipo,
        id: id
      },
      httpOptions
    );
  }

  // Get Insurance Api

  addInsurance(pipo) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };

    return this.http.post(
      `${this.api_base}/insurance/post`,
      { insurance: pipo },
      httpOptions
    );
  }

  getInsurance() {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };

    return this.http.get(`${this.api_base}/insurance/get`, httpOptions);
  }

  getInsuranceByInsuranceValue(id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/insurance/getSingleInsurance`,
      {
        id: id,
      },
      httpOptions
    );
  }

  updateInsurance(pipo, id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    console.log(pipo)
    console.log(id)
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/insurance/update`,
      {
        pipo: pipo,
        id: id
      },
      httpOptions
    );
  }

   // Get LetterLC Api

   addLetterLC(pipo) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };

    return this.http.post(
      `${this.api_base}/letterLC/post`,
      { letterLC: pipo },
      httpOptions
    );
  }

  getLetterLC() {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };

    return this.http.get(`${this.api_base}/letterLC/get`, httpOptions);
  }

  getLetterLCByLetterLCValue(id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/letterLC/getSingleLetterLC`,
      {
        id: id,
      },
      httpOptions
    );
  }

  updateLetterLC(pipo, id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    console.log(pipo)
    console.log(id)
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/letterLC/update`,
      {
        pipo: pipo,
        id: id
      },
      httpOptions
    );
  }

   // Get Master Service Api

   addMasterService(pipo) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };

    return this.http.post(
      `${this.api_base}/masterService/post`,
      { masterService: pipo },
      httpOptions
    );
  }

  getMasterService() {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };

    return this.http.get(`${this.api_base}/masterService/get`, httpOptions);
  }

  getMasterSerByMasterSerValue(id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/masterService/getSingleMasterService`,
      {
        id: id,
      },
      httpOptions
    );
  }

  updateMasterService(pipo, id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    console.log(pipo)
    console.log(id)
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/masterService/update`,
      {
        pipo: pipo,
        id: id
      },
      httpOptions
    );
  }


   // Get Opinion Report Api

   addOpinionReport(pipo) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };

    return this.http.post(
      `${this.api_base}/opinionReport/post`,
      { opinionReport: pipo },
      httpOptions
    );
  }

  getOpinionReport() {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };

    return this.http.get(`${this.api_base}/opinionReport/get`, httpOptions);
  }

  getOpinionByOpinionValue(id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/opinionReport/getSingleCredit`,
      {
        id: id,
      },
      httpOptions
    );
  }

  updateOpinionReport(pipo, id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    console.log(pipo)
    console.log(id)
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/opinionReport/update`,
      {
        pipo: pipo,
        id: id
      },
      httpOptions
    );
  }




  addTask(data) {
    console.log('I am in service');
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(`${this.api_base}/task/post`, data, httpOptions);
  }

  getPipoTask(data) {
    console.log('I am in service calling transacytions for PIPO');
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(`${this.api_base}/task/getPipo`, data, httpOptions);
  }

  getBoeTask(data) {
    console.log('I am in service calling transacytions');
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/task/getBoeTask`,
      data,
      httpOptions
    );
  }

  getSbTask(data) {
    console.log('I am in service calling transacytions');
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(`${this.api_base}/task/getSbTask`, data, httpOptions);
  }

  getPipoInwardTask(data) {
    console.log('I am in service calling transacytions');
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/task/getPipoInwardTask`,
      data,
      httpOptions
    );
  }

  getLcTask(data) {
    console.log('I am in service calling transacytions');
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(`${this.api_base}/task/getLcTask`, data, httpOptions);
  }

  getAllTask(data) {
    console.log('I am in service calling transacytions');
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/task/getAllTask`,
      data,
      httpOptions
    );
  }

  getTask(data) {
    console.log('I am in service calling transacytions');
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(`${this.api_base}/task/getTask`, data, httpOptions);
  }

  getPipoCaTask(data) {
    console.log('I am in service calling transacytions');
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/task/getPipoCaTask`,
      data,
      httpOptions
    );
  }

  getBcTask(data) {
    console.log('I am in service calling transacytions');
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(`${this.api_base}/task/getBcTask`, data, httpOptions);
  }

  getCaTask(data) {
    console.log('I am in service calling transacytions');
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/task/getCaTask`,
      'data',
      httpOptions
    );
  }

  getOneTask(data) {
    console.log('I am in service calling transacytions');
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(`${this.api_base}/task/getOne`, data, httpOptions);
  }

  completeTask(data) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };

    return this.http.post(`${this.api_base}/task/complete`, data, httpOptions);
  }

  taskEmail(data) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };

    return this.http.post(`${this.api_base}/task/taskEmail`, data, httpOptions);
  }

  addExportTask(data) {
    console.log('I am in service');
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/exportTask/post`,
      {
        task: data,
      },
      httpOptions
    );
  }

  getAllExport(data) {
    console.log('I am in service');
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.get(`${this.api_base}/exportTask/get`, httpOptions);
  }

  getOneExportTask(data) {
    console.log('I am in service calling transacytions');
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/exportTask/getOne`,
      data,
      httpOptions
    );
  }

  uploadImage(formData){
    console.log('I am in service calling transacytions');
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken } ),
    };
    return this.http.post(
      `${this.api_base}/member/uploadImage`,
      formData,
      httpOptions
    );

  }

  getTypeExportTask(data) {
    console.log('I am in service calling transacytions');
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/exportTask/getFromType`,
      data,
      httpOptions
    );
  }

  updateExportTask(user, _id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/exportTask/update`,
      {
        id: _id,
        task: user,
      },
      httpOptions
    );
  }
  exportEmail(data){
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };

    return this.http.post(
      `${this.api_base}/task/exportEmail`,
      data,
      httpOptions
    );
  }

  downloadDocuments(data:any) {
    console.log("downloadDocuments",data)
    const httpOptions:any  = {
      headers: data['headers'],
      responseType: 'blob'
    };
    return this.http.get(data['url'], httpOptions);
  }
}
