export class IRAdvice {
  public userId: string;
  public billNo: string;
  public sbNo: Array<string>;
  public date: string;
  public customer: string;
  public partyName: string;
  public exchangeRate: string;
  public currency: string;
  public amount: string;
  public commision: string;
  public recievedDate: string;
  public conversionDate: string;
  public origin: string;
  public location: string;
  public commodity: string;
  public buyerName: string;
  public doc: string;
  public pipo: string;
  public _id: string;


constructor(data: any) {
  this.userId = data.userId ? data.userId : '';
  this.billNo = data.billNo ? data.billNo : '';
  this.sbNo = data.sbNo ? data.sbNo: [];
  this.date = data.date ? data.date : '';
  this.customer = data.customer ? data.customer : '';
  this.partyName = data.partyName ? data.partyName : '';
  this.exchangeRate = data.exchangeRate ? data.exchangeRate : '';
  this.currency = data.currency ? data.currency : '';
  this.amount = data.amount ? data.amount : '';
  this.commision = data.commision ? data.commision : '';
  this.recievedDate = data.recievedDate ? data.recievedDate : '';
  this.conversionDate = data.conversionDate ? data.conversionDate : '';
  this.origin = data.origin ? data.origin : '';
  this.location = data.location ? data.location : '';
  this.commodity = data.commodity ? data.commodity : '';
  // this.buyerName = data.buyerName ? data.buyerName : '';
  this.pipo = data.pipo ? data.pipo : '';
  this.doc = data.doc ? data.doc : '';
  this._id = data._id;
}
}
