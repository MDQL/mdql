// Generated from MDQL.g4 by ANTLR 4.13.0

import {ParseTreeListener} from "antlr4";


import { QueryContext } from "./MDQLParser";
import { ViewContext } from "./MDQLParser";
import { FieldsContext } from "./MDQLParser";
import { FiltersContext } from "./MDQLParser";
import { Attr_filterContext } from "./MDQLParser";
import { TableContext } from "./MDQLParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `MDQLParser`.
 */
export default class MDQLListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `MDQLParser.query`.
	 * @param ctx the parse tree
	 */
	enterQuery?: (ctx: QueryContext) => void;
	/**
	 * Exit a parse tree produced by `MDQLParser.query`.
	 * @param ctx the parse tree
	 */
	exitQuery?: (ctx: QueryContext) => void;
	/**
	 * Enter a parse tree produced by `MDQLParser.view`.
	 * @param ctx the parse tree
	 */
	enterView?: (ctx: ViewContext) => void;
	/**
	 * Exit a parse tree produced by `MDQLParser.view`.
	 * @param ctx the parse tree
	 */
	exitView?: (ctx: ViewContext) => void;
	/**
	 * Enter a parse tree produced by `MDQLParser.fields`.
	 * @param ctx the parse tree
	 */
	enterFields?: (ctx: FieldsContext) => void;
	/**
	 * Exit a parse tree produced by `MDQLParser.fields`.
	 * @param ctx the parse tree
	 */
	exitFields?: (ctx: FieldsContext) => void;
	/**
	 * Enter a parse tree produced by `MDQLParser.filters`.
	 * @param ctx the parse tree
	 */
	enterFilters?: (ctx: FiltersContext) => void;
	/**
	 * Exit a parse tree produced by `MDQLParser.filters`.
	 * @param ctx the parse tree
	 */
	exitFilters?: (ctx: FiltersContext) => void;
	/**
	 * Enter a parse tree produced by `MDQLParser.attr_filter`.
	 * @param ctx the parse tree
	 */
	enterAttr_filter?: (ctx: Attr_filterContext) => void;
	/**
	 * Exit a parse tree produced by `MDQLParser.attr_filter`.
	 * @param ctx the parse tree
	 */
	exitAttr_filter?: (ctx: Attr_filterContext) => void;
	/**
	 * Enter a parse tree produced by `MDQLParser.table`.
	 * @param ctx the parse tree
	 */
	enterTable?: (ctx: TableContext) => void;
	/**
	 * Exit a parse tree produced by `MDQLParser.table`.
	 * @param ctx the parse tree
	 */
	exitTable?: (ctx: TableContext) => void;
}

