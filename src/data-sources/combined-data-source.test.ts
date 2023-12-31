import { CombinedDataSource } from "./combined-data-source";
import { DataSource } from "./data-source";

describe("combined data source", () => {
  it("merge documents", async () => {
    const ds1: DataSource = {
      name: "ds1",
      refresh: jest.fn(() => Promise.resolve()),
      documents: jest.fn(() => []),
      tasks: jest.fn(() => []),
    };
    const ds2: DataSource = {
      name: "ds1",
      refresh: jest.fn(() => Promise.resolve()),
      documents: jest.fn(() => []),
      tasks: jest.fn(() => []),
    };

    const testling = new CombinedDataSource(ds1, ds2);
    await testling.refresh();
    testling.documents();
    testling.tasks();

    expect(ds1.refresh).toHaveBeenCalledTimes(1);
    expect(ds1.documents).toHaveBeenCalledTimes(1);
    expect(ds1.tasks).toHaveBeenCalledTimes(1);

    expect(ds2.refresh).toHaveBeenCalledTimes(1);
    expect(ds2.documents).toHaveBeenCalledTimes(1);
    expect(ds2.tasks).toHaveBeenCalledTimes(1);
  });
});
