import { LightningElement, wire } from 'lwc';
import getDistributedRevenues from "@salesforce/apex/DistributedRevenueHandler.getDistributedRevenues";
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
export default class DistributedRevenueTable extends LightningElement {
    opps = undefined;
    @wire(getDistributedRevenues)
    wiredContacts({ error, data }) {
        if (data) {
            //console.log(JSON.stringify(data));
            var d = [];
            data.forEach(e => {
                var fe = d.find((x) => x.AccountId == e.Opportunity__r.AccountId && x.OpportunityId == e.Opportunity__c);
                if(!fe) {
                    fe = {AccountId: e.Opportunity__r.AccountId, OpportunityId: e.Opportunity__c, AccountName: e.Opportunity__r.Account.Name, OpportunityName: e.Opportunity__r.Name, months: []};
                    d.push(fe);
                }
                fe.months.push( {id: e.Id, ForecastingMonth: e.Forecasting_Month__c, Amount: e.Amount__c});
            });
            //console.log(JSON.stringify(d));
            this.opps = d;
            
        } else if (error) {
            this.opps = undefined;
        }
    }


    get months() {
        var n = new Date(Date.now());
        var d = new Date(n.getFullYear(), n.getMonth(), 1);
        console.log(d.getFullYear() + "-" + this.padStart(d.getMonth() + 1) + "-" + this.padStart(d.getDate()));
        var aMonths = [];
        for (var i = 0; i < 10; i++) {
            aMonths.push({ l: d.getFullYear() + " " + MONTHS[d.getMonth()], d: d.getFullYear() + "-" + this.padStart(d.getMonth() + 1) + "-" + this.padStart(d.getDate()) });
            d = this.addMonths(d, 1);
        }
        return aMonths;
    }

    addMonths(dDate, nMonths) {
        var d = dDate.getDate();
        dDate.setMonth(dDate.getMonth() + nMonths);
        if (dDate.getDate() != d) {
            dDate.setDate(0);
        }
        return dDate;
    }

    padStart(s) {
        return ('' + s).padStart(2, '0');
    }
}