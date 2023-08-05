# Demo Queries

This query is going to show the description of all tasks as a list

```mdql
LIST status,text FROM tasks
```

This query shows the same data, but rendered as table

```mdql
TABLE status,text FROM tasks
```

Show only open tasks as tasklist

```mdql
TASKLIST status,text FROM tasks WHERE status='open'
```
