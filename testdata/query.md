# Example Queries

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

### Properties

MQDL Codeblocks also support additional properties. You can add them right after `mqdl`.

The properties are not evaluated by MDQL library, and thus allow the user of the library to use them as general purpose.

The following examples use the properties supported by our VSCode extension:

`hidequery` will hide the codeblock containing the query, and only display the result.

```mdql hidequery
TASKLIST status,text FROM tasks
```

`inject` will switch the block into inject mode. In inject mode the results are not rendered, but directly injected into your markdown document. You may refresh the data by clicking the 'Refresh' link in the codelens displayed.

Inject mode is particularly useful if you want to baseline the results within your document.

```mdql inject hidequery
TASKLIST status, text FROM tasks
```