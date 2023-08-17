# MDQL - Markdown Query Language

NodeJS Module for indexing and querying a set of Markdown documents.

The module will index a folder structure containing markdown files, and build an index that can be queried using a SQL like language. A common usecase is e.g. to insert a list of all open tasks across several markdown documents into a daily journal.

## Quickstart

```markdown
<!-- contents of doc.md -->

# Example markdown file

Project tasks for project #my-project:

- [ ] some task
- [x] another task
  - [ ] a subtask that is tagged #my-tag
```

```typescript
//Create an index instance. Also supports glob patterns to index directories.
const repository = new DocumentRepository("doc.md");
//Update the index
repository.refresh();
//query the index
const query = Query.parse(
  "TASKLIST text FROM tasks WHERE status='open' AND tags=~'my-tag'"
);
const queryExecutor = new QueryExecutor(repository);
const openTasks = queryExecutor.execute(Query.parse()).toMarkdown();
console.log(openTasks);
/*
Output:
- [ ] a subtask that is tagged #my-tag
 */
```

`openTasks` now contains all open tasks located somewhere in your markdown files.

## Query language

The query language is similar to SQL, but not compatible. The query structure is
`[viewtype] [field, ...] FROM [table] WHERE [condition [AND] ...]`

`[viewtype]` defines how the results are rendered. It supports the following values:
- `TABLE` Table output
- `LIST` Bullet list output
- `TASKLIST` Bullet list with checkboxes

`[field, ...]` list of comma separated fields to be rendered. The value depends on the `table` selected. To access structured data, you may use the dot notation e.g. `field.subfield`. Omitting fields will return all available fields.

You can rename fields for displaying them e.g. in table output. To do so use `<field> AS '<name>'` as field. The name will only affect the rendered output and cannot be used e.g. in conditions.

`[table]` defines what type of data you want to access. It supports the following values:
- `tasks` Tasks found in your workspace
- `documents` Documents found in your workspace

`[condition]` can be used to filter data. All conditions have the format `[field] [operator] '[value]'`. The following operators are supported:
- `=` Check if field is equal to `[value]`
- `!=` Check if field is not equal to `[value]`
- `=~` Check if field or array contains `[value]`
- `=$` Check if field ends with `[value]`
- `=^` Check if field starts with `[value]`


Examples:

- `LIST status, text FROM tasks` - Lists the status and the text of all markdown tasks as bullet points
- `TASKLIST text FROM tasks` - Creates a set
- `LIST path FROM documents WHERE frontmatter.title = 'Daily Note'` - List all documents that have the frontmatter attribute `title` set to `Daily Note`

See [testdata/query.md](./testdata/query.md) for more examples.


### Indexed information
This module automatically indexes a given set of markdown files
Currently we index the following facts:

- Headings (e.g. `## This is a heading`)
- Tasks (e.g. `- [ ] an open task`)
- Tags (e.g. `#some-hashtag`)
- Frontmatter attributes (e.g. `foo: bar`)

## Extending with additional data sources

You may include additional data sources by implementing the `DataSource` interface. This allows you to e.g. connect to your favorite todo manager to query tasks as well.

```typescript
const myDataSource:DataSource=... //Create an instance of your datasource here
const repository = new DocumentRepository("mydocs/**/*.md");
const database=new CombinedDataSource(myDataSource,repository);
//Use database to do queries. It will return merged results from all your data sources
```
