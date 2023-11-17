import { LightningElement, api } from 'lwc';
import updateDistributedRevenue from "@salesforce/apex/DistributedRevenueUpdateHandler.updateDistributedRevenue";

export default class DistributedRevenueMonth extends LightningElement {
    @api opp;
    @api month;

    get amount() {
        var m = this.opp.months.find( (e) => e.ForecastingMonth == this.month);
        if(!m) { return 0; }
        return m.Amount;
    }
    async handleChange(evt) {
        console.log("DistributedRevenueMonth.handleChange: " + JSON.stringify(evt.target.value));
        
        // Creates the event with the contact ID data.
        //const changeEvent = new CustomEvent("change", { detail: {id: this.id, amount: evt.target.value }});

        // Dispatches the event.
        //this.dispatchEvent(changeEvent);
        var m = this.opp.months.find( (e) => e.ForecastingMonth == this.month);
        console.log(JSON.stringify({ id: (m?m.id:null), oppId: this.opp.OpportunityId, month: this.month, amount: evt.target.value}));
        await updateDistributedRevenue({ id: (m?m.id:null), oppId: this.opp.OpportunityId, month: this.month, amount: evt.target.value});
        
    }
}