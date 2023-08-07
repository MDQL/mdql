/**
 * Base interface for entities that can be queried using markdown QL
 *   Fields that are not to be affected by filters are prefixed by '$'
 */
export interface Entity {
  dataSource?: string;
}
