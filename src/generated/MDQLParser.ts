// Generated from MDQL.g4 by ANTLR 4.13.0
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import MDQLListener from "./MDQLListener.js";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class MDQLParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly COMPARE_OPERATOR = 2;
	public static readonly OP_EQUALS = 3;
	public static readonly OP_NOTEQUALS = 4;
	public static readonly OP_CONTAINS = 5;
	public static readonly OP_ENDS_WITH = 6;
	public static readonly OP_STARTS_WITH = 7;
	public static readonly NEWLINE = 8;
	public static readonly TASKS = 9;
	public static readonly DOCUMENTS = 10;
	public static readonly TASKLIST = 11;
	public static readonly LIST = 12;
	public static readonly TABLE = 13;
	public static readonly FROM = 14;
	public static readonly WHERE = 15;
	public static readonly AND = 16;
	public static readonly SORT = 17;
	public static readonly DESC = 18;
	public static readonly FIELD = 19;
	public static readonly STRING_LITERAL = 20;
	public static readonly WS = 21;
	public static readonly EOF = Token.EOF;
	public static readonly RULE_query = 0;
	public static readonly RULE_view = 1;
	public static readonly RULE_fields = 2;
	public static readonly RULE_filters = 3;
	public static readonly RULE_sort_clause = 4;
	public static readonly RULE_attr_filter = 5;
	public static readonly RULE_table = 6;
	public static readonly literalNames: (string | null)[] = [ null, "','", 
                                                            null, "'='", 
                                                            "'!='", "'=~'", 
                                                            "'=$'", "'=^'", 
                                                            null, "'tasks'", 
                                                            "'documents'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null, 
                                                             "COMPARE_OPERATOR", 
                                                             "OP_EQUALS", 
                                                             "OP_NOTEQUALS", 
                                                             "OP_CONTAINS", 
                                                             "OP_ENDS_WITH", 
                                                             "OP_STARTS_WITH", 
                                                             "NEWLINE", 
                                                             "TASKS", "DOCUMENTS", 
                                                             "TASKLIST", 
                                                             "LIST", "TABLE", 
                                                             "FROM", "WHERE", 
                                                             "AND", "SORT", 
                                                             "DESC", "FIELD", 
                                                             "STRING_LITERAL", 
                                                             "WS" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"query", "view", "fields", "filters", "sort_clause", "attr_filter", "table",
	];
	public get grammarFileName(): string { return "MDQL.g4"; }
	public get literalNames(): (string | null)[] { return MDQLParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return MDQLParser.symbolicNames; }
	public get ruleNames(): string[] { return MDQLParser.ruleNames; }
	public get serializedATN(): number[] { return MDQLParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, MDQLParser._ATN, MDQLParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public query(): QueryContext {
		let localctx: QueryContext = new QueryContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, MDQLParser.RULE_query);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 14;
			this.view();
			this.state = 15;
			this.fields();
			this.state = 16;
			this.match(MDQLParser.FROM);
			this.state = 17;
			this.table();
			this.state = 20;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===15) {
				{
				this.state = 18;
				this.match(MDQLParser.WHERE);
				this.state = 19;
				this.filters();
				}
			}

			this.state = 23;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===17) {
				{
				this.state = 22;
				this.sort_clause();
				}
			}

			this.state = 25;
			this.match(MDQLParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public view(): ViewContext {
		let localctx: ViewContext = new ViewContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, MDQLParser.RULE_view);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 27;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 14336) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public fields(): FieldsContext {
		let localctx: FieldsContext = new FieldsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, MDQLParser.RULE_fields);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 29;
			this.match(MDQLParser.FIELD);
			this.state = 34;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===1) {
				{
				{
				this.state = 30;
				this.match(MDQLParser.T__0);
				this.state = 31;
				this.match(MDQLParser.FIELD);
				}
				}
				this.state = 36;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public filters(): FiltersContext {
		let localctx: FiltersContext = new FiltersContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, MDQLParser.RULE_filters);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 37;
			this.attr_filter();
			this.state = 42;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===16) {
				{
				{
				this.state = 38;
				this.match(MDQLParser.AND);
				this.state = 39;
				this.attr_filter();
				}
				}
				this.state = 44;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public sort_clause(): Sort_clauseContext {
		let localctx: Sort_clauseContext = new Sort_clauseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, MDQLParser.RULE_sort_clause);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 45;
			this.match(MDQLParser.SORT);
			this.state = 46;
			this.match(MDQLParser.FIELD);
			this.state = 48;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===18) {
				{
				this.state = 47;
				this.match(MDQLParser.DESC);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public attr_filter(): Attr_filterContext {
		let localctx: Attr_filterContext = new Attr_filterContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, MDQLParser.RULE_attr_filter);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 50;
			this.match(MDQLParser.FIELD);
			this.state = 51;
			this.match(MDQLParser.COMPARE_OPERATOR);
			this.state = 52;
			this.match(MDQLParser.STRING_LITERAL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public table(): TableContext {
		let localctx: TableContext = new TableContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, MDQLParser.RULE_table);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 54;
			_la = this._input.LA(1);
			if(!(_la===9 || _la===10)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public static readonly _serializedATN: number[] = [4,1,21,57,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,1,0,1,0,1,0,1,0,1,0,1,0,3,
	0,21,8,0,1,0,3,0,24,8,0,1,0,1,0,1,1,1,1,1,2,1,2,1,2,5,2,33,8,2,10,2,12,
	2,36,9,2,1,3,1,3,1,3,5,3,41,8,3,10,3,12,3,44,9,3,1,4,1,4,1,4,3,4,49,8,4,
	1,5,1,5,1,5,1,5,1,6,1,6,1,6,0,0,7,0,2,4,6,8,10,12,0,2,1,0,11,13,1,0,9,10,
	54,0,14,1,0,0,0,2,27,1,0,0,0,4,29,1,0,0,0,6,37,1,0,0,0,8,45,1,0,0,0,10,
	50,1,0,0,0,12,54,1,0,0,0,14,15,3,2,1,0,15,16,3,4,2,0,16,17,5,14,0,0,17,
	20,3,12,6,0,18,19,5,15,0,0,19,21,3,6,3,0,20,18,1,0,0,0,20,21,1,0,0,0,21,
	23,1,0,0,0,22,24,3,8,4,0,23,22,1,0,0,0,23,24,1,0,0,0,24,25,1,0,0,0,25,26,
	5,0,0,1,26,1,1,0,0,0,27,28,7,0,0,0,28,3,1,0,0,0,29,34,5,19,0,0,30,31,5,
	1,0,0,31,33,5,19,0,0,32,30,1,0,0,0,33,36,1,0,0,0,34,32,1,0,0,0,34,35,1,
	0,0,0,35,5,1,0,0,0,36,34,1,0,0,0,37,42,3,10,5,0,38,39,5,16,0,0,39,41,3,
	10,5,0,40,38,1,0,0,0,41,44,1,0,0,0,42,40,1,0,0,0,42,43,1,0,0,0,43,7,1,0,
	0,0,44,42,1,0,0,0,45,46,5,17,0,0,46,48,5,19,0,0,47,49,5,18,0,0,48,47,1,
	0,0,0,48,49,1,0,0,0,49,9,1,0,0,0,50,51,5,19,0,0,51,52,5,2,0,0,52,53,5,20,
	0,0,53,11,1,0,0,0,54,55,7,1,0,0,55,13,1,0,0,0,5,20,23,34,42,48];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!MDQLParser.__ATN) {
			MDQLParser.__ATN = new ATNDeserializer().deserialize(MDQLParser._serializedATN);
		}

		return MDQLParser.__ATN;
	}


	static DecisionsToDFA = MDQLParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class QueryContext extends ParserRuleContext {
	constructor(parser?: MDQLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public view(): ViewContext {
		return this.getTypedRuleContext(ViewContext, 0) as ViewContext;
	}
	public fields(): FieldsContext {
		return this.getTypedRuleContext(FieldsContext, 0) as FieldsContext;
	}
	public FROM(): TerminalNode {
		return this.getToken(MDQLParser.FROM, 0);
	}
	public table(): TableContext {
		return this.getTypedRuleContext(TableContext, 0) as TableContext;
	}
	public EOF(): TerminalNode {
		return this.getToken(MDQLParser.EOF, 0);
	}
	public WHERE(): TerminalNode {
		return this.getToken(MDQLParser.WHERE, 0);
	}
	public filters(): FiltersContext {
		return this.getTypedRuleContext(FiltersContext, 0) as FiltersContext;
	}
	public sort_clause(): Sort_clauseContext {
		return this.getTypedRuleContext(Sort_clauseContext, 0) as Sort_clauseContext;
	}
    public get ruleIndex(): number {
    	return MDQLParser.RULE_query;
	}
	public enterRule(listener: MDQLListener): void {
	    if(listener.enterQuery) {
	 		listener.enterQuery(this);
		}
	}
	public exitRule(listener: MDQLListener): void {
	    if(listener.exitQuery) {
	 		listener.exitQuery(this);
		}
	}
}


export class ViewContext extends ParserRuleContext {
	constructor(parser?: MDQLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public TASKLIST(): TerminalNode {
		return this.getToken(MDQLParser.TASKLIST, 0);
	}
	public LIST(): TerminalNode {
		return this.getToken(MDQLParser.LIST, 0);
	}
	public TABLE(): TerminalNode {
		return this.getToken(MDQLParser.TABLE, 0);
	}
    public get ruleIndex(): number {
    	return MDQLParser.RULE_view;
	}
	public enterRule(listener: MDQLListener): void {
	    if(listener.enterView) {
	 		listener.enterView(this);
		}
	}
	public exitRule(listener: MDQLListener): void {
	    if(listener.exitView) {
	 		listener.exitView(this);
		}
	}
}


export class FieldsContext extends ParserRuleContext {
	constructor(parser?: MDQLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public FIELD_list(): TerminalNode[] {
	    	return this.getTokens(MDQLParser.FIELD);
	}
	public FIELD(i: number): TerminalNode {
		return this.getToken(MDQLParser.FIELD, i);
	}
    public get ruleIndex(): number {
    	return MDQLParser.RULE_fields;
	}
	public enterRule(listener: MDQLListener): void {
	    if(listener.enterFields) {
	 		listener.enterFields(this);
		}
	}
	public exitRule(listener: MDQLListener): void {
	    if(listener.exitFields) {
	 		listener.exitFields(this);
		}
	}
}


export class FiltersContext extends ParserRuleContext {
	constructor(parser?: MDQLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public attr_filter_list(): Attr_filterContext[] {
		return this.getTypedRuleContexts(Attr_filterContext) as Attr_filterContext[];
	}
	public attr_filter(i: number): Attr_filterContext {
		return this.getTypedRuleContext(Attr_filterContext, i) as Attr_filterContext;
	}
	public AND_list(): TerminalNode[] {
	    	return this.getTokens(MDQLParser.AND);
	}
	public AND(i: number): TerminalNode {
		return this.getToken(MDQLParser.AND, i);
	}
    public get ruleIndex(): number {
    	return MDQLParser.RULE_filters;
	}
	public enterRule(listener: MDQLListener): void {
	    if(listener.enterFilters) {
	 		listener.enterFilters(this);
		}
	}
	public exitRule(listener: MDQLListener): void {
	    if(listener.exitFilters) {
	 		listener.exitFilters(this);
		}
	}
}


export class Sort_clauseContext extends ParserRuleContext {
	constructor(parser?: MDQLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public SORT(): TerminalNode {
		return this.getToken(MDQLParser.SORT, 0);
	}
	public FIELD(): TerminalNode {
		return this.getToken(MDQLParser.FIELD, 0);
	}
	public DESC(): TerminalNode {
		return this.getToken(MDQLParser.DESC, 0);
	}
    public get ruleIndex(): number {
    	return MDQLParser.RULE_sort_clause;
	}
	public enterRule(listener: MDQLListener): void {
	    if(listener.enterSort_clause) {
	 		listener.enterSort_clause(this);
		}
	}
	public exitRule(listener: MDQLListener): void {
	    if(listener.exitSort_clause) {
	 		listener.exitSort_clause(this);
		}
	}
}


export class Attr_filterContext extends ParserRuleContext {
	constructor(parser?: MDQLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public FIELD(): TerminalNode {
		return this.getToken(MDQLParser.FIELD, 0);
	}
	public COMPARE_OPERATOR(): TerminalNode {
		return this.getToken(MDQLParser.COMPARE_OPERATOR, 0);
	}
	public STRING_LITERAL(): TerminalNode {
		return this.getToken(MDQLParser.STRING_LITERAL, 0);
	}
    public get ruleIndex(): number {
    	return MDQLParser.RULE_attr_filter;
	}
	public enterRule(listener: MDQLListener): void {
	    if(listener.enterAttr_filter) {
	 		listener.enterAttr_filter(this);
		}
	}
	public exitRule(listener: MDQLListener): void {
	    if(listener.exitAttr_filter) {
	 		listener.exitAttr_filter(this);
		}
	}
}


export class TableContext extends ParserRuleContext {
	constructor(parser?: MDQLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public TASKS(): TerminalNode {
		return this.getToken(MDQLParser.TASKS, 0);
	}
	public DOCUMENTS(): TerminalNode {
		return this.getToken(MDQLParser.DOCUMENTS, 0);
	}
    public get ruleIndex(): number {
    	return MDQLParser.RULE_table;
	}
	public enterRule(listener: MDQLListener): void {
	    if(listener.enterTable) {
	 		listener.enterTable(this);
		}
	}
	public exitRule(listener: MDQLListener): void {
	    if(listener.exitTable) {
	 		listener.exitTable(this);
		}
	}
}
