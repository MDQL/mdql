import {
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { DataSource } from "./data-sources/data-source";
import { Document } from "./data-sources/entities/document";

export class Task extends Model<
  InferAttributes<Task>,
  InferCreationAttributes<Task>
> {
  declare id: number | null;
  declare text: string;
  declare checked: boolean;
}

export class MarkdownFile extends Model<
  InferAttributes<MarkdownFile>,
  InferCreationAttributes<MarkdownFile>
> {
  declare id: number | null;
  declare path: string;
  declare frontmatter: Record<string, any> | null;

  declare addTask: HasManyAddAssociationMixin<Task, number>;
  declare getTasks: HasManyGetAssociationsMixin<Task>;
  declare createTask: HasManyCreateAssociationMixin<Task>;

  declare addHeading: HasManyAddAssociationMixin<Heading, number>;
  declare getHeadings: HasManyGetAssociationsMixin<Heading>;
  declare createHeading: HasManyCreateAssociationMixin<Heading>;

  declare addTag: HasManyAddAssociationMixin<Tag, number>;
  declare getTags: HasManyGetAssociationsMixin<Tag>;
  declare createTag: HasManyCreateAssociationMixin<Tag>;
}

export class Heading extends Model<
  InferAttributes<Heading>,
  InferCreationAttributes<Heading>
> {
  declare id: number | null;
  declare text: string;
  declare level: number;
}

export class Tag extends Model<
  InferAttributes<Tag>,
  InferCreationAttributes<Tag>
> {
  declare id: number | null;
  declare text: string;
}

export class IndexDatabase {
  private db = new Sequelize("sqlite::memory:");

  constructor() {
    Task.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        checked: DataTypes.BOOLEAN,
        text: DataTypes.STRING,
      },
      { sequelize: this.db }
    );

    MarkdownFile.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        path: DataTypes.STRING,
        frontmatter: DataTypes.JSON,
      },
      { sequelize: this.db }
    );

    Heading.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        text: DataTypes.STRING,
        level: DataTypes.INTEGER,
      },
      { sequelize: this.db }
    );
    Tag.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        text: DataTypes.STRING,
      },
      { sequelize: this.db }
    );

    //One to Many
    MarkdownFile.hasMany(Tag);
    Tag.belongsTo(MarkdownFile);

    //One to Many
    MarkdownFile.hasMany(Heading);
    Heading.belongsTo(MarkdownFile);

    //One to Many
    MarkdownFile.hasMany(Task);
    Task.belongsTo(MarkdownFile);

    //One to Many
    Task.hasMany(Tag);
    Tag.belongsTo(Task);

    this.db.sync({ force: true });
  }

  /**
   * Import documents into database
   * @param documents
   */
  async import(documents: Document[]) {
    for (const doc of documents) {
      const mdFile = MarkdownFile.build({
        path: doc.uri,
        frontmatter: doc.frontMatter,
      });
      await mdFile.save();

      for (const tag of doc.tags) {
        mdFile.createTag({ text: tag.text });
      }

      for (const heading of doc.headings) {
        mdFile.createHeading({ text: heading.text, level: heading.level });
      }

      for (const task of doc.tasks) {
        mdFile.createTask({ checked: task.checked, text: task.text });
      }
    }
  }
}
