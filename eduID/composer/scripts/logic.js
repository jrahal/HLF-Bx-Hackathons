/**
 * @param {org.acme.model.UpdateIdentityByHighSchool} tx - transaction
 * @transaction
 */
function updateGPAByHighSchool(tx) {
    tx.identity.gpa = tx.studentGpa; 
    return getAssetRegistry('org.acme.model.StudentIdentity')
        .then(function (assetRegistry) {
            return assetRegistry.update(tx.identity);
        });
}


/**
 * @param {org.acme.model.UpdateIdentityByUniversity} tx - transaction
 * @transaction
 */
function updateDecisionByUniversity(tx) {
    tx.identity.decision = tx.decision; 
    return getAssetRegistry('org.acme.model.StudentIdentity')
        .then(function (assetRegistry) {
            return assetRegistry.update(tx.identity);
        });
}


/**
 * Update student identity asset by Board of Education
 * @param {org.acme.model.UpdateIdentityByBoardOfEducation} tx - transaction
 * @transaction
 */
function updateSatScoresByBoardOfEducation(tx) {
    tx.identity.satScore = tx.satScore; 
    return getAssetRegistry('org.acme.model.StudentIdentity')
        .then(function (assetRegistry) {
            return assetRegistry.update(tx.identity);
        });
}

