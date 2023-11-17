public with sharing class DistributedRevenueUpdateHandler {
    @AuraEnabled
    public static boolean updateDistributedRevenue(id id, id oppId, string month, decimal amount) {
        try {
            
            if(id != null) {
                Opportunity_Distributed_revenue__c dr = new Opportunity_Distributed_revenue__c(Id = id);
                dr.Amount__c = amount;
                update dr;
            } else {
                Opportunity_Distributed_revenue__c dr = new Opportunity_Distributed_revenue__c();
                dr.Amount__c = amount;
                dr.Opportunity__c = oppId;
                dr.Forecasting_Month__c = Date.valueOf(month);
                insert dr;
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return true;
    }
}