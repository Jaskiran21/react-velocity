import 'whatwg-fetch';
import { parseString } from 'xml2js';

export function buildJql(jql, weeksAgo = 0) {
  if (weeksAgo === 0) {
    return jql + " AND type != EPIC AND resolutiondate >= startOfWeek() AND status = Done";
  }
  return jql + " AND type != EPIC AND resolutiondate >= startOfWeek(-" + (weeksAgo + 1) + "w) AND resolutiondate <= startOfWeek(-" + weeksAgo + "w) AND status = Done";
}

// Note: this week is 0, last week is 1, etc
export function getCompletedTickets(username, password, apiId, jql, weeksAgo) {
  const url = 'https://confluence.eroad.io/plugins/servlet/applinks/proxy';
  return fetch((url), {
    headers: {
      'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64'),
      'X-AppId': apiId,
      'X-AppPath': '/sr/jira.issueviews:searchrequest-xml/temp/SearchRequest.xml?jqlQuery=' + escape(buildJql(jql, weeksAgo)),
    }
  })
  .then((resp) => {
    if (!resp.ok) {
      throw new Error(resp.status);
    }
    return (resp.text());
  })
  .then(resp => {
    return new Promise((resolve, reject) =>  {
      parseString(resp, (err, resp) => {
        if (!err) {
          resolve(resp);
        } else {
          reject(err);
        }
      })
    });
  })
  .then(xml => {
    return xml.rss.channel[0].item;
  })
  .catch(err => console.log(err));
}
