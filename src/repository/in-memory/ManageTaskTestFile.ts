import * as fs from 'fs';
import path from 'path';
import { mockedTasks } from '../../e2e-tests/mockedTasks';

class ManageTaskTestFile {
  private readonly filePath: string = path.resolve(__dirname) + '/TaskFile.JSON';

  constructor() {
    this.newFile();
  }

  newFile() {
    try {
      if (!fs.existsSync(this.filePath)) {
        fs.writeFileSync(this.filePath, JSON.stringify(mockedTasks));
      }
    } catch (error) {
      console.error('Error creating file TaskFile.JSON:', error);
      throw error;
    }
  }

  getFile() {
    return this.filePath;
  }

  resetFile() {
    this.deleteFile();
    this.newFile();
  }

  async deleteFile(): Promise<void> {
    try {
      await fs.promises.unlink(this.filePath);
    } catch (error) {
      console.error('Error deleting file TaskFile.JSON:', error);
      throw error;
    }
  }
}

export { ManageTaskTestFile };
