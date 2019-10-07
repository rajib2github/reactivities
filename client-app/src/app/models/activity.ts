export interface IActivity {
  id: string;
  title: string;
  descrition: string;
  category: string;
  date: Date;
  city: string;
  venue: string;
}

export interface IActivityFormValues extends Partial<IActivity> {
  time?: Date;
}
