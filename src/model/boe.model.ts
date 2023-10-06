export class BoeBill {
    public userId: string;
    public dischargePort: string;
    public boeNumber: string;
    public boeDate: string;
    public iecCode: string;
    public iecName: string;
    public adCode: string;
    public invoiceNumber: string;
    public invoiceAmount: string;
    public currency: string;
    public settledAmount: string;
    public status: string;
    public freightAmount: string;
    public freightCurrency: string;
    public insuranceAmount: string;
    public insuranceCurrency: string;
    public discountAmount: string;
    public discountCurrency: string;
    public miscellaneousAmount: string;
    public miscellaneousCurrency: string;
    public commissionAmount: string;
    public commissionCurrency: string;
    public _id: any;
    

    constructor(data: any) {
        this.userId = data.userId ? data.userId : '';
        this.dischargePort = data.dischargePort ? data.dischargePort : '';
        this.boeNumber = data.boeNumber ? data.boeNumber : '';
        this.boeDate = data.boeDate ? data.boeDate : '';
        this.iecCode = data.iecCode ? data.iecCode : '';
        this.iecName = data.iecName ? data.iecName : '';
        this.adCode = data.adCode ? data.adCode : '';
        this.invoiceNumber = data.invoiceNumber ? data.invoiceNumber : '';
        this.invoiceAmount = data.invoiceAmount ? data.invoiceAmount : '';
        this.currency = data.currency ? data.currency : '';
        this.settledAmount = data.settledAmount ? data.settledAmount : '';
        this.status = data.status ? data.status : '';
        this.freightAmount = data.freightAmount ? data.freightAmount : '';
        this.freightCurrency = data.freightCurrency ? data.freightCurrency : '';
        this.insuranceAmount = data.insuranceAmount ? data.insuranceAmount: '';
        this.insuranceCurrency = data.insuranceCurrency ? data.insuranceCurrency : '';
        this.discountAmount = data.discountAmount ? data.discountAmount: '';
        this.discountCurrency = data.discountCurrency ? data.discountCurrency : '';
        this.miscellaneousAmount = data.miscellaneousAmount ? data.miscellaneousAmount: '';
        this.miscellaneousCurrency = data.miscellaneousCurrency ? data.miscellaneousCurrency : '';
        this.commissionAmount = data.commissionAmount ? data.commissionAmount: '';
        this.commissionCurrency = data.commissionCurrency ? data.commissionCurrency: '';
        this._id = data._id;
    }
}