// Generated from MDQL.g4 by ANTLR 4.13.0
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols
import {
	ATN,
	ATNDeserializer,
	CharStream,
	DecisionState, DFA,
	Lexer,
	LexerATNSimulator,
	RuleContext,
	PredictionContextCache,
	Token
} from "antlr4";
export default class MDQLLexer extends Lexer {
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
	public static readonly FIELD = 17;
	public static readonly STRING_LITERAL = 18;
	public static readonly EOF = Token.EOF;

	public static readonly channelNames: string[] = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
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
                                                             "AND", "FIELD", 
                                                             "STRING_LITERAL" ];
	public static readonly modeNames: string[] = [ "DEFAULT_MODE", ];

	public static readonly ruleNames: string[] = [
		"T__0", "COMPARE_OPERATOR", "OP_EQUALS", "OP_NOTEQUALS", "OP_CONTAINS", 
		"OP_ENDS_WITH", "OP_STARTS_WITH", "NEWLINE", "TASKS", "DOCUMENTS", "TASKLIST", 
		"LIST", "TABLE", "FROM", "WHERE", "AND", "FIELD", "STRING_LITERAL",
	];


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(this, MDQLLexer._ATN, MDQLLexer.DecisionsToDFA, new PredictionContextCache());
	}

	public get grammarFileName(): string { return "MDQL.g4"; }

	public get literalNames(): (string | null)[] { return MDQLLexer.literalNames; }
	public get symbolicNames(): (string | null)[] { return MDQLLexer.symbolicNames; }
	public get ruleNames(): string[] { return MDQLLexer.ruleNames; }

	public get serializedATN(): number[] { return MDQLLexer._serializedATN; }

	public get channelNames(): string[] { return MDQLLexer.channelNames; }

	public get modeNames(): string[] { return MDQLLexer.modeNames; }

	public static readonly _serializedATN: number[] = [4,0,18,169,6,-1,2,0,
	7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,
	7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,
	16,2,17,7,17,1,0,1,0,1,1,1,1,1,1,1,1,1,1,3,1,45,8,1,1,2,1,2,1,3,1,3,1,3,
	1,4,1,4,1,4,1,5,1,5,1,5,1,6,1,6,1,6,1,7,4,7,62,8,7,11,7,12,7,63,1,7,1,7,
	1,8,1,8,1,8,1,8,1,8,1,8,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,10,1,
	10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,
	3,10,100,8,10,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,3,11,110,8,11,1,12,
	1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,3,12,122,8,12,1,13,1,13,1,
	13,1,13,1,13,1,13,1,13,1,13,3,13,132,8,13,1,14,1,14,1,14,1,14,1,14,1,14,
	1,14,1,14,1,14,1,14,3,14,144,8,14,1,15,1,15,1,15,1,15,1,15,1,15,3,15,152,
	8,15,1,16,4,16,155,8,16,11,16,12,16,156,1,17,1,17,1,17,1,17,5,17,163,8,
	17,10,17,12,17,166,9,17,1,17,1,17,0,0,18,1,1,3,2,5,3,7,4,9,5,11,6,13,7,
	15,8,17,9,19,10,21,11,23,12,25,13,27,14,29,15,31,16,33,17,35,18,1,0,3,2,
	0,10,10,13,13,4,0,46,46,48,57,65,90,97,122,1,0,39,39,182,0,1,1,0,0,0,0,
	3,1,0,0,0,0,5,1,0,0,0,0,7,1,0,0,0,0,9,1,0,0,0,0,11,1,0,0,0,0,13,1,0,0,0,
	0,15,1,0,0,0,0,17,1,0,0,0,0,19,1,0,0,0,0,21,1,0,0,0,0,23,1,0,0,0,0,25,1,
	0,0,0,0,27,1,0,0,0,0,29,1,0,0,0,0,31,1,0,0,0,0,33,1,0,0,0,0,35,1,0,0,0,
	1,37,1,0,0,0,3,44,1,0,0,0,5,46,1,0,0,0,7,48,1,0,0,0,9,51,1,0,0,0,11,54,
	1,0,0,0,13,57,1,0,0,0,15,61,1,0,0,0,17,67,1,0,0,0,19,73,1,0,0,0,21,99,1,
	0,0,0,23,109,1,0,0,0,25,121,1,0,0,0,27,131,1,0,0,0,29,143,1,0,0,0,31,151,
	1,0,0,0,33,154,1,0,0,0,35,158,1,0,0,0,37,38,5,44,0,0,38,2,1,0,0,0,39,45,
	3,5,2,0,40,45,3,7,3,0,41,45,3,9,4,0,42,45,3,11,5,0,43,45,3,13,6,0,44,39,
	1,0,0,0,44,40,1,0,0,0,44,41,1,0,0,0,44,42,1,0,0,0,44,43,1,0,0,0,45,4,1,
	0,0,0,46,47,5,61,0,0,47,6,1,0,0,0,48,49,5,33,0,0,49,50,5,61,0,0,50,8,1,
	0,0,0,51,52,5,61,0,0,52,53,5,126,0,0,53,10,1,0,0,0,54,55,5,61,0,0,55,56,
	5,36,0,0,56,12,1,0,0,0,57,58,5,61,0,0,58,59,5,94,0,0,59,14,1,0,0,0,60,62,
	7,0,0,0,61,60,1,0,0,0,62,63,1,0,0,0,63,61,1,0,0,0,63,64,1,0,0,0,64,65,1,
	0,0,0,65,66,6,7,0,0,66,16,1,0,0,0,67,68,5,116,0,0,68,69,5,97,0,0,69,70,
	5,115,0,0,70,71,5,107,0,0,71,72,5,115,0,0,72,18,1,0,0,0,73,74,5,100,0,0,
	74,75,5,111,0,0,75,76,5,99,0,0,76,77,5,117,0,0,77,78,5,109,0,0,78,79,5,
	101,0,0,79,80,5,110,0,0,80,81,5,116,0,0,81,82,5,115,0,0,82,20,1,0,0,0,83,
	84,5,116,0,0,84,85,5,97,0,0,85,86,5,115,0,0,86,87,5,107,0,0,87,88,5,108,
	0,0,88,89,5,105,0,0,89,90,5,115,0,0,90,100,5,116,0,0,91,92,5,84,0,0,92,
	93,5,65,0,0,93,94,5,83,0,0,94,95,5,75,0,0,95,96,5,76,0,0,96,97,5,73,0,0,
	97,98,5,83,0,0,98,100,5,84,0,0,99,83,1,0,0,0,99,91,1,0,0,0,100,22,1,0,0,
	0,101,102,5,108,0,0,102,103,5,105,0,0,103,104,5,115,0,0,104,110,5,116,0,
	0,105,106,5,76,0,0,106,107,5,73,0,0,107,108,5,83,0,0,108,110,5,84,0,0,109,
	101,1,0,0,0,109,105,1,0,0,0,110,24,1,0,0,0,111,112,5,116,0,0,112,113,5,
	97,0,0,113,114,5,98,0,0,114,115,5,108,0,0,115,122,5,101,0,0,116,117,5,84,
	0,0,117,118,5,65,0,0,118,119,5,66,0,0,119,120,5,76,0,0,120,122,5,69,0,0,
	121,111,1,0,0,0,121,116,1,0,0,0,122,26,1,0,0,0,123,124,5,102,0,0,124,125,
	5,114,0,0,125,126,5,111,0,0,126,132,5,109,0,0,127,128,5,70,0,0,128,129,
	5,82,0,0,129,130,5,79,0,0,130,132,5,77,0,0,131,123,1,0,0,0,131,127,1,0,
	0,0,132,28,1,0,0,0,133,134,5,119,0,0,134,135,5,104,0,0,135,136,5,101,0,
	0,136,137,5,114,0,0,137,144,5,101,0,0,138,139,5,87,0,0,139,140,5,72,0,0,
	140,141,5,69,0,0,141,142,5,82,0,0,142,144,5,69,0,0,143,133,1,0,0,0,143,
	138,1,0,0,0,144,30,1,0,0,0,145,146,5,97,0,0,146,147,5,110,0,0,147,152,5,
	100,0,0,148,149,5,65,0,0,149,150,5,78,0,0,150,152,5,68,0,0,151,145,1,0,
	0,0,151,148,1,0,0,0,152,32,1,0,0,0,153,155,7,1,0,0,154,153,1,0,0,0,155,
	156,1,0,0,0,156,154,1,0,0,0,156,157,1,0,0,0,157,34,1,0,0,0,158,164,5,39,
	0,0,159,163,8,2,0,0,160,161,5,39,0,0,161,163,5,39,0,0,162,159,1,0,0,0,162,
	160,1,0,0,0,163,166,1,0,0,0,164,162,1,0,0,0,164,165,1,0,0,0,165,167,1,0,
	0,0,166,164,1,0,0,0,167,168,5,39,0,0,168,36,1,0,0,0,12,0,44,63,99,109,121,
	131,143,151,156,162,164,1,6,0,0];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!MDQLLexer.__ATN) {
			MDQLLexer.__ATN = new ATNDeserializer().deserialize(MDQLLexer._serializedATN);
		}

		return MDQLLexer.__ATN;
	}


	static DecisionsToDFA = MDQLLexer._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );
}