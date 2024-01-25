class Task {
    id?: string;
    userId?: string;
    summary!: string;
    created_at?: Date;
  
    private constructor({ userId, summary }: Task) {
      return Object.assign(this, {
        userId,
        summary
      });
    }
  
    static create({ userId, summary }: Task) {
      const task = new Task({ userId, summary });
      return task;
    }
  }
  
  export { Task };