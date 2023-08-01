# Markdown Query Language

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
`[viewtype] [field1, field2,  ...] FROM [dataset] WHERE [condition]`

Examples:

- `LIST status, text FROM tasks` - Lists the status and the text of all markdown tasks as bullet points
- `TASKLIST text FROM tasks` - Creates a set

Available datasets:

- `tasks`
- `documents`

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
