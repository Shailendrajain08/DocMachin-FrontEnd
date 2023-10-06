import {BehaviorSubject, Observable} from "rxjs";
import _ from 'lodash';
export class PipoModel {
  public _id: string;
  public commodity: string;
  public pi_poNo: string;
  public currency: string;
  public amount: number;
  public incoterm: string;
  public lastDayShipment: string;
  public paymentTerm: [];
  public pcRefNo: string;
  public date: string;
  public dueDate: string;
  public location: string;
  public buyerName: string;
  public benneName: string;
  public file: string;
  public doc: string;
  public document: string;
  public purchasedate: string;
  public userId: string;
  public MasterServiceRef: any;
  public airwayBlCopyRef: any;
  public billOfExchangeRef: any;
  public commercialRef: any;
  public creditNoteRef: any;
  public debitNoteRef: any;
  public destructionRef: any;
  public insuranceRef: any;
  public lcRef: any;
  public opinionReportRef: any;
  public packingListRef: any;
  public sbRef: any;
  public tryPartyAgreementRef: any;
  public irAdviceRef: any;
  public ebrcRef: any;
  public swiftRef: any;
  public swiftCopyRef: any;
  public blcopyRefs: any;

  constructor(data: any) {
    this._id = data._id ? data._id : '';
    this.commodity = data.commodity ? data.commodity: '';
    this.pi_poNo = data.pi_poNo ? data.pi_poNo: '';
    this.currency = data.currency ? data.currency: '';
    this.amount = data.amount ? data.amount: '';
    this.incoterm = data.incoterm ? data.incoterm: '';
    this.lastDayShipment = data.lastDayShipment ? data.lastDayShipment: '';
    this.paymentTerm = data.paymentTerm ? data.paymentTerm: [];
    this.pcRefNo = data.pcRefNo ? data.pcRefNo: '';
    this.date = data.date ? data.date: '';
    this.dueDate = data.dueDate ? data.dueDate: '';
    this.location = data.location ? data.location: '';
    this.buyerName = data.buyerName ? data.buyerName: '';
    this.benneName = data.benneName ? data.benneName: '';
    this.file = data.file ? data.file: '';
    this.doc = data.doc ? data.doc: '';
    this.document = data.document ? data.document: '';
    this.purchasedate = data.purchasedate ? data.purchasedate: '';
    this.userId = data.userId ? data.userId: '';
    this.MasterServiceRef = data.MasterServiceRef? data.MasterServiceRef: [];
    this.airwayBlCopyRef = data.airwayBlCopyRef? data.airwayBlCopyRef: [];
    this.billOfExchangeRef = data.billOfExchangeRef? data.billOfExchangeRef: [];
    this.commercialRef = data.commercialRef? data.commercialRef: [];
    this.creditNoteRef = data.creditNoteRef? data.creditNoteRef: [];
    this.debitNoteRef = data.debitNoteRef? data.debitNoteRef: [];
    this.destructionRef = data.destructionRef? data.destructionRef: [];
    this.insuranceRef = data.insuranceRef? data.insuranceRef: [];
    this.lcRef = data.lcRef? data.lcRef: [];
    this.opinionReportRef = data.opinionReportRef? data.opinionReportRef: [];
    this.packingListRef = data.packingListRef? data.packingListRef: [];
    this.sbRef = data.sbRef? data.sbRef: [];
    this.tryPartyAgreementRef = data.tryPartyAgreementRef? data.tryPartyAgreementRef: [];
    this.irAdviceRef = data.irAdviceRef? data.irAdviceRef: [];
    this.ebrcRef = data.ebrcRef? data.ebrcRef: [];
    this.swiftRef = data.swiftRef? data.swiftRef: [];
    this.swiftCopyRef = data.swiftCopyRef? data.swiftCopyRef: [];
    this.blcopyRefs = data.blcopyRefs? data.blcopyRefs: [];
  }
}
export class PipoDisplayListViewItem {
  public _id: string;
  public pi_poNo: string;
  public date: string;
  public buyerName: string;
  public benneName: string;
  public location: string;
  public commodity: string;
  public paymentTerm = [];
  public irAdvice: string;
  public invoiceReduction = [];
  public lcIssuance = [];
  public advanceOutward: string;
  public swiftCopy: string;
  public EBRC: string;
  public blcopyref: string;
  public tryPartyAgreement: string;
  public debitNote: string;
  public creditNote: string;
  public lcCopy: string;
  public opinionReport: string;
  public airwayBlcopy: string;
  public agreement: string
  public billOfExchange: string;
  public commercial: string;
  public destruction: string;
  public otherDoc: string;
  public packingList: string;
  public sb: string;
  public billUnder: string;
  public doc: string;
  public doc1: string;
  public document: string;
  public currency: string;
  public incoterm: string;
  public lastDayShipment: string;
  public pcRefNo: string;
  public dueDate: string;
  public sbno: string;
  public sbdate: string;
  public region: string;
  public fobValue: number;
  public portCode: string;
  public ttDate: string;
  public ttUSD: string;
  public recDate: string;
  public recUSD: string;
  public commission: Number;
  public conversionDate: string;
  public conversionRate: string;
  public convertedAmount: Number;
  public firxNumber: string;
  public invoiceValueUSD: string;
  public exchRate: string;
  public amount: string;
  public discountAllowed: number;
  public damagesUSD: number;
  public goodsShortageUSD: number;
  public creditNoteStatus: string;
  public egmNO: string;
  public egmDate: string;
  public statusOfRodtep: string;
  public rodtepAmount: string;
  public escriptNote: string;
  public docSubmissionInBank: string;
  public statusOfBankReco: string;
  public firxNumberSettledAgainst: string;
  public balanceIfAny: string;
  public totaldecutions: number;
  public finalAmounts: number;
  public billUnderDate: any;
  public insuranceCopy: any;
  public deliveryOrder: any;
  public blCopy: any;
  public MasterServiceRef: any;
  public airwayBlCopyRef: any;
  public billOfExchangeRef: any;
  public commercialRef: any;
  public creditNoteRef: any;
  public debitNoteRef: any;
  public destructionRef: any;
  public insuranceRef: any;
  public lcRef: any;
  public opinionReportRef: any;
  public packingListRef: any;
  public sbRef: any;
  public tryPartyAgreementRef: any;
  public irAdviceRef: any;
  public ebrcRef: any;
  public swiftRef: any;
  public swiftCopyRef: any;
  public blcopyRefs: any;
  constructor(data: any) {
    this.initValues(data);
  }
  initValues(data: any)  {
    this._id = data._id ? data._id : '';
    this.pi_poNo = data.pi_poNo ? data.pi_poNo : '';
    this.date = data.date ? data.date : '';
    this.buyerName = data.buyerName ? data.buyerName : '';
    this.benneName = data.benneName ? data.benneName: '';
    this.location = data.location ? data.location : '';
    this.commodity = data.commodity ? data.commodity : '';
    this.paymentTerm = data.paymentTerm ? data.paymentTerm : '';
    this.irAdvice = data.irAdvice ? data.irAdvice : '';
    this.invoiceReduction = data.invoiceReduction ? data.invoiceReduction : '';
    this.lcIssuance = data.lcIssuance ? data.lcIssuance : '';
    this.advanceOutward = data.advanceOutward ? data.advanceOutward : '';
    this.swiftCopy = data.swiftCopy ? data.swiftCopy : '';
    this.EBRC = data.EBRC ? data.EBRC: '';
    this.blcopyref = data.blcopyref ? data.blcopyref : '';
    this.tryPartyAgreement = data.tryPartyAgreement ? data.tryPartyAgreement : '';
    this.debitNote = data.debitNote ? data.debitNote : '';
    this.creditNote = data.creditNote ? data.creditNote : '';
    this.lcCopy = data.lcCopy ? data.lcCopy : '';
    this.opinionReport = data.opinionReport ? data.opinionReport : '';
    this.airwayBlcopy = data.airwayBlcopy ? data.airwayBlcopy : '';
    this.agreement = data.agreement ? data.agreement: '';
    this.billOfExchange = data.billOfExchange ? data.billOfExchange : '';
    this.commercial = data.commercial ? data.commercial : '';
    this.destruction = data.destruction ? data.destruction : '';
    this.otherDoc = data.otherDoc ? data.otherDoc : '';
    this.packingList = data.packingList ? data.packingList : '';
    this.sb = data.sb ? data.sb : '';
    this.billUnder = data.billUnder ? data.billUnder : '';
    this.doc = data.doc ? data.doc : '';
    this.doc1 = data.doc1 ? data.doc1 : '';
    this.document = data.document ? data.document : '';
    this.currency = data.currency ? data.currency : '';
    this.incoterm = data.incoterm ? data.incoterm : '';
    this.lastDayShipment = data.lastDayShipment ? data.lastDayShipment : '';
    this.pcRefNo = data.pcRefNo ? data.pcRefNo : '';
    this.dueDate = data.dueDate ? data.dueDate : '';
    this.sbno = data.sbno ? data.sbno : '';
    this.sbdate = data.sbdate ? data.sbdate : '';
    this.region = data.region ? data.region : '';
    this.fobValue = data.fobValue ? data.fobValue : '';
    this.portCode = data.portCode ? data.portCode : '';
    this.ttDate = data.ttDate ? data.ttDate : '';
    this.ttUSD = data.ttUSD ? data.ttUSD : '';
    this.recDate = data.recDate ? data.recDate : '';
    this.recUSD = data.recUSD ? data.recUSD : '';
    this.commission = data.commission ? data.commission : '';
    this.conversionDate = data.conversionDate ? data.conversionDate : '';
    this.conversionRate = data.conversionRate ? data.conversionRate : '';
    this.convertedAmount = data.convertedAmount ? data.convertedAmount : '';
    this.firxNumber = data.firxNumber ? data.firxNumber : '';
    this.invoiceValueUSD = data.invoiceValueUSD ? data.invoiceValueUSD : '';
    this.exchRate = data.exchRate ? data.exchRate : '';
    this.amount = data.amount ? data.amount : '';
    this.discountAllowed = data.discountAllowed ? data.discountAllowed : '';
    this.damagesUSD = data.damagesUSD ? data.damagesUSD : '';
    this.goodsShortageUSD = data.goodsShortageUSD ? data.goodsShortageUSD : '';
    this.creditNoteStatus = data.creditNoteStatus ? data.creditNoteStatus : '';
    this.egmNO = data.egmNO ? data.egmNO : '';
    this.egmDate = data.egmDate ? data.egmDate : '';
    this.statusOfRodtep = data.statusOfRodtep ? data.statusOfRodtep : '';
    this.rodtepAmount = data.rodtepAmount ? data.rodtepAmount : '';
    this.escriptNote = data.escriptNote ? data.escriptNote : '';
    this.docSubmissionInBank = data.docSubmissionInBank ? data.docSubmissionInBank : '';
    this.statusOfBankReco = data.statusOfBankReco ? data.statusOfBankReco : '';
    this.firxNumberSettledAgainst = data.firxNumberSettledAgainst ? data.firxNumberSettledAgainst : '';
    this.balanceIfAny = data.balanceIfAny ? data.balanceIfAny : '';
    this.totaldecutions =
      this.discountAllowed + this.damagesUSD + this.goodsShortageUSD;
    this.finalAmounts =
      this.fobValue -
      this.discountAllowed -
      this.damagesUSD -
      this.goodsShortageUSD;
    this.billUnderDate = data.billUnderDate? data.billUnderDate: '';
    this.insuranceCopy = data.insuranceCopy? data.insuranceCopy: '';
    this.deliveryOrder = data.deliveryOrder? data.deliveryOrder: '';
    this.MasterServiceRef = data.MasterServiceRef? data.MasterServiceRef: [];
    this.airwayBlCopyRef = data.airwayBlCopyRef? data.airwayBlCopyRef: [];
    this.billOfExchangeRef = data.billOfExchangeRef? data.billOfExchangeRef: [];
    this.commercialRef = data.commercialRef? data.commercialRef: [];
    this.creditNoteRef = data.creditNoteRef? data.creditNoteRef: [];
    this.debitNoteRef = data.debitNoteRef? data.debitNoteRef: [];
    this.destructionRef = data.destructionRef? data.destructionRef: [];
    this.insuranceRef = data.insuranceRef? data.insuranceRef: [];
    this.lcRef = data.lcRef? data.lcRef: [];
    this.opinionReportRef = data.opinionReportRef? data.opinionReportRef: [];
    this.packingListRef = data.packingListRef? data.packingListRef: [];
    this.sbRef = data.sbRef? data.sbRef: [];
    this.tryPartyAgreementRef = data.tryPartyAgreementRef? data.tryPartyAgreementRef: [];
    this.irAdviceRef = data.irAdviceRef? data.irAdviceRef: [];
    this.ebrcRef = data.ebrcRef? data.ebrcRef: [];
    this.swiftRef = data.swiftRef? data.swiftRef: [];
    this.swiftCopyRef = data.swiftCopyRef? data.swiftCopyRef: [];
    this.blcopyRefs = data.blcopyRefs? data.blcopyRefs: [];
  }
  computeForexSBPipoMerge() {
    let finallist = [];
    function copyValues(source, dest, keys) {
      for (let i in keys) {
        source[keys[i]] = dest[keys[i]];
      }
      return source;
    }
    function createSbIrinfo(pipoInfo, sbdata) {
      let sbirmerged = [];
      if (sbdata.irRef.length === 0) {
        sbirmerged.push(pipoInfo);
      }
      for (let i in sbdata.irRef) {
        let piInfo:any = {
          ..._.cloneDeep(pipoInfo)
        };
        let irdata = sbdata.irRef[i];
        piInfo['firxNumber'] = irdata.billNo; // these are the field which needed in pipo summary page.
        piInfo['ttDate'] = irdata.date;
        piInfo['ttUSD'] = irdata.amount;
        piInfo['recDate'] = irdata.recievedDate;
        piInfo['conversionRate'] = irdata.exchangeRate;
        piInfo['commision'] = irdata.commision;
        piInfo['conversionDate'] = irdata.conversionDate;
        piInfo['commission'] = irdata.commision;
        let amount = parseFloat(irdata.amount);
        let commision = irdata.commision.replace(/,/g, '');
        piInfo['recUSD'] = amount - commision;
        let exchangeRate = parseFloat(irdata.exchangeRate);
        piInfo['convertedAmount'] = (piInfo['recUSD'] * exchangeRate).toFixed(2);
        sbirmerged.push(piInfo);
      }
      return sbirmerged;
    }
    if (this.sbRef && this.sbRef.length === 0) {
      finallist.push(this);
    }
    for (let i in this.sbRef) {
      let piInfo:any = {
        ..._.cloneDeep(this)
      };
      delete piInfo.sbRef;
      piInfo['sbno'] = this.sbRef[i].sbno;
      piInfo['sbdate'] = this.sbRef[i].sbdate;
      piInfo['portCode'] = this.sbRef[i].portCode;
      piInfo['region'] = this.sbRef[i].countryOfFinaldestination;
      piInfo['fobValue'] = this.sbRef[i].fobValue;
      piInfo = copyValues(piInfo, this.sbRef[i], [
        'firxNumber',
        'ttDate',
        'ttUSD',
        'recDate',
        'conversionRate',
        'commision',
        'conversionDate',
        'commission',
        'recUSD',
        'convertedAmount',
      ]);
      let sblist = createSbIrinfo(piInfo, this.sbRef[i]);
      for (let j in sblist) {
        finallist.push(new PipoDisplayListViewItem(sblist[j]));
      }
    }
    return finallist;
  }

}
export class PipoDisplayListView {
  public pipolist: Array<PipoDisplayListViewItem> = [];
  public pipoModelList: Array<PipoModel> = [];
  constructor(data, type?: string) {
    for (let value of data) {
      if (value['file'] == type && type == 'export') {
        this.pipolist.push(new PipoDisplayListViewItem(value));
        this.pipoModelList.push(new PipoModel(value));
        this.computeForexSBPipoMerge();
      } else if (value['file'] == type && type == 'import') {
        this.pipolist.push(value);
        this.pipoModelList.push(new PipoModel(value));
      }
    }
  }

  computeForexSBPipoMerge() {
    let finaldata = [];
    for (let i in this.pipolist) {
      let data = this.pipolist[i].computeForexSBPipoMerge();
      for (let j in data) {
        finaldata.push(data[j]);
      }
    }
    this.pipolist = finaldata;
    return finaldata;
  }
}
