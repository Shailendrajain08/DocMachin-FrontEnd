import {PipoDisplayListViewItem, PipoModel} from "./pipo.model";
import _ from 'lodash';
class Invoice {
  public sno: string;
  public invoiceno: string;
  public amount: number;
  public currency: string;

  constructor(data: any) {
    this.sno = data.sno ? data.sno : '';
    this.invoiceno = data.invoiceno ? data.invoiceno : '';
    this.amount = data.amount ? data.amount : '';
    this.currency = data.currency ? data.currency : '';
  }
}

export class ShippingBill {
    public userId: string;
    public sbno: string;
    public sbdate: string;
    public adBillNo: string;
    public portCode: string;
    public ieccode: string;
    public iecName: string;
    public adCode: string;
    public leodate: string;
    public processingStaus: string;
    public fobCurrency: string;
    public fobValue: string;
    public realizedFobCurrency: string;
    public realizedFobValue: string;
    public equivalentFobValue: string;
    public invoices: [];
    public freightCurrency: string;
    public freightValue: string;
    public realizedfreightCurrency: string;
    public realizedfreightValue: string;
    public insuranceCurrency: string;
    public insuranceValue: string;
    public realizedInsuranceValue: string;
    public bankingCharges: string;
    public expectedPaymentlastdate: string;
    public AddedDate: string;
    public modifiedDate: string;
    public exporterLocationCode: string;
    public countryOfFinaldestination: string;
    public consigneeName: string;
    public exchangeRate: string
    public _id: any;
    public irRef: any;
    public balanceAvai: any;
    public doc: any;
    public buyerName: string;
    public blCopyDoc: string;
    public commercialDoc: string;
    public packingDoc: string;


    constructor(data: any) {
        this.userId = data.userId ? data.userId : '';
        this.sbno = data.sbno ? data.sbno : '';
        this.sbdate = data.sbdate ? data.sbdate : '';
        this.adBillNo = data.adBillNo ? data.adBillNo : '';
        this.portCode = data.portCode ? data.portCode : '';
        this.ieccode = data.ieccode ? data.ieccode : '';
        this.iecName = data.iecName ? data.iecName : '';
        this.adCode = data.adCode ? data.adCode : '';
        this.leodate = data.leodate ? data.leodate : '';
        this.processingStaus = data.processingStaus ? data.processingStaus : '';
        this.fobCurrency = data.fobCurrency ? data.fobCurrency : '';
        this.fobValue = data.fobValue ? data.fobValue : '';
        this.realizedFobCurrency = data.realizedFobCurrency ? data.realizedFobCurrency : '';
        this.realizedFobValue = data.realizedFobValue ? data.realizedFobValue : '';
        this.equivalentFobValue = data.equivalentFobValue ? data.equivalentFobValue : '';
        this.invoices = this.createInvoice(data.invoices) ? data.invoices : [];
        this.freightCurrency = data.freightCurrency ? data.freightCurrency : '';
        this.freightValue = data.freightValue ? data.freightValue : '';
        this.realizedfreightCurrency = data.realizedfreightCurrency ? data.realizedfreightCurrency : '';
        this.realizedfreightValue = data.realizedfreightValue ? data.realizedfreightValue : '';
        this.insuranceCurrency = data.insuranceCurrency ? data.insuranceCurrency : '';
        this.insuranceValue = data.insuranceValue ? data.insuranceValue : '';
        this.realizedInsuranceValue = data.realizedInsuranceValue ? data.realizedInsuranceValue : '';
        this.bankingCharges = data.bankingCharges ? data.bankingCharges : '';
        this.expectedPaymentlastdate = data.expectedPaymentlastdate ? data.expectedPaymentlastdate : '';
        this.AddedDate = data.AddedDate ? data.AddedDate : '';
        this.modifiedDate = data.modifiedDate ? data.modifiedDate : '';
        this.exporterLocationCode = data.exporterLocationCode ? data.exporterLocationCode : '';
        this.countryOfFinaldestination = data.countryOfFinaldestination ? data.countryOfFinaldestination : '';
        this.consigneeName = data.consigneeName ? data.consigneeName : '';
        this.exchangeRate = data.exchangeRate ? data.exchangeRate : '';
        this._id = data._id;
        this.irRef = data.irRef ? data.irRef: [];
        this.doc = data.doc ? data.doc: '';
        this.buyerName = data.buyerName ? data.buyerName: '';
        this.blCopyDoc = data.blCopyDoc ? data.blCopyDoc: '';
        this.commercialDoc = data.commercialDoc ? data.commercialDoc: '';
        this.packingDoc = data.packingDoc ? data.packingDoc: '';
    }

    createInvoice(data) {
      let invoice = [];
      for (let i in data) {
        invoice.push(new Invoice(i))
      }
      return invoice;
    }

  computeIRMerge() {
    let finallist = [];
    let totalForex = 0;
    if (this.irRef && this.irRef.length) {
      for (let i in this.irRef) {
        let sbInfo:any = {
          ..._.cloneDeep(this)
        };
        let amount, commision, exchangeRate;
        if (this.irRef[i] && this.irRef[i].amount) {
          amount = parseFloat(this.irRef[i].amount);
        }
        if (this.irRef[i] && this.irRef[i].commision) {
          commision = this.irRef[i].commision.replace(/,/g, '');
        }
        if (this.irRef[i] && this.irRef[i].exchangeRate) {
          exchangeRate = parseFloat(this.irRef[i].exchangeRate);
        }
        this.irRef[i].recUSD = (amount - commision).toFixed(2);
        this.irRef[i].convertedAmount = (
          this.irRef[i].recUSD * exchangeRate
        ).toFixed(2);

        sbInfo['firxNumber'] = this.irRef[i].billNo;
        sbInfo['firxAmount'] = parseFloat(this.irRef[i].amount);
        sbInfo['firxCurrency'] = this.irRef[i].currency;
        sbInfo['firxCommision'] = this.irRef[i].commision;
        sbInfo['firxRecAmo'] = this.irRef[i].recUSD;
        sbInfo['firxDate'] = this.irRef[i].date;
        let irAmount = parseFloat(this.irRef[i].amount);
        totalForex = totalForex + irAmount;
        finallist.push(sbInfo);
      }
    } else {
      finallist.push(this);
    }
    this.balanceAvai = (parseFloat(this.fobValue) - totalForex).toFixed(2);
    finallist.forEach((i1, index) => {
      i1.balanceAvai = this.balanceAvai;
    });
    return finallist;
  }
}

// export class ShippingBillDisplayItem extends ShippingBill {
//   constructor(props) {
//
//   }
// }

export class ShippingBillDisplayListViewItem {
  public shippingBillList: Array<ShippingBill> = [];
  // public shippingBillDiplayList: Array<ShippingBillDisplayItem> = [];
  constructor(data) {
    for (let value of data) {
      this.shippingBillList.push(new ShippingBill(value));
    }
    this.computeIRMerge();
  }

  computeIRMerge() {
    let finaldata = [];
    for (let i in this.shippingBillList) {
      let data = this.shippingBillList[i].computeIRMerge();
      for (let j in data) {
        finaldata.push(data[j]);
      }
    }
    this.shippingBillList = finaldata;
    return finaldata;
  }
}


