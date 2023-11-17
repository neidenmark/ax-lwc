public with sharing class DistributedRevenueHandler {
    @AuraEnabled(cacheable=true)
    public static List<Opportunity_Distributed_revenue__c> getDistributedRevenues(){
        try {
            return [select Id,Opportunity__r.Name, Opportunity__r.AccountId, Opportunity__r.Account.Name, Name, Amount__c, Forecasting_Month__c from Opportunity_Distributed_revenue__c where Forecasting_Month__c > LAST_MONTH and Opportunity__r.IsClosed = False ORDER BY Opportunity__r.Account.Name,Opportunity__r.Name, Forecasting_Month__c];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}