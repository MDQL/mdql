import { Document } from "./document";
import { Heading } from "./heading";
import { Tag } from "./tag";
import { Task } from "./task";

const testdata = `
---
numvalue: 123
svalue: "123"
---
# Tasks Testdata

Test-Data for Tasks parsing

- [ ] this is an unchecked Task
- [x] this is a checked Task with #a-tag123
- [x] this is a checked Task with special characters [ ]
- This is not a task

## Level 2 Headline with #sometag

### Level 3 Headline

###### Level 6 Headline

- TreeRoot
  - Leaf 1.1
  - Leaf 1.2
  - Leaf 1.3
    - Leaf 1.3.1
    - Leaf 1.3.2
`;

describe("document parsing test", () => {
  it("happy path", () => {
    const actual = Document.parse("test/mydocument.md", testdata);
    const expectedHeadings: Heading[] = [
      { level: 1, text: "Tasks Testdata", tags: [] },
      {
        level: 2,
        text: "Level 2 Headline with #sometag",
        tags: [{ text: "sometag" }],
      },
      { level: 3, text: "Level 3 Headline", tags: [] },
      { level: 6, text: "Level 6 Headline", tags: [] },
    ];
    const expectedTasks: Task[] = [
      {
        $checked: false,
        status: "open",
        text: "this is an unchecked Task",
        tags: [],
        $uri: "file://test/mydocument.md",
      },
      {
        $checked: true,
        text: "this is a checked Task with #a-tag123",
        tags: [{ text: "a-tag123" }],
        status: "closed",
        $uri: "file://test/mydocument.md",
      },
      {
        $checked: true,
        text: "this is a checked Task with special characters [ ]",
        tags: [],
        status: "closed",
        $uri: "file://test/mydocument.md",
      },
    ];

    const expectedTags: Tag[] = [
      {
        text: "a-tag123",
      },
      {
        text: "sometag",
      },
    ];
    expect(actual.headings).toEqual(expectedHeadings);
    expect(actual.tasks).toEqual(expectedTasks);
    expect(actual.tags).toEqual(expectedTags);
    expect(actual.frontMatter?.numvalue).toEqual(123);
    expect(actual.frontMatter?.svalue).toEqual("123");
  });
});
