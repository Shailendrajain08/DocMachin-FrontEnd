import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppConfig } from '../../app/app.config';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: "root" })
export class UserService {
  public role;
  public authToken;
  public name;
  api_base: string;
  public loginData = new BehaviorSubject({});
  constructor(private http: HttpClient, public appconfig: AppConfig) {
    this.api_base = appconfig.apiUrl;
    console.log(this.api_base)
  }

  public addLoginData(data) {
    this.loginData.next(data);
  }

  public addToken(token) {
    console.log(token);
    localStorage.setItem("token", token);
    this.authToken = token;
  }
  public loadFromLocalStorage() {
    const token = localStorage.getItem("token");
    this.authToken = token;
    return this.authToken;
  }

  register(user) {
    return this.http.post(`${this.api_base}/authenticate/signup`, {
      user: user
    });
  }

  deleteUser(id) {
    return this.http.post(`${this.api_base}/authenticate/deleteUser`, {
      id: id
    });
  }

  public login(loginData) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + btoa(loginData.email + ":" + loginData.password),
      }),
    };
    console.log('httpOptions');
    console.log(httpOptions);

    return this.http.post(
      `${this.api_base}/authenticate/login`,
      null,
      httpOptions
    );
  }

  public updatePsw(data, email) {
    return this.http.put(`${this.api_base}/authenticate/updatepsw`, {
      newPassword: data.password1,
      emailId: email,
    });
  }

  public updateOneUser(data, value, emailId) {
    return this.http.put(`${this.api_base}/authenticate/updateOneUser`, {
      id: data,
      data: value,
      emailId: emailId
    });
  }

  public updateEmail(data, email) {
    return this.http.put(`${this.api_base}/authenticate/updateemail`, {
      data: data,
      emailId: email,
    });
  }

  public forgotpsw(loginData) {
    return this.http.put(`${this.api_base}/authenticate/forgotpsw`, {
      emailId: loginData.emailId,
    });
  }

  public documentSend(id, byteArray) {
    return this.http.post(`${this.api_base}/authenticate/documentSend`, {
      emailId: id,
      byteArray: byteArray
    });
  }

  public getAllUser() {
    return this.http.get(`${this.api_base}/authenticate/getAllUser`).toPromise();
  }

  public creatTeam(team) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/team/post`,
      {
        team: team,
      },
      httpOptions
    );
  }

  verify(data) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/otp/verify`,
      {
        data: data,
      },
      httpOptions
    );
  }

  delete(data) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/otp/delete`,
      {
        data: data,
      },
      httpOptions
    );
  }

  public getTeam() {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/team/get`,
      {
        team: "team",
      },
      httpOptions
    );
  }

  updateTeam(team) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/team/update`,
      {
        team: team,
      },
      httpOptions
    );
  }

  mergePdf(filename) {
    this.loadFromLocalStorage();
    console.log(this.authToken);

    const httpOptions: Object = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
      responseType:"blob"
    };
    return this.http.post(
      `${this.api_base}/pipo/mergePdf`,
      {
       filename: filename
      },
      httpOptions,


    );
  }


  updatePipo(pipo, id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    console.log(pipo)
    console.log(id)
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/pipo/update`,
      {
        pipo: pipo,
        id: id
      },
      httpOptions
    );
  }

  // mergePdf(){

  // }

  updateSinglePipo(id, file, doc) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    console.log(file)
    console.log(id)
    console.log(doc)
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/pipo/updateSingle`,
      {
        id: id,
        file: file,
        doc: doc
      },
      httpOptions
    );
  }

  updateManyPipo(pipo, file, doc, updatedData = {}) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    console.log(file)
    console.log(pipo)
    // console.log(doc)
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    let data = {
      pipo: pipo,
      file: file,
      ...updatedData,
      doc: doc
    };

    return this.http.post(
      `${this.api_base}/pipo/updateMany`,
      data,
      httpOptions
    );
  }

  updateManyPipo1(pipo, file) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    console.log(file)
    console.log(pipo)
    // console.log(doc)
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/pipo/updateMany1`,
      {
        pipo: pipo,
        file: file
      },
      httpOptions
    );
  }

  public getUser() {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/team/getUser`,
      {
        team: "team",
      },
      httpOptions
    );
  }

  public creatBene(bene) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/bene/post`,
      {
        bene: bene,
      },
      httpOptions
    );
  }

  getBene(boeNumber) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/bene/get`,
      {
        boeNumber: boeNumber,
      },
      httpOptions
    );
  }

  getSingleBene(id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/bene/getSingleBene`,
      {
        id: id,
      },
      httpOptions
    );
  }

  updateBene(id, bene) {
    console.log("BENNNE", bene);
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/bene/update`,
      {
        id: id,
        bene: bene,
      },
      httpOptions
    );
  }

  getBeneByName(name) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http
      .post(
        `${this.api_base}/bene/getByName`,
        { beneName: name },
        httpOptions
      ).toPromise();

  }



  public creatBuyer(buyer) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/buyer/post`,
      {
        buyer: buyer,
      },
      httpOptions
    );
  }

  getBuyer(boeNumber) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/buyer/get`,
      {
        boeNumber: boeNumber,
      },
      httpOptions
    );
  }

  getSingleBuyer(id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/buyer/getSingleBuyer`,
      {
        id: id,
      },
      httpOptions
    );
  }

  updateBuyer(id, buyer) {
    console.log("BENNNE", buyer);
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/buyer/update`,
      {
        id: id,
        buyer: buyer,
      },
      httpOptions
    );
  }

  getBuyerByName(name) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http
      .post(
        `${this.api_base}/buyer/getByName`,
        { buyerName: name },
        httpOptions
      ).toPromise();

  }

  public addMemeber(id, member) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/member/post`,
      {
        id: id,
        member: member,
      },
      httpOptions
    );
  }
  public getMemeber(id) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.api_base}/member/get`,
      {
        teamId: id,
      },
      httpOptions
    );
  }

  addpipo(pipo) {
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

  getPipo(pipoNumber) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };

    return this.http.post(
      `${this.api_base}/pipo/get`,
      { pi_poNo: pipoNumber },
      httpOptions
    );
  }

  getManyPipo(pipoNumber) {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };

    return this.http.post(
      `${this.api_base}/pipo/getMany`,
      { pipo: pipoNumber },
      httpOptions
    );
  }

  getUserDetail() {
    this.loadFromLocalStorage();
    console.log(this.authToken);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http
      .get(`${this.api_base}/user/profile`, httpOptions)
      .toPromise();
  }


}
