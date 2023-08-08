/**
 * Interface for all entities. Queryable ones and the ones serving as attributes.
 */
export interface Entity {}

/**
 * Base interface for entities that can be queried using markdown QL
 *   Fields that are not to be affected by filters are prefixed by '$'
 */
export interface QueryableEntity extends Entity {
  /**
   * Name of the data source that generated this entity
   */
  dataSource?: string;

  /**
   * URI pointing to the origin of this entity
   */
  $uri: string;
}
