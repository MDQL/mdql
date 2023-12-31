import { Document } from "../data-model/document";
import { Task } from "../data-model/task";

/**
 * Interface to be implemented by all data sources
 */
export interface DataSource {
  /**
   * Name of the data source. This is used for `WHERE datasource='<name>'`filters and is case insensitive
   */
  readonly name: string;
  /**
   * Force refresh the entities (e.g. if a cache is used)
   */
  refresh: () => Promise<void>;
  /**
   * Return all available entities of type document. If none are available, must return an empty array
   */
  documents(): Document[];

  /**
   * Return all available entities of type document. If none are available, must return an empty array
   */
  tasks(): Task[];
}
