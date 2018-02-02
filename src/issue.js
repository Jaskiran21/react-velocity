
export function getStoryPoints(issue) {
  const customfields = issue.customfields[0].customfield;
  const storyPointField = customfields.find(field => field.$.id === 'customfield_10152');
  if (storyPointField) {
    return parseInt(storyPointField.customfieldvalues[0].customfieldvalue[0], 10);
  }
  console.warn('Issue was not estimated', issue);
  return 0;
}


export function getVelocity(issues) {
  let totalStoryPoints = 0;
  issues.forEach(issue => {
    totalStoryPoints += getStoryPoints(issue);
  });
  return totalStoryPoints;
}