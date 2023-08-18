/**
 * Interface to be implemented by all data sources
 */
export interface DataSource<T> {
  /**
   * Name of the data source.
   */
  readonly name: string;
  /**
   * Force refresh the entities (e.g. if a cache is used)
   */
  refresh: () => Promise<void>;
  /**
   * Return all available entities of type document. If none are available, must return an empty array
   */
  documents(): T[];
}
