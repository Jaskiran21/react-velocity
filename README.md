# React Jira Velocity

Displays velocity as a graph based on a JQL query.

## Usage

Create a confluence page. Insert HTML
```
<div id="root"></div>
<script src="https://rawgit.com/TedChenNZ/react-velocity/master/bundle.js"></script>
<script>
    renderVelocityGraph({
      username: 'your_username',
      password: 'your_password',
      appId: 'uuid',
      jql: 'jql'
    });
</script>
```

## AppId
To find appId:

- Open Confluence
- Open the network tab in your browser
- Insert JIRA Issues/Filter
- Use the search to find something in JIRA
- Network tab should show a get request to something like https://confluence.companydomain.com/plugins/servlet/applinks/proxy?_=123   
- Under Request Headers there should ba an X-AppId key. The value there is your appId (should be in uuid format)
