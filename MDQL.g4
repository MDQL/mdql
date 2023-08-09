grammar MDQL;

query: view fields FROM table (WHERE filters)? EOF;
view: TASKLIST | LIST | TABLE;
fields: FIELD (',' FIELD)*;
filters: attr_filter (AND attr_filter)*;
attr_filter: FIELD COMPARE_OPERATOR STRING_LITERAL;
table: TASKS | DOCUMENTS;

COMPARE_OPERATOR: (
		OP_EQUALS
		| OP_NOTEQUALS
		| OP_CONTAINS
		| OP_ENDS_WITH
		| OP_STARTS_WITH
	);
OP_EQUALS: '=';
OP_NOTEQUALS: '!=';
OP_CONTAINS: '=~';
OP_ENDS_WITH: '=$';
OP_STARTS_WITH: '=^';
NEWLINE: [\r\n]+ -> skip;
TASKS: 'tasks';
DOCUMENTS: 'documents';
TASKLIST: ('tasklist' | 'TASKLIST');
LIST: ('list' | 'LIST');
TABLE: ('table' | 'TABLE');
FROM: ('from' | 'FROM');
WHERE: ('where' | 'WHERE');
AND: ('and' | 'AND');
FIELD: [a-zA-Z0-9.]+;
STRING_LITERAL: '\'' ( ~'\'' | '\'\'')* '\'';