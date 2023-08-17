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
	public static readonly AS = 8;
	public static readonly NEWLINE = 9;
	public static readonly TASKS = 10;
	public static readonly DOCUMENTS = 11;
	public static readonly TASKLIST = 12;
	public static readonly LIST = 13;
	public static readonly TABLE = 14;
	public static readonly FROM = 15;
	public static readonly WHERE = 16;
	public static readonly AND = 17;
	public static readonly SORT = 18;
	public static readonly DESC = 19;
	public static readonly FIELD = 20;
	public static readonly STRING_LITERAL = 21;
	public static readonly WS = 22;
	public static readonly EOF = Token.EOF;
	public static readonly RULE_query = 0;
	public static readonly RULE_view = 1;
	public static readonly RULE_fields = 2;
	public static readonly RULE_field = 3;
	public static readonly RULE_aliased_field = 4;
	public static readonly RULE_alias = 5;
	public static readonly RULE_filters = 6;
	public static readonly RULE_sort_clause = 7;
	public static readonly RULE_attr_filter = 8;
	public static readonly RULE_table = 9;
	public static readonly literalNames: (string | null)[] = [ null, "','", 
                                                            null, "'='", 
                                                            "'!='", "'=~'", 
                                                            "'=$'", "'=^'", 
                                                            null, null, 
                                                            "'tasks'", "'documents'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null, 
                                                             "COMPARE_OPERATOR", 
                                                             "OP_EQUALS", 
                                                             "OP_NOTEQUALS", 
                                                             "OP_CONTAINS", 
                                                             "OP_ENDS_WITH", 
                                                             "OP_STARTS_WITH", 
                                                             "AS", "NEWLINE", 
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
		"query", "view", "fields", "field", "aliased_field", "alias", "filters", 
		"sort_clause", "attr_filter", "table",
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
			this.state = 20;
			this.view();
			this.state = 22;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===20) {
				{
				this.state = 21;
				this.fields();
				}
			}

			this.state = 24;
			this.match(MDQLParser.FROM);
			this.state = 25;
			this.table();
			this.state = 28;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===16) {
				{
				this.state = 26;
				this.match(MDQLParser.WHERE);
				this.state = 27;
				this.filters();
				}
			}

			this.state = 31;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===18) {
				{
				this.state = 30;
				this.sort_clause();
				}
			}

			this.state = 33;
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
			this.state = 35;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 28672) !== 0))) {
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
			this.state = 37;
			this.field();
			this.state = 42;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===1) {
				{
				{
				this.state = 38;
				this.match(MDQLParser.T__0);
				this.state = 39;
				this.field();
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
	public field(): FieldContext {
		let localctx: FieldContext = new FieldContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, MDQLParser.RULE_field);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 47;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 4, this._ctx) ) {
			case 1:
				{
				this.state = 45;
				this.match(MDQLParser.FIELD);
				}
				break;
			case 2:
				{
				this.state = 46;
				this.aliased_field();
				}
				break;
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
	public aliased_field(): Aliased_fieldContext {
		let localctx: Aliased_fieldContext = new Aliased_fieldContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, MDQLParser.RULE_aliased_field);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 49;
			this.match(MDQLParser.FIELD);
			this.state = 50;
			this.match(MDQLParser.AS);
			this.state = 51;
			this.alias();
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
	public alias(): AliasContext {
		let localctx: AliasContext = new AliasContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, MDQLParser.RULE_alias);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 53;
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
	public filters(): FiltersContext {
		let localctx: FiltersContext = new FiltersContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, MDQLParser.RULE_filters);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 55;
			this.attr_filter();
			this.state = 60;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===17) {
				{
				{
				this.state = 56;
				this.match(MDQLParser.AND);
				this.state = 57;
				this.attr_filter();
				}
				}
				this.state = 62;
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
		this.enterRule(localctx, 14, MDQLParser.RULE_sort_clause);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 63;
			this.match(MDQLParser.SORT);
			this.state = 64;
			this.match(MDQLParser.FIELD);
			this.state = 66;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===19) {
				{
				this.state = 65;
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
		this.enterRule(localctx, 16, MDQLParser.RULE_attr_filter);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 68;
			this.match(MDQLParser.FIELD);
			this.state = 69;
			this.match(MDQLParser.COMPARE_OPERATOR);
			this.state = 70;
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
		this.enterRule(localctx, 18, MDQLParser.RULE_table);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 72;
			_la = this._input.LA(1);
			if(!(_la===10 || _la===11)) {
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

	public static readonly _serializedATN: number[] = [4,1,22,75,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,1,
	0,1,0,3,0,23,8,0,1,0,1,0,1,0,1,0,3,0,29,8,0,1,0,3,0,32,8,0,1,0,1,0,1,1,
	1,1,1,2,1,2,1,2,5,2,41,8,2,10,2,12,2,44,9,2,1,3,1,3,3,3,48,8,3,1,4,1,4,
	1,4,1,4,1,5,1,5,1,6,1,6,1,6,5,6,59,8,6,10,6,12,6,62,9,6,1,7,1,7,1,7,3,7,
	67,8,7,1,8,1,8,1,8,1,8,1,9,1,9,1,9,0,0,10,0,2,4,6,8,10,12,14,16,18,0,2,
	1,0,12,14,1,0,10,11,71,0,20,1,0,0,0,2,35,1,0,0,0,4,37,1,0,0,0,6,47,1,0,
	0,0,8,49,1,0,0,0,10,53,1,0,0,0,12,55,1,0,0,0,14,63,1,0,0,0,16,68,1,0,0,
	0,18,72,1,0,0,0,20,22,3,2,1,0,21,23,3,4,2,0,22,21,1,0,0,0,22,23,1,0,0,0,
	23,24,1,0,0,0,24,25,5,15,0,0,25,28,3,18,9,0,26,27,5,16,0,0,27,29,3,12,6,
	0,28,26,1,0,0,0,28,29,1,0,0,0,29,31,1,0,0,0,30,32,3,14,7,0,31,30,1,0,0,
	0,31,32,1,0,0,0,32,33,1,0,0,0,33,34,5,0,0,1,34,1,1,0,0,0,35,36,7,0,0,0,
	36,3,1,0,0,0,37,42,3,6,3,0,38,39,5,1,0,0,39,41,3,6,3,0,40,38,1,0,0,0,41,
	44,1,0,0,0,42,40,1,0,0,0,42,43,1,0,0,0,43,5,1,0,0,0,44,42,1,0,0,0,45,48,
	5,20,0,0,46,48,3,8,4,0,47,45,1,0,0,0,47,46,1,0,0,0,48,7,1,0,0,0,49,50,5,
	20,0,0,50,51,5,8,0,0,51,52,3,10,5,0,52,9,1,0,0,0,53,54,5,21,0,0,54,11,1,
	0,0,0,55,60,3,16,8,0,56,57,5,17,0,0,57,59,3,16,8,0,58,56,1,0,0,0,59,62,
	1,0,0,0,60,58,1,0,0,0,60,61,1,0,0,0,61,13,1,0,0,0,62,60,1,0,0,0,63,64,5,
	18,0,0,64,66,5,20,0,0,65,67,5,19,0,0,66,65,1,0,0,0,66,67,1,0,0,0,67,15,
	1,0,0,0,68,69,5,20,0,0,69,70,5,2,0,0,70,71,5,21,0,0,71,17,1,0,0,0,72,73,
	7,1,0,0,73,19,1,0,0,0,7,22,28,31,42,47,60,66];

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
	public FROM(): TerminalNode {
		return this.getToken(MDQLParser.FROM, 0);
	}
	public table(): TableContext {
		return this.getTypedRuleContext(TableContext, 0) as TableContext;
	}
	public EOF(): TerminalNode {
		return this.getToken(MDQLParser.EOF, 0);
	}
	public fields(): FieldsContext {
		return this.getTypedRuleContext(FieldsContext, 0) as FieldsContext;
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
	public field_list(): FieldContext[] {
		return this.getTypedRuleContexts(FieldContext) as FieldContext[];
	}
	public field(i: number): FieldContext {
		return this.getTypedRuleContext(FieldContext, i) as FieldContext;
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


export class FieldContext extends ParserRuleContext {
	constructor(parser?: MDQLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public FIELD(): TerminalNode {
		return this.getToken(MDQLParser.FIELD, 0);
	}
	public aliased_field(): Aliased_fieldContext {
		return this.getTypedRuleContext(Aliased_fieldContext, 0) as Aliased_fieldContext;
	}
    public get ruleIndex(): number {
    	return MDQLParser.RULE_field;
	}
	public enterRule(listener: MDQLListener): void {
	    if(listener.enterField) {
	 		listener.enterField(this);
		}
	}
	public exitRule(listener: MDQLListener): void {
	    if(listener.exitField) {
	 		listener.exitField(this);
		}
	}
}


export class Aliased_fieldContext extends ParserRuleContext {
	constructor(parser?: MDQLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public FIELD(): TerminalNode {
		return this.getToken(MDQLParser.FIELD, 0);
	}
	public AS(): TerminalNode {
		return this.getToken(MDQLParser.AS, 0);
	}
	public alias(): AliasContext {
		return this.getTypedRuleContext(AliasContext, 0) as AliasContext;
	}
    public get ruleIndex(): number {
    	return MDQLParser.RULE_aliased_field;
	}
	public enterRule(listener: MDQLListener): void {
	    if(listener.enterAliased_field) {
	 		listener.enterAliased_field(this);
		}
	}
	public exitRule(listener: MDQLListener): void {
	    if(listener.exitAliased_field) {
	 		listener.exitAliased_field(this);
		}
	}
}


export class AliasContext extends ParserRuleContext {
	constructor(parser?: MDQLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public STRING_LITERAL(): TerminalNode {
		return this.getToken(MDQLParser.STRING_LITERAL, 0);
	}
    public get ruleIndex(): number {
    	return MDQLParser.RULE_alias;
	}
	public enterRule(listener: MDQLListener): void {
	    if(listener.enterAlias) {
	 		listener.enterAlias(this);
		}
	}
	public exitRule(listener: MDQLListener): void {
	    if(listener.exitAlias) {
	 		listener.exitAlias(this);
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
