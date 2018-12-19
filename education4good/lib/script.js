/**
 * New script file
 */

/**
 * Sample transaction processor function.
 * @param {org.edu.RequestForSponsorship} tx The request for proposal transaction instance.
 * @transaction
 */
function requestForSponsorTransaction(tx) {

    
    return getAssetRegistry('org.edu.RequestForProposal')
	    .then(function (assetRegistry) {

            // Update the asset in the asset registry.
            return assetRegistry.add(tx.rfp);

        })
        .then(function () {

            // Emit an event for the modified asset.
            var event = getFactory().newEvent('org.edu', 'ReqForSponsorEvent');
            event.asset = tx.rfp;
            
        });
   		
  
}

/**
 * Sample transaction processor function.
 * @param {org.edu.ExpressInterest} tx The expression of transaction instance.
 * @transaction
 */
function expressInterestTransaction(tx) {

  	var assetRegistry;
    // Get the RFP object from the registry
    var investorId = tx.investorId;
  	var rfpId = tx.rfp.rfpId;
	var oldInvestors = tx.rfp.intrestedParty
    
    // Update the investors with the new value.
    var newInvestors = oldInvestors.push(investorId)
    
    
    // Get the asset registry for the asset.
    return getAssetRegistry('org.edu.RequestForProposal')
        .then(function (ar) {
			assetRegistry = ar;
            // Update the asset in the asset registry.
            return assetRegistry.get(rfpId);

        })
   .then(function(asset) {
            asset.intrestedParty = tx.newInvestors;
            return assetRegistry.update(asset);
        })
   .then(function () {

            // Emit an event for the modified asset.
            var event = getFactory().newEvent('org.edu', 'ReqForSponsorEvent');
            event.rfp = tx.rfp;
      		event.investorId = tx.investorId 
            
        });

}
